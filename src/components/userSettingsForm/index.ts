// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import '../../styles/settings.scss';

const template = `
form.settings-form#user-settings(novalidate="")
  div.avatar

  email-input(data-component-id=emailInput.id)
  login-input(data-component-id=loginInput.id)
  first-name-input(data-component-id=firstNameInput.id)
  second-name-input(data-component-id=secondNameInput.id)
  display-name-input(data-component-id=displayNameInput.id)
  phone-input(data-component-id=phoneInput.id)

  if (editMode)
    submit-button(data-component-id=submitButton.id)
  else
    div.links
      a.link(href="#") Изменить данные
      a.link(href="#") Изменить пароль
      a.link.exit-link(href="#") Выйти
`;

interface UserSettingsValues {
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
}

class UserSettingsForm extends Component {
  constructor(props: FormProps<UserSettingsValues>) {
    const { validation, values } = props;

    const emailInput = new Input({
      type: 'email',
      label: 'Почта',
      inputName: 'email',
      value: values?.email,
      className: 'settings-input-field',
      ...validation?.email,
    });

    const loginInput = new Input({
      type: 'text',
      label: 'Логин',
      inputName: 'login',
      value: values?.login,
      className: 'settings-input-field',
      ...validation?.login,
    });

    const firstNameInput = new Input({
      type: 'text',
      label: 'Имя',
      inputName: 'first_name',
      value: values?.first_name,
      className: 'settings-input-field',
      ...validation?.name,
    });

    const secondNameInput = new Input({
      type: 'text',
      label: 'Фамилия',
      inputName: 'second_name',
      value: values?.second_name,
      className: 'settings-input-field',
      ...validation?.name,
    });

    const displayNameInput = new Input({
      type: 'text',
      label: 'Имя в чате',
      inputName: 'display_name',
      value: values?.display_name,
      className: 'settings-input-field',
      ...validation?.name,
    });

    const phoneInput = new Input({
      type: 'tel',
      label: 'Телефон',
      inputName: 'phone',
      value: values?.phone,
      className: 'settings-input-field',
      ...validation?.phone,
    });

    const submitButton = new SubmitButton({
      label: 'Сохранить',
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
        submitButton,
      },
    );
  }

  render(): string {
    return pug.render(template, {
      editMode: this.props.editMode,
      emailInput: this.props.emailInput,
      loginInput: this.props.loginInput,
      firstNameInput: this.props.firstNameInput,
      secondNameInput: this.props.secondNameInput,
      displayNameInput: this.props.displayNameInput,
      phoneInput: this.props.phoneInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default UserSettingsForm;
