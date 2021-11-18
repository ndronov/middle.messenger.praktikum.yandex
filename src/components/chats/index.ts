// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import formatTime from '../../utils/formatTime';
import router from '../../modules/router';

// TODO remove id from chat title

const template = `
div.chats
  each chat in chats
    a.chat(href='chat/' + chat.id)
      div.avatar(title=chat.title)
      div.content
        if chat.last_message
          span.name= chat.last_message.user.display_name
        else
          span.name= chat.title + ' ('+ chat.id + ')'
        if chat.last_message
          span.message= chat.last_message.content
      div.additional-content
        if chat.last_message
          time.time= formatTime(chat.last_message.time)
        if unread_count
          span.notifications-number= unread_count
`;

class Chats extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  componentDidMount(): void {
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
    return pug.render(template, {
      ...this.props,
      eventTarget: 'a',
      formatTime,
    });
  }
}

export default Chats;
