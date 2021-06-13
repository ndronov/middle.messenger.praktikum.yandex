// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import Chats from '../../components/chats';
import mockChats from './mockChats';

const template = `
div.container
  nav.navigation
    a(href="#").profile-link Профиль &rang;
    button.search-button &#128269; Поиск
    chats(data-component-id=chats.id)
  div.active-chat-placeholder Выберите чат, чтобы отправить сообщение
`;

class ChatList extends Component {
  constructor(root: string) {
    const chats = new Chats({
      chats: mockChats,
    });

    super('div', {
      root,
      chats,
    });
  }

  render(): string {
    return pug.render(template, {
      chats: this.props.chats,
    });
  }
}

export default ChatList;
