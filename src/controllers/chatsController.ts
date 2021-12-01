import chatsAPI, {
  CreateChatRequest,
  AddUserToChatRequest,
  SendMessageRequest,
} from '../api/ChatsAPI';
import ChatWS from '../api/ChatsWS';

import handleError from '../utils/handleError';
import getSubmittedFormData from '../utils/getSubmittedFormData';
import store from '../store';
import { ComponentUpdateOptions } from '../types';

class ChatsController {
  private static chatWS: ChatWS;

  public static async getChats(options: ComponentUpdateOptions = {}): Promise<void> {
    try {
      const chats = await chatsAPI.getChats({ limit: 40 });
      store.setData('chats', chats, options);
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

  public static async openWebSocket(chatId: number): Promise<void> {
    try {
      store.clearData('messages', { silent: true });
      ChatsController.chatWS = new ChatWS(chatId);
      await ChatsController.chatWS.init();
    } catch (error) {
      handleError(error);
    }
  }

  public static async sendMessage(e: Event): Promise<void> {
    try {
      const { message } = getSubmittedFormData<SendMessageRequest>(e);
      ChatsController.chatWS.sendMessage(message);
    } catch (error) {
      handleError(error);
    }
  }
}

export default ChatsController;
