import pug from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import formatTime from '../../utils/formatTime';
import './index.scss';

const template = `
div.chat-content
    each message in messages
        if message.type == 'message'
            if message.user_id == user.id
                span.message.text-message.text-message_own= message.content
                    time.text-message-time= formatTime(message.time)
            else
                span.message.text-message= message.content
                    time.text-message-time= formatTime(message.time)
        else if message.image
            if message.user_id == user.id
                div.message.image-message.image-message_own
                    img(src=message.image)
                    time.image-message-time= message.time
            else
                div.message.image-message
                    img(src=message.image)
                    time.image-message-time= message.time
`;

class ChatContent extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render(): string {
    return pug.render(template, { ...this.props, formatTime });
  }
}

export default ChatContent;
