import { v4 as uuidv4 } from 'uuid';
import EventBus from '../eventBus';
import htmlToDOM from './htmlToDOM';
import renderElement from './renderElement';
import getEventNameByHandlerPropName from './getEventNameByHandlerPropName';
import { ComponentProps, ValidationOptions } from '../../types';

const eventHandlerPropNames = ['onSubmit'];

interface Meta {
  tagName: string;
  props: ComponentProps;
  componentId: string;
  root?: string;
  eventTargetSelector?: string;
}

type ChildrenType = Record<string, Component>;
type InnerHandlers = Record<string, EventListener>;

abstract class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_REGISTER_HANDLERS: 'flow:register-handlers',
    FLOW_UNREGISTER_HANDLERS: 'flow:unregister-handlers',
    FLOW_REGISTER_INNER_HANDLERS: 'flow:register-inner-handlers',
    FLOW_UNREGISTER_INNER_HANDLERS: 'flow:unregister-inner-handlers',
  };

  private element: HTMLElement;

  private readonly meta: Meta;

  protected readonly props: ComponentProps;

  private readonly eventBus: EventBus;

  private readonly children: ChildrenType = {};

  private readonly innerHandlers: InnerHandlers = {};

  protected constructor(tagName = 'div', initialProps: ComponentProps = {}) {
    const {
      root,
      template,
      eventTargetSelector,
      validateOnSubmit,
      ...props
    } = initialProps;

    this.meta = {
      tagName,
      props,
      root: root as string,
      eventTargetSelector: eventTargetSelector as string,
      componentId: uuidv4(),
    };

    this.props = this.makePropsProxy(props);
    this.eventBus = new EventBus();

    this.registerEvents();
    this.registerChildComponents();

    if (validateOnSubmit) {
      this.setInnerHandler('submit', this.validateChildComponents.bind(this));
    }

    if (root) {
      this.eventBus.emit(Component.EVENTS.INIT);
    }
  }

  private registerEvents() {
    this.eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_CDM, this.flowComponentDidMount.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_CDU, this.flowComponentDidUpdate.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_RENDER, this.flowRender.bind(this));
    this.eventBus.on(Component.EVENTS.FLOW_REGISTER_HANDLERS, this.flowRegisterHandlers.bind(this));
    this.eventBus.on(
      Component.EVENTS.FLOW_UNREGISTER_HANDLERS,
      this.flowUnregisterHandlers.bind(this),
    );
    this.eventBus.on(
      Component.EVENTS.FLOW_REGISTER_INNER_HANDLERS,
      this.flowRegisterInnerHandlers.bind(this),
    );
    this.eventBus.on(
      Component.EVENTS.FLOW_UNREGISTER_INNER_HANDLERS,
      this.flowUnregisterInnerHandlers.bind(this),
    );
  }

  private createResources(placeholderFromParent?: Element) {
    const { tagName } = this.meta;
    this.element = Component.createDocumentElement(tagName);

    if (placeholderFromParent) {
      placeholderFromParent.replaceWith(this.element);
    }

    this.element.id = this.id;
  }

  init(placeholderFromParent?: Element): void {
    this.createResources(placeholderFromParent);
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  private flowComponentDidMount(): void {
    this.componentDidMount();
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  componentDidMount(_oldProps?: ComponentProps): void {
    // TODO реализовать или удалить
  }

  private flowComponentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps): void {
    const shouldUpdate = this.shouldComponentUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this.eventBus.emit(Component.EVENTS.FLOW_UNREGISTER_HANDLERS);
      this.eventBus.emit(Component.EVENTS.FLOW_UNREGISTER_INNER_HANDLERS);
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(oldProps: ComponentProps, newProps: ComponentProps): boolean {
    // TODO добавить функцию сравнения объектов
    return !Object.is(oldProps, newProps);
  }

  setProps = (nextProps: ComponentProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  renderToRoot(): void {
    if (!this.meta.root) {
      throw new Error('Для компонента не указан корневой элемент');
    }

    const rootElement = document.querySelector(this.meta.root);

    if (!rootElement) {
      throw new Error('Для компонента не найден корневой элемент');
    }

    rootElement.innerHTML = '';
    rootElement.appendChild(this.content);
  }

  private flowRender(): void {
    const componentTemplate = htmlToDOM(this.render());
    renderElement(componentTemplate, this.element);

    this.renderChildComponents();

    setTimeout(() => {
      this.eventBus.emit(Component.EVENTS.FLOW_REGISTER_HANDLERS);
      this.eventBus.emit(Component.EVENTS.FLOW_REGISTER_INNER_HANDLERS);
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
          throw new Error(`Не найден экземпляр компонента ${id}`);
        }

        childComponent.init(placeholder);
      });
    });
  }

  abstract render(): string;

  private flowRegisterHandlers() {
    this.eventHandlersProps.forEach((handlerPropName) => {
      const eventName = getEventNameByHandlerPropName(handlerPropName);
      const handler = this.props[handlerPropName] as EventListener;

      this.eventTarget.addEventListener(eventName, handler);
    });
  }

  private flowUnregisterHandlers() {
    this.eventHandlersProps.forEach((handlerPropName) => {
      const eventName = getEventNameByHandlerPropName(handlerPropName);
      const handler = this.props[handlerPropName] as EventListener;

      this.eventTarget.removeEventListener(eventName, handler);
    });
  }

  setInnerHandler(event: string, handler: EventListener): void {
    this.innerHandlers[event] = handler;
  }

  private flowRegisterInnerHandlers() {
    Object.keys(this.innerHandlers).forEach((eventName) => {
      const handler = this.innerHandlers[eventName];

      this.eventTarget.addEventListener(eventName, handler);
    });
  }

  private flowUnregisterInnerHandlers() {
    Object.keys(this.innerHandlers).forEach((eventName) => {
      const handler = this.innerHandlers[eventName];

      this.eventTarget.removeEventListener(eventName, handler);
    });
  }

  get eventHandlersProps(): string[] {
    return Object.keys(this.props).filter((propName) => eventHandlerPropNames.includes(propName));
  }

  get eventTarget(): HTMLElement {
    const { eventTargetSelector } = this.meta;

    if (!eventTargetSelector) {
      return this.element;
    }

    const eventTarget = this.element.querySelector(eventTargetSelector) as HTMLElement;

    if (!eventTarget) {
      throw new Error(`Не обнаружен элемент для обработки событий компонента ${this.id}`);
    }

    return eventTarget;
  }

  get content(): HTMLElement {
    return this.element as HTMLElement;
  }

  get id(): string {
    return this.meta.componentId;
  }

  private makePropsProxy(rawProps: ComponentProps): ComponentProps {
    const proxyConfig = {
      get(props: ComponentProps, propName: string) {
        const value = props[propName];
        return typeof value === 'function' ? value.bind(props) : value;
      },

      set: (props: ComponentProps, propName: string, value: unknown) => {
        const oldProps = { ...props };

        Object.assign(props, { [propName]: value });

        this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, props);

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

  get hasValidation(): boolean {
    return !!this.props.pattern && !!this.props.error;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  validate(_options?: ValidationOptions): void {
    // каждый компонент может реализовать свой метод валидации
  }

  validateChildComponents(): void {
    Object.keys(this.children)
      .map((id) => this.children[id])
      .filter((component) => component.hasValidation)
      .forEach((component) => {
        component.validate({ triggerOnEmpty: true });
      });
  }

  registerChildComponents(): void {
    Object.keys(this.props).forEach((propName) => {
      const prop = this.props[propName];

      if (prop instanceof Component) {
        this.children[prop.id] = prop;
      }
    });
  }
}

export default Component;
