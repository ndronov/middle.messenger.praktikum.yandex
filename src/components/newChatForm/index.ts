import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import template from './template';

interface NewChatFormValues {
  title?: string;
}

interface NewChatFormProps extends FormProps<NewChatFormValues> {
  chatTitleInput: Input;
  submitButton: SubmitButton;
}

class NewChatForm extends Component {
  readonly props: NewChatFormProps;

  constructor(props: FormProps<NewChatFormValues>) {
    const { validation } = props;

    const chatTitleInput = new Input({
      className: 'chats-additional-form-field',
      type: 'text',
      inputName: 'title',
      value: '',
      label: 'Название чата',
      ...validation?.title,
    });

    const submitButton = new SubmitButton({
      label: 'Создать',
    });

    super(
      'form',
      {
        ...props,
        chatTitleInput,
        submitButton,
      },
    );
  }

  render(): string {
    return pug.render(template, {
      chatTitleInput: this.props.chatTitleInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default NewChatForm;
