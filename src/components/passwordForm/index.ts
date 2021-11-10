// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import store from '../../store';
import getAvatarURL from '../../utils/getAvatarURL';

const template = `
form.settings-form#user-settings(novalidate="")
  if (avatar)
    img.settings-form-avatar(src=avatar, alt="Аватар")
  else
    div.settings-form-avatar

  old-password-input(data-component-id=oldPasswordInput.id)
  new-password-input(data-component-id=newPasswordInput.id)
  new-password-confirmation-input(data-component-id=newPasswordConfirmationInput.id)

  submit-button(data-component-id=submitButton.id)
`;

interface PasswordFormValues {
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

class PasswordForm extends Component {
  protected readonly props: FormProps<PasswordFormValues>;

  constructor(props: FormProps<PasswordFormValues>) {
    const { validation } = props;

    const oldPasswordInput = new Input({
      type: 'password',
      label: 'Старый пароль',
      inputName: 'oldPassword',
      value: '',
      className: 'settings-input-field',
      ...validation?.password,
    });

    const newPasswordInput = new Input({
      type: 'password',
      label: 'Новый пароль',
      inputName: 'newPassword',
      value: '',
      className: 'settings-input-field',
      ...validation?.password,
    });

    const newPasswordConfirmationInput = new Input({
      type: 'password',
      label: 'Повторите новый пароль',
      inputName: 'newPasswordConfirmation',
      value: '',
      className: 'settings-input-field',
      ...validation?.password,
    });

    const submitButton = new SubmitButton({
      label: 'Сохранить',
    });

    super(
      'form',
      {
        ...props,
        oldPasswordInput,
        newPasswordInput,
        newPasswordConfirmationInput,
        submitButton,
      },
    );

    store.connect(this);
  }

  render(): string {
    const { user } = store.data;

    return pug.render(template, {
      avatar: getAvatarURL(user.avatar),
      oldPasswordInput: this.props.oldPasswordInput,
      newPasswordInput: this.props.newPasswordInput,
      newPasswordConfirmationInput: this.props.newPasswordConfirmationInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default PasswordForm;
