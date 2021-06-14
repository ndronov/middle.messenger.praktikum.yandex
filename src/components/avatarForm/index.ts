// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import '../../styles/settings.scss';

const template = `
div.modal-backdrop
  form.avatar-form
    h3.title Загрузите файл

    avatar-input(data-component-id=avatarInput.id)

    submit-button(data-component-id=submitButton.id)
`;

interface AvatarFormValues {
  avatar?: unknown;
}

class AvatarForm extends Component {
  constructor(props: FormProps<AvatarFormValues>) {
    const { values } = props;

    const submitButton = new SubmitButton({
      label: 'Поменять',
    });

    const avatarInput = new Input({
      type: 'file',
      accept: 'image/*',
      label: 'Выбрать файл на компьютере',
      inputName: 'avatar',
      value: values?.avatar,
      className: 'label',
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
