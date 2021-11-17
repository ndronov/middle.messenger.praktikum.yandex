// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import SubmitButton from '../submitButton';
import './index.scss';

const template = `
form.new-chat-form.chats-additional-form(novalidate="")
  h1.title Создайте новый чат

  chat-title-input(data-component-id=chatTitleInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
`;

interface NewChatFormValues {
  title?: string;
}

class NewChatForm extends Component {
  protected readonly props: FormProps<NewChatFormValues>;

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
