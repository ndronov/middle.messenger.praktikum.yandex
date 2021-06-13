// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import Chats from '../../components/chats';
import ChatContent from '../../components/chatContent';
import mockChats from '../../mockData/mockChats';
import mockActiveChat from '../../mockData/mockActiveChat';

const template = `
div.container
  nav.navigation
    a(href="#").profile-link Профиль &rang;
    button.search-button &#128269; Поиск
    chats(data-component-id=chats.id)
  div.active-chat
    div.user-panel
      div.avatar
      div.name= userName
    chat-content(data-component-id=chatContent.id)
    form.message-sending-form#message-sending-form
      input.message-input(placeholder="Сообщение", type="text", id="message", name="message")
      button.submit-button(type="submit") &#8594;
`;

class ActiveChat extends Component {
  constructor(root: string) {
    const chats = new Chats({
      chats: mockChats,
    });

    const chatContent = new ChatContent({
      content: mockActiveChat.content,
    });

    super('div', {
      root,
      chats,
      chatContent,
    });
  }

  render(): string {
    return pug.render(template, {
      chats: this.props.chats,
      userName: mockActiveChat.userName,
      chatContent: this.props.chatContent,
    });
  }
}

export default ActiveChat;
