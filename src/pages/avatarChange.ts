// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Link from '../components/link';
import UserSettingsForm from '../components/userSettingsForm';
import AvatarForm from '../components/avatarForm';
import AuthController from '../controllers/authController';
import UsersController from '../controllers/usersController';
import { RouterLink } from '../types';

const template = `
div.container
  aside.aside-panel
    link(data-component-id=backLink.id)

  user-settings-form(data-component-id=userSettingsForm.id)
  avatar-form(data-component-id=avatarForm.id)
`;

class AvatarChange extends Component {
  constructor() {
    const userSettingsForm = new UserSettingsForm({});

    const backLink = new Link({
      label: '<',
      go: RouterLink.Back,
      className: 'back-button',
    });

    const avatarForm = new AvatarForm({});

    super('div', {
      hasFlow: true,
      userSettingsForm,
      avatarForm,
      backLink,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', AvatarChange.handleSubmit);

    await AuthController.checkAuthorization();
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await UsersController.changeAvatar(e);
  }

  render(): string {
    return pug.render(template, {
      backLink: this.props.backLink,
      userSettingsForm: this.props.userSettingsForm,
      avatarForm: this.props.avatarForm,
    });
  }
}

export default AvatarChange;
