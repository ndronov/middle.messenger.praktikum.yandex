import { ComponentConstructor } from '../component';
import { ComponentProps } from '../../types';
import { StoreKeys } from '../../store';

import Route from './route';

class Router {
  static instance: Router;

  private history: History;

  private routes: Route[];

  private currentRoute: Route | null;

  private readonly rootQuery: string;

  private readonly rootPath: string = '/';

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.instance = this;
  }

  use(
    pathname: string,
    block: ComponentConstructor,
    props?: ComponentProps,
    storeKeys?: StoreKeys,
  ): Router {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery, ...props }, storeKeys);

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
      this.go(this.rootPath);
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    const params = Router.getRouteParams(pathname);
    route.render(params);
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

  private static getRouteParams(pathname: string): ComponentProps | undefined {
    const [,, queryId] = pathname.split('/');

    if (!queryId) {
      return undefined;
    }

    return { queryId };
  }

  private getRoute(pathname: string): Route | null {
    return this.routes.find((route) => route.match(pathname)) ?? null;
  }

  clear(): void {
    this.routes = [];
    this.currentRoute = null;
  }
}

export default Router;
