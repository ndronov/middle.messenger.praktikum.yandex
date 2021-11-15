import chatsAPI, {
// GetChatRequest,
// CreateChatRequest,
// AddUsersToChatRequest
} from '../../api/ChatsAPI';
import handleError from '../../utils/handleError';
import store from '../../store';

class ChatsController {
  public static async getChats(): Promise<void> {
    try {
      const chats = await chatsAPI.getChats();

      setTimeout(() => store.setKeyValue('chats', chats), 0);
    } catch (error) {
      handleError(error);
    }
  }
}

export default ChatsController;
