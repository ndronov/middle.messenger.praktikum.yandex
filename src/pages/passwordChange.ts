// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Link from '../components/link';
import PasswordForm from '../components/passwordForm';
import userSettingsValidationMap from '../validation/userSettingsValidationMap';
import AuthController from '../controllers/authController';
import UsersController from '../controllers/usersController';
import { RouterLink } from '../types';

const template = `
div.container
  aside.aside-panel
    link(data-component-id=backLink.id)

  password-form(data-component-id=passwordForm.id)
`;

class PasswordChange extends Component {
  constructor() {
    const passwordForm = new PasswordForm({
      editMode: true,
      validation: userSettingsValidationMap,
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
      passwordForm,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', PasswordChange.handleSubmit);

    await AuthController.checkAuthorization();
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await UsersController.changePassword(e);
  }

  render(): string {
    return pug.render(template, {
      backLink: this.props.backLink,
      passwordForm: this.props.passwordForm,
    });
  }
}

export default PasswordChange;
