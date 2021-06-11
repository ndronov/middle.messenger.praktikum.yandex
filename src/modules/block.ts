import EventBus from './eventBus';
import htmlToDOM from '../utils/htmlToDOM';

export type Props = Record<string, unknown>;

interface Meta {
  tagName: string;
  props: Props;
}

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private element: HTMLElement;

  private readonly meta: Meta;

  protected readonly props: Props;

  private readonly eventBus: EventBus;

  protected constructor(tagName = 'div', props = {}) {
    this.eventBus = new EventBus();
    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy(props);

    this.registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this.flowComponentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this.flowComponentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this.flowRender.bind(this));
  }

  private createResources() {
    const { tagName } = this.meta;
    this.element = Block.createDocumentElement(tagName);
  }

  init(): void {
    this.createResources();
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

  private flowRender(): void {
    this.element = htmlToDOM(this.render());
  }

  abstract render(): string;

  getContent(): HTMLElement {
    return this.element;
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
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}

export default Block;
