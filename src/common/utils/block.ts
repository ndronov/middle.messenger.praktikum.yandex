import EventBus from './eventBus';

type Props = Record<string, unknown>;

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

  private _element: HTMLElement;

  private readonly meta: Meta;

  private readonly props: Props;

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
    // eslint-disable-next-line no-underscore-dangle
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    // eslint-disable-next-line no-underscore-dangle
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    // eslint-disable-next-line no-underscore-dangle
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private createResources() {
    const { tagName } = this.meta;
    // eslint-disable-next-line no-underscore-dangle
    this._element = Block.createDocumentElement(tagName);
  }

  init(): void {
    this.createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  // eslint-disable-next-line no-underscore-dangle
  _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  abstract componentDidMount(oldProps?: Props): void;

  // eslint-disable-next-line no-underscore-dangle
  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const changed = this.componentDidUpdate(oldProps, newProps);

    if (changed) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    // TODO добавить функция сравнения объектов
    return !Object.is(oldProps, newProps);
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    // eslint-disable-next-line no-underscore-dangle
    return this._element;
  }

  // eslint-disable-next-line no-underscore-dangle
  _render(): void {
    // eslint-disable-next-line no-underscore-dangle
    this._element.innerHTML = this.render() as unknown as string;
  }

  abstract render(): HTMLElement;

  getContent(): HTMLElement {
    return this.element;
  }

  private makePropsProxy(rawProps: Props): Props {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const proxyConfig = {
      get(props: Props, propName: string) {
        const value = props[propName];
        return typeof value === 'function' ? value.bind(props) : value;
      },

      set(props: Props, propName: string, value: unknown) {
        const oldProps = { ...props };

        // eslint-disable-next-line no-param-reassign
        props[propName] = value;

        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, props);

        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    };

    return new Proxy(rawProps, proxyConfig);
  }

  // eslint-disable-next-line no-underscore-dangle
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
