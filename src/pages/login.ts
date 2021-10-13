// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import SubmitButton from '../components/submitButton';
import Input from '../components/input';
import validation from '../validation/userSettingsValidationMap';
import AuthController from '../controllers/AuthController';

const template = `
form.auth-form(novalidate="")
  h1.title Вход
  login-input(data-component-id=loginInput.id)
  password-input(data-component-id=passwordInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
  a.auth-mode-switch-link(href="/sign-up") Нет аккаунта?
`;

class LoginPage extends Component {
  constructor() {
    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      className: 'auth-form-field',
      ...validation.login,
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      className: 'auth-form-field',
      ...validation.password,
    });

    const submitButton = new SubmitButton({
      label: 'Авторизоваться',
    });

    super('form', {
      hasFlow: true,
      loginInput,
      passwordInput,
      submitButton,
      validateOnSubmit: true,
    });
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', LoginPage.handleSubmit);

    await AuthController.checkAuthorization({ goAuthRoute: false });
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await AuthController.login(e);
  }

  render(): string {
    return pug.render(template, {
      loginInput: this.props.loginInput,
      passwordInput: this.props.passwordInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default LoginPage;
