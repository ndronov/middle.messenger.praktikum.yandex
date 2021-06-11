// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';

const template = `
form.auth-form#signup-form
  h1.title Регистрация
  label.label(for="email") Почта
  input.input(type="email", id="email", name="email")

  label.label(for="login") Логин
  input.input(type="text", id="login", name="login")

  label.label(for="first_name") Имя
  input.input(type="text", id="first_name", name="first_name")

  label.label(for="second_name") Фамилия
  input.input(type="text", id="second_name", name="second_name")

  label.label(for="phone") Телефон
  input.input(type="tel", id="phone", name="phone")

  label.label(for="password") Пароль
  input.input(type="password", id="password", name="password")

  label.label(for="password_confirmation") Пароль (ещё раз)
  input.input(type="password", id="password_confirmation", name="password_confirmation")

  div.gap

  button.submit-button(type="submit") Зарегистрироваться
  a.auth-mode-switch-link(href="../login/index.pug") Войти
`;

class SignupPage extends Block {
  constructor(props: Props) {
    super('form', props);
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Props): void {
    // TODO реализовать метод
    // eslint-disable-next-line no-console
    console.log('componentDidMount:', oldProps);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default SignupPage;
