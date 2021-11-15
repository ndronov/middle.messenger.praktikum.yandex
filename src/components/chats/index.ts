// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';

const template = `
div.chats
  each chat in chats
    div.chat
      div.avatar
      div.content
        span.name= chat.title
        span.message= chat.message
      div.additional-content
        time.time= chat.time
        if chat.unread_count
          span.notifications-number= chat.unread_count
`;

// TODO отобразить данные чатов

class Chats extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Chats;
