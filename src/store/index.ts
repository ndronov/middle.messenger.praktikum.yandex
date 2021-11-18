import { User, Chat } from '../models';
import Component from '../modules/component';
import EventBus, { Listener } from '../modules/eventBus';

export type StoreKeys = string[];

export interface StoreData {
  user: User;
  chats: Chat[];
}

type Updaters = Record<string, Record<string, Listener>>;

class Store {
  private state: StoreData = { user: {} as User, chats: [] } as StoreData;

  private eventBus = new EventBus();

  private updaters: Updaters = {};

  public setKeyValue(key: keyof StoreData, value: unknown): void {
    // TODO rework with StoreData param type
    Object.assign(this.state, { [key]: value });

    if (this.connected(key)) {
      this.eventBus.emit(key);
    }
  }

  public get data(): StoreData {
    return this.state;
  }

  public connect(component: Component, storeKeys: StoreKeys): void {
    storeKeys.forEach((key) => {
      if (!this.updaters[key]) {
        this.updaters[key] = {};
      }

      this.updaters[key][component.id] = () => {
        setTimeout(() => {
          const value = this.state[key as keyof StoreData];
          component.setProps({ [key]: value });
        }, 0);
      };

      this.eventBus.on(key, this.updaters[key][component.id]);
    });
  }

  public disconnect(component: Component, storeKeys: StoreKeys): void {
    storeKeys.forEach((key) => {
      this.eventBus.off(key, this.updaters[key][component.id]);

      delete this.updaters[key][component.id];

      if (Object.keys(this.updaters[key]).length === 0) {
        delete this.updaters[key];
      }
    });
  }

  private connected(eventKey: string) {
    return this.updaters[eventKey] && Object.keys(this.updaters[eventKey]).length > 0;
  }
}

export default new Store();
