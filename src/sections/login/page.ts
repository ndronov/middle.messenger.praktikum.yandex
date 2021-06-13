// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';
import SubmitButton from '../../components/submitButton';
import Input from '../../components/input';
import handleFormSubmit from '../../utils/handleFormSubmit';
import validation from './validation';

const template = `
form.auth-form#login-form(novalidate="")
  h1.title Вход
  login-input(data-component-id=loginInput.id)
  password-input(data-component-id=passwordInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
  a.auth-mode-switch-link(href="../signup/index.pug") Нет аккаунта?
`;

class LoginPage extends Block {
  constructor(root: string) {
    const loginInput = new Input({
      label: 'Логин',
      type: 'text',
      inputName: 'login',
      pattern: validation.login.pattern,
      error: validation.login.error,
    });

    const passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      inputName: 'password',
      pattern: validation.password.pattern,
      error: validation.password.error,
    });

    const submitButton = new SubmitButton({
      label: 'Авторизоваться',
    });

    super('form', {
      root,
      loginInput,
      passwordInput,
      submitButton,
      onSubmit: handleFormSubmit,
    });
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
