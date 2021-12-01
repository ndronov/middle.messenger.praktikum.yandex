// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';

const template = `
form.chats-additional-form(novalidate="")
  h1.title Удалите пользователя из чата

  chat-id-input(data-component-id=chatIdInput.id)
  user-id-input(data-component-id=userIdInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
`;

interface DeleteUserFromChatFormValues {
  chatId?: number;
  userId?: number;
}

interface DeleteUserFromChatFormProps extends FormProps<DeleteUserFromChatFormValues> {
  chatIdInput: Input;
  userIdInput: Input;
  submitButton: Input;
}

class DeleteUserFromChatForm extends Component {
  readonly props: DeleteUserFromChatFormProps;

  constructor(props: FormProps<DeleteUserFromChatFormValues>) {
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
      label: 'Удалить',
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
    return pug.render(template, {
      chatIdInput: this.props.chatIdInput,
      userIdInput: this.props.userIdInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default DeleteUserFromChatForm;
