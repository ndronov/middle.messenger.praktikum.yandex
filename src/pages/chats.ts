// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Chats from '../components/chats';
import mockChats from '../mockData/mockChats';
import AuthController from '../controllers/authController';

const template = `
div.container
  nav.navigation
    div.links
      a(href="/sign-out").link &#128682; Выход
      a(href="/settings").link Профиль &rang;
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

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    await AuthController.checkAuthorization({ goDefaultContentRoute: false });
  }

  render(): string {
    return pug.render(template, {
      chats: this.props.chats,
    });
  }
}

export default ChatList;
