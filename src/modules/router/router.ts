import { ComponentConstructor } from '../component';
import { ComponentProps } from '../../types';
import { StoreKeys } from '../../store';

import Route from './route';

class Router {
  static instance?: Router;

  private history: History;

  routes: Route[];

  currentRoute: Route | null;

  private rootQuery = '';

  private readonly rootPath: string = '/';

  constructor(rootQuery: string) {
    if (Router.instance) {
      Router.instance.setRootQuery(rootQuery);

      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.instance = this;
  }

  setRootQuery(rootQuery: string) {
    this.rootQuery = rootQuery;
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

  getRoute(pathname: string): Route | null {
    return this.routes.find((route) => route.match(pathname)) ?? null;
  }

  static clear(): void {
    if (!this.instance) {
      return;
    }

    this.instance.routes = [];
    this.instance.currentRoute = null;
    this.instance.rootQuery = '';
  }
}

export default Router;
