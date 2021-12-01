import pug from 'pug';
import Component from '../modules/component';
import Link from '../components/link';
import PasswordForm from '../components/passwordForm';
import AuthController from '../controllers/authController';
import UsersController from '../controllers/usersController';
import { ComponentProps, RouterLink } from '../types';
import { User } from '../models';

const template = `
div.container
  aside.aside-panel
    link(data-component-id=backLink.id)

  password-form(data-component-id=passwordForm.id)
`;

interface PasswordChange extends ComponentProps {
  user?: User;
  passwordForm: PasswordForm;
}

class PasswordChange extends Component {
  readonly props: PasswordChange;

  constructor() {
    const passwordForm = new PasswordForm({
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

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', PasswordChange.handleSubmit);

    await AuthController.checkAuthorization();
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await UsersController.changePassword(e);
  }

  render(): string {
    const { user } = this.props;

    if (!user) {
      return '';
    }

    return pug.render(template, {
      backLink: this.props.backLink,
      passwordForm: this.props.passwordForm.setProps({ user }),
    });
  }
}

export default PasswordChange;
