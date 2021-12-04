import { render } from 'pug';
import Component from '../../modules/component';
import Chats from '../../components/chats';
import Link from '../../components/link';
import NewChatForm from '../../components/newChatForm';
import AddUserToChatForm from '../../components/addUserToChatForm';
import DeleteUserFromChatForm from '../../components/deleteUserFromChatForm';
import AuthController from '../../controllers/authController';
import ChatsController from '../../controllers/chatsController';
import { ComponentProps } from '../../types';
import { Chat } from '../../models';
import template from './template';

interface ChatListProps extends ComponentProps {
  logoutLink: Link;
  profileLink: Link;
  dialogs: Chats;
  chats?: Chat[];
  newChatForm: NewChatForm;
  addUserToChatForm: AddUserToChatForm;
  deleteUserFromChatForm: DeleteUserFromChatForm;
}

class ChatList extends Component {
  readonly props: ChatListProps;

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

    const newChatForm = new NewChatForm({});

    const addUserToChatForm = new AddUserToChatForm({});

    const deleteUserFromChatForm = new DeleteUserFromChatForm({});

    super('div', {
      hasFlow: true,
      logoutLink,
      profileLink,
      dialogs,
      newChatForm,
      addUserToChatForm,
      deleteUserFromChatForm,
    });
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', this.handleSubmit.bind(this));

    await AuthController.checkAuthorization();
    await ChatsController.getChats();
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    switch (form.id) {
      case this.props.newChatForm.id:
        await ChatsController.createChat(e);
        await ChatsController.getChats();
        break;

      case this.props.addUserToChatForm.id:
        await ChatsController.addUserToChat(e);
        break;

      case this.props.deleteUserFromChatForm.id:
        await ChatsController.deleteUserFromChat(e);
        break;

      default:
        throw new Error(`Обработчик для формы ${form.id} не найден`);
    }
  }

  render(): string {
    const { chats } = this.props;

    if (!chats) {
      return '';
    }

    return render(template, {
      logoutLink: this.props.logoutLink,
      profileLink: this.props.profileLink,
      dialogs: this.props.dialogs.setProps({ chats }),
      newChatForm: this.props.newChatForm,
      addUserToChatForm: this.props.addUserToChatForm,
      deleteUserFromChatForm: this.props.deleteUserFromChatForm,
    });
  }
}

export default ChatList;
