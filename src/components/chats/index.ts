// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import formatTime from '../../utils/formatTime';

// TODO создать механизм перехода на страницу чата
// TODO remove id from chat title

const template = `
div.chats
  each chat in chats
    div.chat
      div.avatar(title=chat.title)
      div.content
        if chat.last_message
          span.name= chat.last_message.user.display_name
        else
          span.name= chat.title + ' ('+ chat.id + ')'
        if chat.last_message
          span.message= chat.last_message.content
      div.additional-content
        if chat.last_message
          time.time= formatTime(chat.last_message.time)
        if unread_count
          span.notifications-number= unread_count
`;

class Chats extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render(): string {
    return pug.render(template, { ...this.props, formatTime });
  }
}

export default Chats;
