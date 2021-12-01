// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import './index.scss';

const template = `
div.modal-backdrop
  form.avatar-form(novalidate="")
    h3.title Загрузите файл

    avatar-input(data-component-id=avatarInput.id)

    submit-button(data-component-id=submitButton.id)
`;

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
    return pug.render(template, {
      avatarInput: this.props.avatarInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default AvatarForm;
