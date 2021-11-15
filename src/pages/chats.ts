// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Chats from '../components/chats';
import Link from '../components/link';
import AuthController from '../controllers/authController';
import ChatsController from '../controllers/chatsController';
import store from '../store';
import { ComponentProps } from '../types';

const template = `
div.container
  nav.navigation
    div.links
      link(data-component-id=logoutLink.id)
      link(data-component-id=profileLink.id)
    button.search-button &#128269; Поиск
    chats(data-component-id=dialogs.id)
  div.active-chat-placeholder Выберите чат, чтобы отправить сообщение
`;

interface ChatListProps extends ComponentProps {
  dialogs: Chats;
  logoutLink: Link;
  profileLink: Link;
}

class ChatList extends Component {
  protected readonly props: ChatListProps;

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

    const dialogs = new Chats({
      chats: [],
    });

    super('div', {
      hasFlow: true,
      logoutLink,
      profileLink,
      dialogs,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    await AuthController.checkAuthorization();
    await ChatsController.getChats();
  }

  render(): string {
    const { chats } = store.data;

    return pug.render(template, {
      logoutLink: this.props.logoutLink,
      profileLink: this.props.profileLink,
      dialogs: this.props.dialogs.setProps({ chats }),
    });
  }
}

export default ChatList;
