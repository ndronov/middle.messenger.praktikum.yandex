// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import SubmitButton from '../components/submitButton';
import Input from '../components/input';
import validation from '../validation/userSettingsValidationMap';
import AuthController from '../controllers/authController';

const template = `
form.auth-form(novalidate="")
  h1.title Регистрация
  email-input(data-component-id=emailInput.id)
  login-input(data-component-id=loginInput.id)
  firstName-input(data-component-id=firstNameInput.id)
  secondName-input(data-component-id=secondNameInput.id)
  phone-input(data-component-id=phoneInput.id)
  password-input(data-component-id=passwordInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
  a.auth-mode-switch-link(href="/") Войти
`;

class SignupPage extends Component {
  constructor() {
    const emailInput = new Input({
      label: 'Почта',
      type: 'text',
      inputName: 'email',
      className: 'auth-form-field',
      ...validation.email,
    });

    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      className: 'auth-form-field',
      ...validation.login,
    });

    const firstNameInput = new Input({
      label: 'Имя',
      type: 'text',
      inputName: 'first_name',
      className: 'auth-form-field',
      ...validation.name,
    });

    const secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      inputName: 'second_name',
      className: 'auth-form-field',
      ...validation.name,
    });

    const phoneInput = new Input({
      label: 'Телефон',
      type: 'tel',
      inputName: 'phone',
      className: 'auth-form-field',
      ...validation.phone,
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      className: 'auth-form-field',
      ...validation.password,
    });

    const submitButton = new SubmitButton({
      label: 'Зарегистрироваться',
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
      validateOnSubmit: true,
    });
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', SignupPage.handleSubmit);

    await AuthController.checkAuthorization();
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await AuthController.signUp(e);
  }

  render(): string {
    return pug.render(template, {
      emailInput: this.props.emailInput,
      loginInput: this.props.loginInput,
      firstNameInput: this.props.firstNameInput,
      secondNameInput: this.props.secondNameInput,
      phoneInput: this.props.phoneInput,
      passwordInput: this.props.passwordInput,
      passwordConfirmationInput: this.props.passwordConfirmationInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default SignupPage;
