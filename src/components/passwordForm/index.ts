import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import getAvatarURL from '../../utils/getAvatarURL';
import { User } from '../../models';
import template from './template.pug';

interface PasswordFormValues {
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

interface PasswordFormProps extends FormProps<PasswordFormValues> {
  user?: User;
  oldPasswordInput: Input;
  newPasswordInput: Input;
  newPasswordConfirmationInput: Input;
  submitButton: Input;
}

class PasswordForm extends Component {
  readonly props: PasswordFormProps;

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
  }

  render(): string {
    const { user } = this.props;

    if (!user) {
      return '';
    }

    return template({
      avatar: getAvatarURL(user.avatar),
      oldPasswordInput: this.props.oldPasswordInput,
      newPasswordInput: this.props.newPasswordInput,
      newPasswordConfirmationInput: this.props.newPasswordConfirmationInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default PasswordForm;
