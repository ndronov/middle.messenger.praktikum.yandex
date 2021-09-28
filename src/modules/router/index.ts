import { ComponentConstructor } from '../component';
import Route from './route';

class Router {
  static instance: Router;

  private history: History;

  private routes: Route[];

  private currentRoute: Route | null;

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;

    Router.instance = this;
  }

  use(pathname: string, block: ComponentConstructor): Router {
    const route = new Route(pathname, block);

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = ((event) => {
      const target = event.currentTarget as Window;
      this.onRoute(target.location.pathname);
    });

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route {
    const routeByPathname = this.routes.find((route) => route.match(pathname));

    if (!routeByPathname) {
      throw new Error(`Не найден маршрут для "${pathname}"`);
    }

    return routeByPathname;
  }
}

export default Router;
