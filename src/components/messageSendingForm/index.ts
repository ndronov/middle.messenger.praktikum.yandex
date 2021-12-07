import Component from '../../modules/component';
import { FormProps } from '../../types';
import Input from '../input';
import template from './template.pug';
import './index.scss';

interface MessageSendingFormValues {
  message?: string;
}

interface MessageSendingFormProps extends FormProps<MessageSendingFormValues> {
  messageInput: Input;
}

class MessageSendingForm extends Component {
  readonly props: MessageSendingFormProps;

  constructor(props: FormProps<MessageSendingFormValues>) {
    const messageInput = new Input({
      className: 'message-input',
      type: 'text',
      inputName: 'message',
      placeholder: 'Сообщение',
    });

    super(
      'form',
      { ...props, messageInput },
    );
  }

  render(): string {
    return template({
      messageInput: this.props.messageInput,
    });
  }
}

export default MessageSendingForm;
