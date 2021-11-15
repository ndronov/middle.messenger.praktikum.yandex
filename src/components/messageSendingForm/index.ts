// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import './index.scss';

const template = `
form.message-sending-form(novalidate="")
  message-input(data-component-id=messageInput.id)
  button.message-sending-button(type="submit") &#8594;
`;

interface MessageSendingFormValues {
  message?: string;
}

class MessageSendingForm extends Component {
  protected readonly props: FormProps<MessageSendingFormValues>;

  constructor(props: FormProps<MessageSendingFormValues>) {
    const { validation } = props;
    const messageInput = new Input({
      className: 'message-input',
      type: 'text',
      inputName: 'message',
      placeholder: 'Сообщение',
      ...validation?.message,
    });

    super(
      'form',
      { ...props, messageInput },
    );
  }

  render(): string {
    return pug.render(template, {
      messageInput: this.props.messageInput,
    });
  }
}

export default MessageSendingForm;
