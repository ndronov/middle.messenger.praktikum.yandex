import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import formatTime from '../../utils/formatTime';
import router from '../../modules/router';
import template from './template.pug';

class Chats extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('click', Chats.handleClick);
  }

  static handleClick(e: Event): void {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const chatAnchor = target.closest('a');

    if (!chatAnchor) {
      throw new Error('Ошибка открытия чата');
    }

    const { pathname } = new URL(chatAnchor.href);
    router.go(pathname);
  }

  render(): string {
    return template({
      ...this.props,
      eventTarget: 'a',
      formatTime,
    });
  }
}

export default Chats;
