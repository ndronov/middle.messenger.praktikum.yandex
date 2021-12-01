// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';

const template = `
form.chats-additional-form(novalidate="")
  h1.title Добавьте пользователя в чат

  chat-id-input(data-component-id=chatIdInput.id)
  user-id-input(data-component-id=userIdInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
`;

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
    return pug.render(template, {
      chatIdInput: this.props.chatIdInput,
      userIdInput: this.props.userIdInput,
      submitButton: this.props.submitButton,
    });
  }
}

export default AddUserToChatForm;
