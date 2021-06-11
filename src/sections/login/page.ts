// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';
import SubmitButton from '../../components/submitButton';

const template = `
component-template.auth-form#login-form
  h1.title Вход
  label.label(for="login") Логин
  input.input(type="text", id="login", name="login")
  label.label(for="password") Пароль
  input.input(type="password", id="password", name="password")
  div.gap
  button.submit-button(type="submit") Авторизоваться
  submit-button(data-component)
  a.auth-mode-switch-link(href="../signup/index.pug") Нет аккаунта?
`;

class LoginPage extends Block {
  constructor() {
    super('form', {
      submitButton: new SubmitButton({
        label: 'Авторизоваться',
      }),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Props): void {
    // TODO реализовать метод
  }

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return pug.render(template, {
      submitButton: this.props.submitButton,
    });
  }
}

export default LoginPage;
