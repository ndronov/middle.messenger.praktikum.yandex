import { User, Chat, Message } from '../models';
import Component from '../modules/component';
import EventBus, { Listener } from '../modules/eventBus';
import { ComponentUpdateOptions } from '../types';

export type StoreKeys = string[];

export interface StoreData {
  user: User;
  chats: Chat[];
  messages: Message[];
}

type Updaters = Record<string, Record<string, Listener>>;

class Store {
  private state = {
    user: {} as User,
    chats: [],
    messages: [],
  } as StoreData;

  private eventBus = new EventBus();

  private updaters: Updaters = {};

  public setKeyValue(
    key: keyof StoreData,
    value: unknown,
    options: ComponentUpdateOptions = {},
  ): void {
    Object.assign(this.state, { [key]: value });

    if (!this.connected(key)) {
      return;
    }

    this.eventBus.emit(key, options);
  }

  public get data(): StoreData {
    return this.state;
  }

  public connect(component: Component, storeKeys: StoreKeys): void {
    storeKeys.forEach((key) => {
      if (!this.updaters[key]) {
        this.updaters[key] = {};
      }

      this.updaters[key][component.id] = (options: ComponentUpdateOptions = {}) => {
        const value = this.state[key as keyof StoreData];
        component.setProps({ [key]: value }, options);
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
