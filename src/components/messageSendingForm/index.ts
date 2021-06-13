// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';
import './index.scss';

const template = `
form.message-sending-form#message-sending-form
  input.message-input(placeholder="Сообщение", type="text", id="message", name="message")
  button.submit-button(type="submit") &#8594;
`;

class MessageSendingForm extends Component {
  constructor(props: Props) {
    super('form', props);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default MessageSendingForm;
