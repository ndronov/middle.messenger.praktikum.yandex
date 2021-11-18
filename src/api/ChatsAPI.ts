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

export interface GetChatUsersRequest {
  chatId: number;
  offset?: number;
  name?: string;
  email?: string;
}

export interface GetChatTokenResponse {
  token: string;
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

  deleteUserFromChat(rawData: AddUserToChatRequest): Promise<void> {
    const { userId, chatId } = rawData;
    const data = { chatId, users: [userId] };

    return this.http.delete('/users', { data });
  }

  getChatUsers(params: GetChatUsersRequest): Promise<void> {
    const { chatId, ...data } = params;

    return this.http.get(`/${chatId}/users`, { data });
  }

  getChatToken(chatId: number): Promise<GetChatTokenResponse> {
    return this.http.post(`/token/${chatId}`);
  }

  read: undefined;

  create: undefined;

  update: undefined;

  delete: undefined;
}

export default new ChatsAPI();
