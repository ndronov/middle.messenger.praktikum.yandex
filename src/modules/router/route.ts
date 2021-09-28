import Component, { ComponentConstructor } from '../component';

class Route {
  private pathname: string;

  private readonly blockClass: ComponentConstructor;

  private block: Component | null;

  constructor(pathname: string, view: ComponentConstructor) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
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
      this.block = new Block();

      this.block.renderToRoot();
    }

    this.block.show();
  }
}

export default Route;
