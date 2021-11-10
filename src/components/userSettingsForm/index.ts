// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import getAvatarURL from '../../utils/getAvatarURL';
import { FormProps } from '../../types';
import Link from '../link';
import Input from '../input';
import SubmitButton from '../submitButton';
import store from '../../store';

const template = `
form.settings-form#user-settings(novalidate="")
  if (avatar)
    img.settings-form-avatar(src=avatar, alt="Аватар")
  else
    div.settings-form-avatar

  email-input(data-component-id=emailInput.id)
  login-input(data-component-id=loginInput.id)
  first-name-input(data-component-id=firstNameInput.id)
  second-name-input(data-component-id=secondNameInput.id)
  display-name-input(data-component-id=displayNameInput.id)
  phone-input(data-component-id=phoneInput.id)

  div.links
    link(data-component-id=avatarLink.id)
    link(data-component-id=passwordLink.id)
    link(data-component-id=logoutLink.id)

  submit-button(data-component-id=submitButton.id)
`;

// TODO remove ?
interface UserSettingsFormValues {
  email?: string;
  login?: string;
  firstName?: string;
  secondName?: string;
  displayName?: string;
  phone?: string;
}

interface UserSettingsFormProps extends FormProps<UserSettingsFormValues> {
  emailInput: Input;
  loginInput: Input;
  firstNameInput: Input;
  secondNameInput: Input;
  displayNameInput: Input;
  phoneInput: Input;
  logoutLink: Link;
  passwordLink: Link;
  avatarLink: Link;
  submitButton: Input;
}

class UserSettingsForm extends Component {
  protected readonly props: UserSettingsFormProps;

  constructor(props: FormProps<UserSettingsFormValues>) {
    const { validation } = props;

    const emailInput = new Input({
      type: 'email',
      label: 'Почта',
      inputName: 'email',
      value: '',
      className: 'settings-input-field',
      ...validation?.email,
    });

    const loginInput = new Input({
      type: 'text',
      label: 'Логин',
      inputName: 'login',
      value: '',
      className: 'settings-input-field',
      ...validation?.login,
    });

    const firstNameInput = new Input({
      type: 'text',
      label: 'Имя',
      inputName: 'first_name',
      value: '',
      className: 'settings-input-field',
      ...validation?.name,
    });

    const secondNameInput = new Input({
      type: 'text',
      label: 'Фамилия',
      inputName: 'second_name',
      value: '',
      className: 'settings-input-field',
      ...validation?.name,
    });

    const displayNameInput = new Input({
      type: 'text',
      label: 'Имя в чате',
      inputName: 'display_name',
      value: '',
      className: 'settings-input-field',
      ...validation?.name,
    });

    const phoneInput = new Input({
      type: 'tel',
      label: 'Телефон',
      inputName: 'phone',
      value: '',
      className: 'settings-input-field',
      ...validation?.phone,
    });

    const logoutLink = new Link({
      label: 'Выйти из системы',
      href: '/sign-out',
      className: 'link exit-link',
    });

    const passwordLink = new Link({
      label: 'Изменить пароль',
      href: '/password',
      className: 'link',
    });

    const avatarLink = new Link({
      label: 'Изменить аватар',
      href: '/avatar',
      className: 'link',
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
        logoutLink,
        passwordLink,
        avatarLink,
        submitButton,
      },
    );

    store.connect(this);
  }

  render(): string {
    const { user } = store.data;

    return pug.render(template, {
      avatar: getAvatarURL(user.avatar),
      emailInput: this.props.emailInput.setProps({ value: user.email }),
      loginInput: this.props.loginInput.setProps({ value: user.login }),
      firstNameInput: this.props.firstNameInput.setProps({ value: user.first_name }),
      secondNameInput: this.props.secondNameInput.setProps({ value: user.second_name }),
      displayNameInput: this.props.displayNameInput.setProps({ value: user.display_name }),
      phoneInput: this.props.phoneInput.setProps({ value: user.phone }),
      logoutLink: this.props.logoutLink,
      passwordLink: this.props.passwordLink,
      avatarLink: this.props.avatarLink,
      submitButton: this.props.submitButton,
    });
  }
}

export default UserSettingsForm;
