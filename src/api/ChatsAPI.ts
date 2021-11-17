import BaseAPI from './BaseAPI';

export interface GetChatRequest {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface CreateChatRequest {
  title: string;
}

export interface AddUserToChatRequest {
  chatId: number;
  userId: number;
}

class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChats(data: GetChatRequest = {}): Promise<void> {
    return this.http.get('', { data });
  }

  createChat(data: CreateChatRequest): Promise<void> {
    return this.http.post('', { data });
  }

  addUsersToChat(rawData: AddUserToChatRequest): Promise<void> {
    const { userId, chatId } = rawData;
    const data = { chatId, users: [userId] };

    return this.http.put('/users', { data });
  }

  deleteUsersFromChat(rawData: AddUserToChatRequest): Promise<void> {
    const { userId, chatId } = rawData;
    const data = { chatId, users: [userId] };

    return this.http.delete('/users', { data });
  }

  read: undefined;

  create: undefined;

  update: undefined;

  delete: undefined;
}

export default new ChatsAPI();
