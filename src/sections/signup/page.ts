// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';
import SubmitButton from '../../components/submitButton';
import Input from '../../components/input';

const template = `
form.auth-form#signup-form
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

const handleSubmit = (e: Event) => {
  console.log('form submit:', e);
  e.preventDefault();
};

class SignupPage extends Block {
  constructor(root: string) {
    const emailInput = new Input({
      label: 'Почта',
      type: 'text',
      inputName: 'email',
      // TODO реализовать валидацию
      onFocus: (e) => console.log('emailInput focus:', e),
      onBlur: (e) => console.log('emailInput blur:', e),
    });

    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      onFocus: (e) => console.log('loginInput focus:', e),
      onBlur: (e) => console.log('loginInput blur:', e),
    });

    const firstNameInput = new Input({
      label: 'Имя',
      type: 'text',
      inputName: 'first_name',
      onFocus: (e) => console.log('firstNameInput focus:', e),
      onBlur: (e) => console.log('firstNameInput blur:', e),
    });

    const secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      inputName: 'second_name',
      onFocus: (e) => console.log('secondNameInput focus:', e),
      onBlur: (e) => console.log('secondNameInput blur:', e),
    });

    const phoneInput = new Input({
      label: 'Телефон',
      type: 'tel',
      inputName: 'phone',
      onFocus: (e) => console.log('phoneInput focus:', e),
      onBlur: (e) => console.log('phoneInput blur:', e),
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      onFocus: (e) => console.log('passwordInput focus:', e),
      onBlur: (e) => console.log('passwordInput blur:', e),
    });

    const passwordConfirmationInput = new Input({
      label: 'Пароль (ещё раз)',
      type: 'password',
      inputName: 'password_confirmation',
      onFocus: (e) => console.log('passwordConfirmationInput focus:', e),
      onBlur: (e) => console.log('passwordConfirmationInput blur:', e),
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
      onSubmit: handleSubmit,
    });

    this.addChildComponent(
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      passwordConfirmationInput,
      submitButton,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Props): void {
    // TODO реализовать метод
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
