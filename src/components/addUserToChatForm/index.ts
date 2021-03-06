import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import template from './template.pug';

interface AddUserToChatFormValues {
  chatId?: number;
  userId?: number;
}

interface AddUserToChatFormProps extends FormProps<AddUserToChatFormValues> {
  chatIdInput: Input;
  userIdInput: Input;
  submitButton: Input;
}

class AddUserToChatForm extends Component {
  readonly props: AddUserToChatFormProps;

  constructor(props: FormProps<AddUserToChatFormValues>) {
    const chatIdInput = new Input({
      className: 'chats-additional-form-field',
      type: 'number',
      inputName: 'chatId',
      label: 'ID чата',
    });

    const userIdInput = new Input({
      className: 'chats-additional-form-field',
      type: 'number',
      inputName: 'userId',
      label: 'ID пользователя',
    });

    const submitButton = new SubmitButton({
      label: 'Добавить',
    });

    super(
      'form',
      {
        ...props,
        chatIdInput,
        userIdInput,
        submitButton,
      },
    );
  }

  render(): string {
    return template({
      chatIdInput: this.props.chatIdInput,
      userIdInput: this.props.userIdInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default AddUserToChatForm;
