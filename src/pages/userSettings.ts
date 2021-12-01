import pug from 'pug';
import Component from '../modules/component';
import Link from '../components/link';
import UserSettingsForm from '../components/userSettingsForm';
import AuthController from '../controllers/authController';
import UsersController from '../controllers/usersController';
import { ComponentProps, RouterLink } from '../types';
import Chats from '../components/chats';
import { Chat } from '../models';

const template = `
div.container
  aside.aside-panel
    link(data-component-id=backLink.id)

  user-settings-form(data-component-id=userSettingsForm.id)
`;

interface UserSettingsProps extends ComponentProps {
  backLink: Link;
  profileLink: Link;
  dialogs: Chats;
  chats?: Chat[];
  userSettingsForm: UserSettingsForm;
}

class UserSettings extends Component {
  readonly props: UserSettingsProps;

  constructor() {
    const userSettingsForm = new UserSettingsForm({
      validateOnSubmit: true,
    });

    const backLink = new Link({
      label: '<',
      go: RouterLink.Back,
      className: 'back-button',
    });

    super('div', {
      hasFlow: true,
      backLink,
      userSettingsForm,
    });
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', UserSettings.handleSubmit);

    await AuthController.checkAuthorization();
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await UsersController.changeProfile(e);
  }

  render(): string {
    const { user } = this.props;

    if (!user) {
      return '';
    }

    return pug.render(template, {
      backLink: this.props.backLink,
      userSettingsForm: this.props.userSettingsForm.setProps({ user }),
    });
  }
}

export default UserSettings;
