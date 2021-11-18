// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Chats from '../components/chats';
import Link from '../components/link';
import ChatContent from '../components/chatContent';
import MessageSendingForm from '../components/messageSendingForm';
import mockChats from '../mockData/mockChats';
import mockActiveChat from '../mockData/mockActiveChat';
import handleFormSubmit from '../utils/handleFormSubmit';
import validation from '../validation/chatValidationMap';
import AuthController from '../controllers/authController';
import { ComponentProps } from '../types';

const template = `
div.container
  nav.navigation
    div.links
      link(data-component-id=logoutLink.id)
      link(data-component-id=profileLink.id)
    button.search-button &#128269; Поиск
    chats(data-component-id=chats.id)
  div.active-chat
    div.user-panel
      div.avatar
      div.user-name= userName
    chat-content(data-component-id=chatContent.id)
    message-sending-form(data-component-id=messageSendingForm.id)
`;

interface ActiveChatProps extends ComponentProps {
  logoutLink: Link;
  profileLink: Link;
  chats: Chats;
  userName: string;
  chatContent: ChatContent;
  messageSendingForm: MessageSendingForm;
}

interface ActiveChatParams extends ComponentProps {
  queryId?: number;
}

class ActiveChat extends Component {
  protected readonly props: ActiveChatProps;

  protected readonly chatId: number;

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

    const chats = new Chats({
      chats: mockChats,
    });

    const chatContent = new ChatContent({
      content: mockActiveChat.content,
    });

    const messageSendingForm = new MessageSendingForm({
      validation,
      onSubmit: handleFormSubmit,
      validateOnSubmit: true,
    });

    super('div', {
      hasFlow: true,
      logoutLink,
      profileLink,
      chats,
      chatContent,
      messageSendingForm,
    });

    this.chatId = params.queryId ?? 0;
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    await AuthController.checkAuthorization();

    console.log('загружаем чат:', this.chatId);
  }

  render(): string {
    return pug.render(template, {
      logoutLink: this.props.logoutLink,
      profileLink: this.props.profileLink,
      chats: this.props.chats,
      userName: mockActiveChat.userName,
      chatContent: this.props.chatContent,
      messageSendingForm: this.props.messageSendingForm,
    });
  }
}

export default ActiveChat;
