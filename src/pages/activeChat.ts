// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Chats from '../components/chats';
import Link from '../components/link';
import ChatContent from '../components/chatContent';
import MessageSendingForm from '../components/messageSendingForm';
import handleFormSubmit from '../utils/handleFormSubmit';
import validation from '../validation/chatValidationMap';
import AuthController from '../controllers/authController';
import { ComponentProps } from '../types';
import ChatsController from '../controllers/chatsController';
import store from '../store';

const template = `
div.container
  nav.navigation
    div.links
      link(data-component-id=logoutLink.id)
      link(data-component-id=profileLink.id)
    button.search-button &#128269; Поиск
    chats(data-component-id=dialogs.id)
  div.active-chat
    div.chat-header
      div.avatar
      div.chat-title= chatTitle
    chat-content(data-component-id=chatContent.id)
    message-sending-form(data-component-id=messageSendingForm.id)
`;

interface ActiveChatProps extends ComponentProps {
  logoutLink: Link;
  profileLink: Link;
  dialogs: Chats;
  userName: string;
  chatContent: ChatContent;
  messageSendingForm: MessageSendingForm;
}

interface ActiveChatParams extends ComponentProps {
  queryId: string;
}

class ActiveChat extends Component {
  protected readonly props: ActiveChatProps;

  protected chatId: number;

  constructor(params: ActiveChatParams) {
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

    const chatContent = new ChatContent({ messages: [] });

    const messageSendingForm = new MessageSendingForm({
      validation,
      onSubmit: handleFormSubmit,
      validateOnSubmit: true,
    });

    super('div', {
      hasFlow: true,
      logoutLink,
      profileLink,
      dialogs,
      chatContent,
      messageSendingForm,
    });

    this.chatId = Number(params.queryId);
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', ActiveChat.handleSubmit);

    await AuthController.checkAuthorization();
    await ChatsController.getChats();
    await ChatsController.openWebSocket(this.chatId);
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidUpdate(newParams: ActiveChatParams): Promise<void> {
    const newChatId = Number(newParams.queryId);

    if (newChatId !== this.chatId && newChatId) {
      this.chatId = newChatId;
      await ChatsController.openWebSocket(this.chatId);
    }
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await ChatsController.sendMessage(e);
  }

  get chatTitle(): string {
    return store.data.chats.find((chat) => chat.id === this.chatId)?.title ?? '';
  }

  render(): string {
    const { chats, messages } = store.data;

    return pug.render(template, {
      logoutLink: this.props.logoutLink,
      profileLink: this.props.profileLink,
      dialogs: this.props.dialogs.setProps({ chats }),
      chatTitle: this.chatTitle,
      chatContent: this.props.chatContent.setProps({ messages }),
      messageSendingForm: this.props.messageSendingForm,
    });
  }
}

export default ActiveChat;
