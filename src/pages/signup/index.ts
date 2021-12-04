import { render } from 'pug';
import Component from '../../modules/component';
import SubmitButton from '../../components/submitButton';
import Input from '../../components/input';
import Link from '../../components/link';
import AuthController from '../../controllers/authController';
import template from './template';

class SignupPage extends Component {
  constructor() {
    const emailInput = new Input({
      label: 'Почта',
      type: 'text',
      inputName: 'email',
      className: 'auth-form-field',
    });

    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      className: 'auth-form-field',
    });

    const firstNameInput = new Input({
      label: 'Имя',
      type: 'text',
      inputName: 'first_name',
      className: 'auth-form-field',
    });

    const secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      inputName: 'second_name',
      className: 'auth-form-field',
    });

    const phoneInput = new Input({
      label: 'Телефон',
      type: 'tel',
      inputName: 'phone',
      className: 'auth-form-field',
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      className: 'auth-form-field',
    });

    const submitButton = new SubmitButton({
      label: 'Зарегистрироваться',
    });

    const loginLink = new Link({
      label: 'Войти',
      href: '/',
      className: 'auth-mode-switch-link',
    });

    super('form', {
      hasFlow: true,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      submitButton,
      loginLink,
      validateOnSubmit: true,
    });
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', SignupPage.handleSubmit);

    await AuthController.checkAuthorization({ goDefaultContentRoute: true, goAuthRoute: false });
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await AuthController.signUp(e);
  }

  render(): string {
    return render(template, {
      emailInput: this.props.emailInput,
      loginInput: this.props.loginInput,
      firstNameInput: this.props.firstNameInput,
      secondNameInput: this.props.secondNameInput,
      phoneInput: this.props.phoneInput,
      passwordInput: this.props.passwordInput,
      passwordConfirmationInput: this.props.passwordConfirmationInput,
      submitButton: this.props.submitButton,
      loginLink: this.props.loginLink,
    });
  }
}

export default SignupPage;
