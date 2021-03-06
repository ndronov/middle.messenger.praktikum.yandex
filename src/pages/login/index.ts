import Component from '../../modules/component';
import SubmitButton from '../../components/submitButton';
import Input from '../../components/input';
import Link from '../../components/link';
import AuthController from '../../controllers/authController';
import template from './template.pug';

class LoginPage extends Component {
  constructor() {
    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      className: 'auth-form-field',
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      className: 'auth-form-field',
    });

    const submitButton = new SubmitButton({
      label: 'Авторизоваться',
    });

    const signupLink = new Link({
      label: 'Нет аккаунта?',
      href: '/sign-up',
      className: 'auth-mode-switch-link',
    });

    super('form', {
      hasFlow: true,
      loginInput,
      passwordInput,
      submitButton,
      signupLink,
      validateOnSubmit: true,
    });
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', LoginPage.handleSubmit);

    await AuthController.checkAuthorization({ goDefaultContentRoute: true, goAuthRoute: false });
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await AuthController.login(e);
  }

  render(): string {
    return template({
      loginInput: this.props.loginInput,
      passwordInput: this.props.passwordInput,
      submitButton: this.props.submitButton,
      signupLink: this.props.signupLink,
    });
  }
}

export default LoginPage;
