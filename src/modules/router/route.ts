import Component, { ComponentConstructor } from '../component';
import { ComponentProps } from '../../types';
import store, { StoreKeys } from '../../store';

interface RouteProps extends ComponentProps {
  rootQuery: string;
}

class Route {
  private pathname: string;

  private readonly blockClass: ComponentConstructor;

  private block: Component | null;

  private readonly props: RouteProps;

  private readonly storeKeys?: StoreKeys;

  constructor(
    pathname: string,
    view: ComponentConstructor,
    props: RouteProps,
    storeKeys?: StoreKeys,
  ) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
    this.storeKeys = storeKeys;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    this.block?.clearRoot();

    this.disconnectFromStore();
  }

  match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  connectToStore(): void {
    if (this.block && this.storeKeys) {
      store.connect(this.block, this.storeKeys);
    }
  }

  disconnectFromStore(): void {
    if (this.block && this.storeKeys) {
      store.disconnect(this.block, this.storeKeys);
    }
  }

  render(): void {
    if (this.block) {
      this.connectToStore();
      this.block.renderToRoot();

      return;
    }

    const Block = this.blockClass;
    const { rootQuery, ...restProps } = this.props;
    this.block = new Block(restProps);

    this.connectToStore();
    this.block.mountToRoot(rootQuery);
  }
}

export default Route;
