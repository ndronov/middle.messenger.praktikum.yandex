// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Chats from '../components/chats';
import Link from '../components/link';
import mockChats from '../mockData/mockChats';
import AuthController from '../controllers/authController';

const template = `
div.container
  nav.navigation
    div.links
      link(data-component-id=logoutLink.id)
      link(data-component-id=profileLink.id)
    button.search-button &#128269; Поиск
    chats(data-component-id=chats.id)
  div.active-chat-placeholder Выберите чат, чтобы отправить сообщение
`;

class ChatList extends Component {
  constructor() {
    const logoutLink = new Link({
      label: '< Выход',
      href: '/sign-out',
      className: 'link',
    });

    const profileLink = new Link({
      label: 'Профиль >',
      href: '/settings',
      className: 'link',
    });

    const chats = new Chats({
      chats: mockChats,
    });

    super('div', {
      hasFlow: true,
      logoutLink,
      profileLink,
      chats,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    await AuthController.checkAuthorization();
  }

  render(): string {
    return pug.render(template, {
      logoutLink: this.props.logoutLink,
      profileLink: this.props.profileLink,
      chats: this.props.chats,
    });
  }
}

export default ChatList;
