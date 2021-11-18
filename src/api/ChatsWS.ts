import chatsAPI from './ChatsAPI';
import store from '../store';
import handleError from '../utils/handleError';
import { Message } from '../models';

export const BASE_WS_URL = 'wss://ya-praktikum.tech/ws/chats';
const PING_PONG_INTERVAL = 15 * 1000;

enum WSMessageType {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Message = 'message',
  Ping = 'ping',
  Pong = 'pong',
  Error = 'error',
  GetOld = 'get old',
}

interface WSMetaMessage {
  type: WSMessageType;
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

    console.log('WS URL', `${BASE_WS_URL}/${user.id}/${this.chatId}/${this.token}`);
    this.ws = new WebSocket(`${BASE_WS_URL}/${user.id}/${this.chatId}/${this.token}`);

    return new Promise((success, fail) => {
      this.ws.addEventListener('open', () => {
        console.log(`Подключение к веб-сокету для чата ${this.chatId} установлено`);

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
    const isContent = Array.isArray(wsMessage);

    console.log('wsMessage', wsMessage);

    if (isContent) {
      ChatWS.handleContentMessage(wsMessage as Message[]);
      return;
    }

    this.handleMetaMessage(wsMessage as WSMetaMessage);
  }

  static handleContentMessage(messages: Message[]): void {
    store.setKeyValue('messages', messages);
  }

  handleMetaMessage(meta: WSMetaMessage): void {
    switch (meta.type) {
      case WSMessageType.Pong:
        this.handlePong();
        break;

      case WSMessageType.Error:
        handleError(meta.content ?? 'Ошибка веб-сокета');
        break;

      default:
        handleError('Неизвестный тип сообщения');
    }
  }

  handlePong(): void {
    setTimeout(() => {
      this.sendWSMessage({ type: WSMessageType.Ping });
    }, PING_PONG_INTERVAL);
  }

  sendWSMessage(message: WSMessage):void {
    this.ws.send(JSON.stringify(message));
  }

  getMessages(offset = 0): void {
    this.sendWSMessage({
      type: WSMessageType.GetOld,
      content: offset.toString(),
    });
  }

  sendMessage(content: string): void {
    this.sendWSMessage({
      type: WSMessageType.Message,
      content,
    });
  }
}

export default ChatWS;
