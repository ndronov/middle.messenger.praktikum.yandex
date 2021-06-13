// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';
import Input from '../input';
import './index.scss';

// TODO вынести
interface Validation {
  pattern: RegExp;
  error: string;
}

const template = `
form.message-sending-form#message-sending-form
  message-input(data-component-id=messageInput.id)
  button.message-sending-button(type="submit") &#8594;
`;

class MessageSendingForm extends Component {
  constructor(props: Props) {
    const validation = props.validation as Validation;
    const messageInput = new Input({
      className: 'message-input',
      type: 'text',
      inputName: 'message',
      placeholder: 'Сообщение',
      ...validation,
    });

    super('form', { ...props, messageInput });
  }

  render(): string {
    return pug.render(template, {
      messageInput: this.props.messageInput,
    });
  }
}

export default MessageSendingForm;
