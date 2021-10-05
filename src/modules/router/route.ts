import Component, { ComponentConstructor } from '../component';
import { ComponentProps } from '../../types';

interface RouteProps extends ComponentProps {
  rootQuery: string;
}

class Route {
  private pathname: string;

  private readonly blockClass: ComponentConstructor;

  private block: Component | null;

  private readonly props: RouteProps;

  constructor(pathname: string, view: ComponentConstructor, props: RouteProps) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  render(): void {
    if (!this.block) {
      const Block = this.blockClass;
      const { rootQuery, ...restProps } = this.props;
      this.block = new Block(restProps);

      this.block.renderToRoot(rootQuery);
    }

    this.block.show();
  }
}

export default Route;