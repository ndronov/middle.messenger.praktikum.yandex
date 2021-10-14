import { UserProfile } from '../models';
import Component from '../modules/component';
import EventBus, { Listener } from '../modules/eventBus';
import { ComponentProps } from '../types';

export interface StoreData {
  user: UserProfile;
}

type Updaters = Record<string, Listener>;

class Store {
  private state: StoreData = { user: {} } as StoreData;

  private eventBus = new EventBus();

  private updaters: Updaters = {};

  public setData(dataChange: Record<string, unknown>): void {
    this.state = { ...this.state, ...dataChange };
    this.eventBus.emit('update');
  }

  public get data(): StoreData {
    return this.state;
  }

  public connect(component: Component): void {
    this.updaters[component.id] = () => {
      setTimeout(() => component.setProps(this.state as unknown as ComponentProps), 0);
    };

    this.eventBus.on('update', this.updaters[component.id]);
  }

  public disconnect(component: Component): void {
    this.eventBus.off('update', this.updaters[component.id]);

    delete this.updaters[component.id];
  }
}

export default new Store();
