import chatsAPI, {
// GetChatRequest,
  CreateChatRequest,
// AddUsersToChatRequest
} from '../../api/ChatsAPI';
import handleError from '../../utils/handleError';
import store from '../../store';
import getSubmittedFormData from '../../utils/getSubmittedFormData';

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
      // TODO clear form after cerate ?
    } catch (error) {
      handleError(error);
    }
  }
}

export default ChatsController;
