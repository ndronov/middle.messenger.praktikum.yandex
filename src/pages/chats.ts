// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Chats from '../components/chats';
import mockChats from '../mockData/mockChats';

const template = `
div.container
  nav.navigation
    a(href="/settings").profile-link Профиль &rang;
    button.search-button &#128269; Поиск
    chats(data-component-id=chats.id)
  div.active-chat-placeholder Выберите чат, чтобы отправить сообщение
`;

class ChatList extends Component {
  constructor() {
    const chats = new Chats({
      chats: mockChats,
    });

    super('div', {
      hasFlow: true,
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
