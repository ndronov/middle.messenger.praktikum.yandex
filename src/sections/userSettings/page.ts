// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import Input from '../../components/input';
import validation from './validation';

// TODO вынести форму

const template = `
div.container
  aside.aside-panel
    button.back-button(type="button") &#8592;

  form.settings-form#user-settings
    div.avatar

    email-input(data-component-id=emailInput.id)
    login-input(data-component-id=loginInput.id)
    first-name-input(data-component-id=firstNameInput.id)
    second-name-input(data-component-id=secondNameInput.id)
    display-name-input(data-component-id=displayNameInput.id)
    phone-input(data-component-id=phoneInput.id)

    button.submit-button(type="submit") Сохранить
`;

class UserSettings extends Component {
  constructor(root: string) {
    const emailInput = new Input({
      type: 'email',
      label: 'Почта',
      inputName: 'email',
      value: 'pochta@yandex.ru',
      className: 'settings-input',
      ...validation.email,
    });

    const loginInput = new Input({
      type: 'text',
      label: 'Логин',
      inputName: 'login',
      value: 'ivanivanov',
      className: 'settings-input',
      ...validation.login,
    });

    const firstNameInput = new Input({
      type: 'text',
      label: 'Имя',
      inputName: 'first_name',
      value: 'Иван',
      className: 'settings-input',
      ...validation.name,
    });

    const secondNameInput = new Input({
      type: 'text',
      label: 'Фамилия',
      inputName: 'second_name',
      value: 'Иванов',
      className: 'settings-input',
      ...validation.name,
    });

    const displayNameInput = new Input({
      type: 'text',
      label: 'Имя в чате',
      inputName: 'display_name',
      value: 'Иван',
      className: 'settings-input',
      ...validation.name,
    });

    const phoneInput = new Input({
      type: 'tel',
      label: 'Телефон',
      inputName: 'phone',
      value: '+7 (909) 967 3030',
      className: 'settings-input',
      ...validation.phone,
    });

    super('div', {
      root,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
    });
  }

  render(): string {
    return pug.render(template, {
      emailInput: this.props.emailInput,
      loginInput: this.props.loginInput,
      firstNameInput: this.props.firstNameInput,
      secondNameInput: this.props.secondNameInput,
      displayNameInput: this.props.displayNameInput,
      phoneInput: this.props.phoneInput,
    });
  }
}

export default UserSettings;
