// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import SubmitButton from '../../components/submitButton';
import Input from '../../components/input';
import handleFormSubmit from '../../utils/handleFormSubmit';
import validation from './validation';

const template = `
form.auth-form(novalidate="")
  h1.title Регистрация
  email-input(data-component-id=emailInput.id)
  login-input(data-component-id=loginInput.id)
  firstName-input(data-component-id=firstNameInput.id)
  secondName-input(data-component-id=secondNameInput.id)
  phone-input(data-component-id=phoneInput.id)
  password-input(data-component-id=passwordInput.id)
  passwordConfirmation-input(data-component-id=passwordConfirmationInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
  a.auth-mode-switch-link(href="../login/index.pug") Войти
`;

class SignupPage extends Component {
  constructor(root: string) {
    const emailInput = new Input({
      label: 'Почта',
      type: 'text',
      inputName: 'email',
      pattern: validation.email.pattern,
      error: validation.email.error,
      className: 'label',
    });

    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      pattern: validation.login.pattern,
      error: validation.login.error,
      className: 'label',
    });

    const firstNameInput = new Input({
      label: 'Имя',
      type: 'text',
      inputName: 'first_name',
      pattern: validation.name.pattern,
      error: validation.name.error,
      className: 'label',
    });

    const secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      inputName: 'second_name',
      pattern: validation.name.pattern,
      error: validation.name.error,
      className: 'label',
    });

    const phoneInput = new Input({
      label: 'Телефон',
      type: 'tel',
      inputName: 'phone',
      pattern: validation.phone.pattern,
      error: validation.phone.error,
      className: 'label',
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      pattern: validation.password.pattern,
      error: validation.password.error,
      className: 'label',
    });

    const passwordConfirmationInput = new Input({
      label: 'Пароль (ещё раз)',
      type: 'password',
      inputName: 'password_confirmation',
      pattern: validation.password.pattern,
      error: validation.password.error,
      className: 'label',
    });

    const submitButton = new SubmitButton({
      label: 'Зарегистрироваться',
    });

    super('form', {
      root,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      passwordConfirmationInput,
      submitButton,
      onSubmit: handleFormSubmit,
    });
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
