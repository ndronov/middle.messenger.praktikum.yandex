// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';
import SubmitButton from '../../components/submitButton';
import Input from '../../components/input';

const template = `
form.auth-form#login-form
  h1.title Вход
  login-input(data-component-id=loginInput.id)
  password-input(data-component-id=passwordInput.id)
  div.gap
  submit-button(data-component-id=submitButton.id)
  a.auth-mode-switch-link(href="../signup/index.pug") Нет аккаунта?
`;

const handleSubmit = (e: Event) => {
  console.log('form submit:', e);
  e.preventDefault();
};

class LoginPage extends Block {
  constructor(root: string) {
    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      // TODO реализовать валидацию
      onFocus: (e) => console.log('loginInput focus:', e),
      onBlur: (e) => console.log('loginInput blur:', e),
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      onFocus: (e) => console.log('passwordInput focus:', e),
      onBlur: (e) => console.log('passwordInput blur:', e),
    });

    const submitButton = new SubmitButton({
      label: 'Авторизоваться',
    });

    super('form', {
      root,
      loginInput,
      passwordInput,
      submitButton,
      onSubmit: handleSubmit,
    });

    this.addChildComponent(loginInput, passwordInput, submitButton);
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Props): void {
    // TODO реализовать метод
  }

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return pug.render(template, {
      loginInput: this.props.loginInput,
      passwordInput: this.props.passwordInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default LoginPage;
