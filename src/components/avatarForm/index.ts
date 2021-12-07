import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import template from './template.pug';
import './index.scss';

interface AvatarFormProps extends FormProps {
  avatarInput: Input;
  submitButton: Input;
}

class AvatarForm extends Component {
  readonly props: AvatarFormProps;

  constructor(props: FormProps) {
    const submitButton = new SubmitButton({
      label: 'Сохранить',
    });

    const avatarInput = new Input({
      type: 'file',
      accept: 'image/*',
      label: 'Выбрать файл',
      inputName: 'avatar',
      className: 'avatar-field',
    });

    super(
      'div',
      {
        ...props,
        eventTargetSelector: 'form',
        avatarInput,
        submitButton,
      },
    );
  }

  render(): string {
    return template({
      avatarInput: this.props.avatarInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default AvatarForm;
