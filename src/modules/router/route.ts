import Component from '../component';

interface ComponentConstructor {
  new (): Component;
}

// @ts-ignore
class Route {
  private pathname: string;

  private readonly blockClass: ComponentConstructor;

  private block: Component | null;

  constructor(pathname: string, view: ComponentConstructor) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      const Block = this.blockClass;
      this.block = new Block();

      this.block.renderToRoot();
    }

    this.block.show();
  }
}
