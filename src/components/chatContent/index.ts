// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';

const template = `
div.chat-content
    div.date= content.date
    each message in content.messages
        if message.text
            if message.own
                span.message.text-message.text-message_own= message.text
                    time.text-message-time= message.time
            else
                span.message.text-message= message.text
                    time.text-message-time= message.time
        else if message.image
            if message.own
                div.message.image-message.image-message_own
                    img(src="../../../static/image.png")
                    time.image-message-time= message.time
            else
                div.message.image-message(src="../../../static/image.png")
                    img(src="../../../static/image.png")
                    time.image-message-time= message.time
`;

class ChatContent extends Component {
  constructor(props: Props) {
    super('div', props);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default ChatContent;
