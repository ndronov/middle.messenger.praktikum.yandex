// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';
import { ValidationMap } from '../../types';
import Input from '../input';
import './index.scss';

const template = `
form.user-settings-form#user-settings
  div.avatar

  email-input(data-component-id=emailInput.id)
  login-input(data-component-id=loginInput.id)
  first-name-input(data-component-id=firstNameInput.id)
  second-name-input(data-component-id=secondNameInput.id)
  display-name-input(data-component-id=displayNameInput.id)
  phone-input(data-component-id=phoneInput.id)

  button.submit-button(type="submit") Сохранить
`;

interface UserSettingsType {
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
}

interface UserSettingsFormProps extends Props {
  values: UserSettingsType;
  validation: ValidationMap;
}

class UserSettingsForm extends Component {
  constructor(props: UserSettingsFormProps) {
    const { validation, values } = props;

    const emailInput = new Input({
      type: 'email',
      label: 'Почта',
      inputName: 'email',
      value: values.email,
      className: 'settings-input-field',
      ...validation.email,
    });

    const loginInput = new Input({
      type: 'text',
      label: 'Логин',
      inputName: 'login',
      value: values.login,
      className: 'settings-input-field',
      ...validation.login,
    });

    const firstNameInput = new Input({
      type: 'text',
      label: 'Имя',
      inputName: 'first_name',
      value: values.first_name,
      className: 'settings-input-field',
      ...validation.name,
    });

    const secondNameInput = new Input({
      type: 'text',
      label: 'Фамилия',
      inputName: 'second_name',
      value: values.second_name,
      className: 'settings-input-field',
      ...validation.name,
    });

    const displayNameInput = new Input({
      type: 'text',
      label: 'Имя в чате',
      inputName: 'display_name',
      value: values.display_name,
      className: 'settings-input-field',
      ...validation.name,
    });

    const phoneInput = new Input({
      type: 'tel',
      label: 'Телефон',
      inputName: 'phone',
      value: values.phone,
      className: 'settings-input-field',
      ...validation.phone,
    });

    super(
      'form',
      {
        ...props,
        emailInput,
        loginInput,
        firstNameInput,
        secondNameInput,
        displayNameInput,
        phoneInput,
      },
    );
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

export default UserSettingsForm;
