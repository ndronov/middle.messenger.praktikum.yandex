import chatsAPI, {
  CreateChatRequest,
  AddUserToChatRequest,
} from '../api/ChatsAPI';
import handleError from '../utils/handleError';
import store from '../store';
import getSubmittedFormData from '../utils/getSubmittedFormData';

class ChatsController {
  public static async getChats(): Promise<void> {
    try {
      const chats = await chatsAPI.getChats({ limit: 40 });

      setTimeout(() => store.setKeyValue('chats', chats), 0);
    } catch (error) {
      handleError(error);
    }
  }

  public static async createChat(e: Event): Promise<void> {
    try {
      const newChatData = getSubmittedFormData<CreateChatRequest>(e);

      await chatsAPI.createChat(newChatData);
    } catch (error) {
      handleError(error);
    }
  }

  public static async addUserToChat(e: Event): Promise<void> {
    try {
      const data = getSubmittedFormData<AddUserToChatRequest>(e);

      await chatsAPI.addUsersToChat(data);
    } catch (error) {
      handleError(error);
    }
  }

  public static async deleteUserFromChat(e: Event): Promise<void> {
    try {
      const data = getSubmittedFormData<AddUserToChatRequest>(e);

      await chatsAPI.deleteUserFromChat(data);
    } catch (error) {
      handleError(error);
    }
  }

  public static async getChatUsers(chatId: number): Promise<void> {
    try {
      const users = await chatsAPI.getChatUsers({ chatId });

      // TODO it's debug
      console.log(`chat ${chatId} users:`, users);
    } catch (error) {
      handleError(error);
    }
  }

  public static async getChatToken(chatId: number): Promise<void> {
    try {
      const response = await chatsAPI.getChatToken(chatId);

      // TODO it's debug
      console.log(`token for ${chatId}:`, response.token);

      // const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${113440}/${chatId}/${response.token}`);
      // /ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>

      // const socket = null;

      // socket?.addEventListener('open', () => {
      //   console.log('Соединение установлено!');

      // socket.send(JSON.stringify({
      //   content: 'Моё первое сообщение миру!',
      //   type: 'message',
      // }));
      // });
    } catch (error) {
      handleError(error);
    }
  }
}

export default ChatsController;
