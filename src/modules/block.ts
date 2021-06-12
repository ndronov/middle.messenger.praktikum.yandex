import { v4 as uuidv4 } from 'uuid';
import EventBus from './eventBus';
import htmlToDOM from '../utils/htmlToDOM';
import renderElement from '../utils/renderElement';
import getEventNameByHandlerPropName from '../utils/getEventNameByHandlerPropName';

const events = ['onBlur', 'onFocus', 'onSubmit'];

export type Props = Record<string, unknown>;
type Template = (tagName: string) => string;

interface Meta {
  tagName: string;
  props: Props;
  componentId: string;
  // TODO оставить ?
  template: Template;
  root?: string;
  eventTargetSelector?: string;
}

type ChildrenType = Record<string, Block>;

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_REGISTER_HANDLERS: 'flow:register-handlers',
    FLOW_UNREGISTER_HANDLERS: 'flow:unregister-handlers',
  };

  private element: HTMLElement;

  private readonly meta: Meta;

  protected readonly props: Props;

  private readonly eventBus: EventBus;

  private readonly children: ChildrenType = {};

  protected constructor(tagName = 'div', initialProps?: Props) {
    const {
      root, template, eventTargetSelector, ...props
    } = initialProps || {};

    this.meta = {
      tagName,
      props,
      template: template as Template,
      root: root as string,
      eventTargetSelector: eventTargetSelector as string,
      componentId: uuidv4(),
    };

    this.props = this.makePropsProxy(props);
    this.eventBus = new EventBus();

    this.registerEvents();

    if (root) {
      this.eventBus.emit(Block.EVENTS.INIT);
    }
  }

  private registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this.flowComponentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this.flowComponentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this.flowRender.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_REGISTER_HANDLERS, this.flowRegisterHandlers.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_UNREGISTER_HANDLERS, this.flowUnregisterHandlers.bind(this));
  }

  private createResources(placeholderFromParent?: Element) {
    const { tagName } = this.meta;
    this.element = Block.createDocumentElement(tagName);

    if (placeholderFromParent) {
      placeholderFromParent.replaceWith(this.element);
    }
  }

  init(placeholderFromParent?: Element): void {
    this.createResources(placeholderFromParent);
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private flowComponentDidMount(): void {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  abstract componentDidMount(oldProps?: Props): void;

  private flowComponentDidUpdate(oldProps: Props, newProps: Props): void {
    const shouldUpdate = this.shouldComponentUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this.eventBus.emit(Block.EVENTS.FLOW_UNREGISTER_HANDLERS);
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(oldProps: Props, newProps: Props): boolean {
    // TODO добавить функцию сравнения объектов
    return !Object.is(oldProps, newProps);
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  renderToRoot() {
    if (!this.meta.root) {
      throw new Error('Для блока не указан корневой элемент');
    }

    const rootElement = document.querySelector(this.meta.root);

    if (!rootElement) {
      throw new Error('Для блока не найден корневой элемент');
    }

    rootElement.appendChild(this.content);
  }

  private flowRender(): void {
    const componentTemplate = htmlToDOM(this.render());
    renderElement(componentTemplate, this.element);

    this.renderChildComponents();

    setTimeout(() => {
      this.eventBus.emit(Block.EVENTS.FLOW_REGISTER_HANDLERS);
    });
  }

  private renderChildComponents(): void {
    setTimeout(() => {
      const childComponentPlaceholders = this.element.querySelectorAll('[data-component-id]');
      childComponentPlaceholders.forEach((placeholder) => {
        const id = placeholder.getAttribute('data-component-id');

        if (!id) {
          throw new Error('Не найден ID компонента');
        }

        const childComponent = this.children[id];

        if (!childComponent) {
          throw new Error('Не найден экземпляр компонента');
        }

        childComponent.init(placeholder);
      });
    });
  }

  abstract render(): string;

  private flowRegisterHandlers() {
    this.eventHandlersProps.forEach((handlerPropName) => {
      const eventName = getEventNameByHandlerPropName(handlerPropName);
      const handler = this.props[handlerPropName] as EventListenerOrEventListenerObject;

      this.eventTarget.addEventListener(eventName, handler);
    });
  }

  private flowUnregisterHandlers() {
    this.eventHandlersProps.forEach((handlerPropName) => {
      const eventName = getEventNameByHandlerPropName(handlerPropName);
      const handler = this.props[handlerPropName] as EventListenerOrEventListenerObject;

      this.eventTarget.removeEventListener(eventName, handler);
    });
  }

  get eventHandlersProps(): string[] {
    return Object.keys(this.props).filter((prop) => events.includes(prop));
  }

  // TODO оставить ?
  get template(): string {
    const { template, tagName } = this.meta;

    return template(tagName);
  }

  get eventTarget(): HTMLElement {
    const { eventTargetSelector } = this.meta;

    if (!eventTargetSelector) {
      return this.element;
    }

    const eventTarget = this.element.querySelector(eventTargetSelector) as HTMLElement;

    return eventTarget || this.element;
  }

  get content(): HTMLElement {
    return this.element as HTMLElement;
  }

  get id(): string {
    return this.meta.componentId;
  }

  private makePropsProxy(rawProps: Props): Props {
    const proxyConfig = {
      get(props: Props, propName: string) {
        const value = props[propName];
        return typeof value === 'function' ? value.bind(props) : value;
      },

      set: (props: Props, propName: string, value: unknown) => {
        const oldProps = { ...props };

        Object.assign(props, { [propName]: value });

        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, props);

        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    };

    return new Proxy(rawProps, proxyConfig);
  }

  static createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.content.style.display = 'block';
  }

  hide(): void {
    this.content.style.display = 'none';
  }

  addChildComponent(...childComponents: Block[]): void {
    childComponents.forEach((block) => {
      this.children[block.id] = block;
    });
  }
}

export default Block;
