// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Chats from '../components/chats';
import Link from '../components/link';
import NewChatForm from '../components/newChatForm';
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
  div.chats-additional-forms.active-chat
    new-chat-form(data-component-id=newChatForm.id)
`;

interface ChatListProps extends ComponentProps {
  dialogs: Chats;
  logoutLink: Link;
  profileLink: Link;
  newChatForm: NewChatForm;
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

    const newChatForm = new NewChatForm({
      validateOnSubmit: true,
    });

    super('div', {
      hasFlow: true,
      logoutLink,
      profileLink,
      dialogs,
      newChatForm,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', ChatList.handleSubmit);

    await AuthController.checkAuthorization();
    await ChatsController.getChats();
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await ChatsController.createChat(e);
  }

  render(): string {
    const { chats } = store.data;

    return pug.render(template, {
      logoutLink: this.props.logoutLink,
      profileLink: this.props.profileLink,
      dialogs: this.props.dialogs.setProps({ chats }),
      newChatForm: this.props.newChatForm,
    });
  }
}

export default ChatList;
