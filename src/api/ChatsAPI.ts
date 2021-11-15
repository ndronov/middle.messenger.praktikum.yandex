import BaseAPI from './BaseAPI';

export interface GetChatRequest {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface CreateChatRequest {
  title: string;
}

export interface AddUsersToChatRequest {
  chatId: number;
  users: number[];
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

  addUsersToChat(data: AddUsersToChatRequest): Promise<void> {
    return this.http.put('/users', { data });
  }

  deleteUsersFromChat(data: AddUsersToChatRequest): Promise<void> {
    return this.http.delete('/users', { data });
  }

  read: undefined;

  create: undefined;

  update: undefined;

  delete: undefined;
}

export default new ChatsAPI();
