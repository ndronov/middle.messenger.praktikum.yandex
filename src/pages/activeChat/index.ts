import Component from '../../modules/component';
import Chats from '../../components/chats';
import Link from '../../components/link';
import ChatContent from '../../components/chatContent';
import MessageSendingForm from '../../components/messageSendingForm';
import AuthController from '../../controllers/authController';
import ChatsController from '../../controllers/chatsController';
import { ComponentProps } from '../../types';
import { Chat, Message, User } from '../../models';
import template from './template.pug';

interface ActiveChatProps extends ComponentProps {
  logoutLink: Link;
  profileLink: Link;
  dialogs: Chats;
  chats?: Chat[];
  user: User;
  messages?: Message[];
  userName: string;
  chatContent: ChatContent;
  messageSendingForm: MessageSendingForm;
}

interface ActiveChatParams extends ComponentProps {
  queryId: string;
}

class ActiveChat extends Component {
  readonly props: ActiveChatProps;

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

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', ActiveChat.handleSubmit);

    await AuthController.checkAuthorization({ silent: true });
    await ChatsController.getChats({ silent: true });
    await ChatsController.openWebSocket(this.chatId);
  }

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
    const { chats } = this.props;

    return chats?.find((chat) => chat.id === this.chatId)?.title ?? '';
  }

  render(): string {
    const { messages, chats, user } = this.props;

    if (!messages || !chats || !user) {
      return '';
    }

    return template({
      logoutLink: this.props.logoutLink,
      profileLink: this.props.profileLink,
      dialogs: this.props.dialogs.setProps({ chats }),
      chatTitle: this.chatTitle,
      chatContent: this.props.chatContent.setProps({ user, messages }),
      messageSendingForm: this.props.messageSendingForm,
    });
  }
}

export default ActiveChat;
