// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import './index.scss';

const template = `
div.chats
  each chat in chats
    div.chat
      div.avatar
      div.content
        span.name= chat.name
        span.message= chat.message
      div.additional-content
        time.time= chat.time
        if chat.notificationsNumber
          span.notifications-number= chat.notificationsNumber
`;

class Chats extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Chats;
