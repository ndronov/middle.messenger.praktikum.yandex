import chatsAPI from './ChatsAPI';
import store from '../store';
import handleError from '../utils/handleError';
import { Message } from '../models';

export const BASE_WS_URL = 'wss://ya-praktikum.tech/ws/chats';
const PING_PONG_INTERVAL = 15 * 1000;

enum MessageType {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Message = 'message',
  Ping = 'ping',
  Pong = 'pong',
  Error = 'error',
  GetOld = 'get old',
}

interface WSMetaMessage {
  type: MessageType;
  content?: string;
}

type WSMessage = WSMetaMessage | Message[];

class ChatWS {
  private ws: WebSocket;

  private token: string;

  private readonly chatId: number;

  constructor(chatId: number) {
    this.chatId = chatId;
  }

  async init(): Promise<void> {
    const { user } = store.data;
    const { token } = await chatsAPI.getChatToken(this.chatId);
    this.token = token;

    this.ws = new WebSocket(`${BASE_WS_URL}/${user.id}/${this.chatId}/${this.token}`);

    return new Promise((success, fail) => {
      this.ws.addEventListener('open', () => {
        this.ws.addEventListener('message', this.handleWSMessage.bind(this));

        this.ws.addEventListener('close', (event) => {
          if (event.wasClean) {
            console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`, event);
          } else {
            console.log(`[close] Соединение прервано, код=${event.code} причина=${event.reason}`, event);
          }
        });

        success();

        this.handlePong();
        this.getMessages();
      });

      this.ws.addEventListener('error', () => {
        const error = new Error(`Не удалось подключиться в веб-сокету для чата ${this.chatId}`);
        fail(error);
      });
    });
  }

  handleWSMessage(event: MessageEvent): void {
    const wsMessage = JSON.parse(event.data) as WSMessage;
    const isMessages = Array.isArray(wsMessage);

    if (isMessages) {
      ChatWS.setChatMessages(wsMessage as Message[]);
      return;
    }

    this.handleMetaMessage(wsMessage as WSMetaMessage);
  }

  static setChatMessages(messages: Message[]): void {
    store.setKeyValue('messages', messages);
  }

  addChatMessage(message: Message): void {
    const { messages } = store.data;
    const newMessage = { ...message, chat_id: this.chatId };
    const newMessages = [newMessage, ...messages];

    store.setKeyValue('messages', newMessages);
  }

  handleMetaMessage(meta: WSMetaMessage): void {
    switch (meta.type) {
      case MessageType.Pong:
        this.handlePong();
        break;

      case MessageType.Message:
        this.addChatMessage(meta as Message);
        break;

      case MessageType.Error:
        handleError(meta.content ?? 'Ошибка веб-сокета');
        break;

      default:
        handleError('Неизвестный тип сообщения');
    }
  }

  handlePong(): void {
    setTimeout(() => {
      this.sendWSMessage({ type: MessageType.Ping });
    }, PING_PONG_INTERVAL);
  }

  sendWSMessage(message: WSMessage):void {
    this.ws.send(JSON.stringify(message));
  }

  getMessages(offset = 0): void {
    this.sendWSMessage({
      type: MessageType.GetOld,
      content: offset.toString(),
    });
  }

  sendMessage(content: string): void {
    this.sendWSMessage({
      type: MessageType.Message,
      content,
    });
  }
}

export default ChatWS;
