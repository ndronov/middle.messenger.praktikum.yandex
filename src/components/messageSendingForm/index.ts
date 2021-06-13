// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';
import { Validation } from '../../types';
import Input from '../input';
import './index.scss';

const template = `
form.message-sending-form#message-sending-form
  message-input(data-component-id=messageInput.id)
  button.message-sending-button(type="submit") &#8594;
`;

interface MessageSendingFormProps extends Props {
  validation: Validation;
}

class MessageSendingForm extends Component {
  constructor(props: MessageSendingFormProps) {
    const { validation } = props;
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
