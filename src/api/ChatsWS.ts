import chatsAPI from './ChatsAPI';
import store from '../store';
import handleError from '../utils/handleError';

export const BASE_WS_URL = 'wss://ya-praktikum.tech/ws/chats';
const PING_PONG_INTERVAL = 15 * 1000;

enum MessageType {
  Message = 'message',
  Ping = 'ping',
  Pong = 'pong',
  Error = 'error',
  UserConnected = 'user connected',
  GetOld = 'get old',
}
interface Message {
  type: MessageType;
  content?: string;
}

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
        this.handlePongMessage();

        this.ws.addEventListener('message', this.handleMessage.bind(this));

        this.ws.addEventListener('close', (event) => {
          if (event.wasClean) {
            console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`, event);
          } else {
            console.log(`[close] Соединение прервано, код=${event.code} причина=${event.reason}`, event);
          }
        });
        success();
      });

      this.ws.addEventListener('error', () => {
        const error = new Error(`Не удалось подключиться в веб-сокету для чата ${this.chatId}`);
        fail(error);
      });
    });
  }

  handleMessage(event: MessageEvent) {
    const message = JSON.parse(event.data) as Message;

    switch (message.type) {
      case MessageType.Pong:
        this.handlePongMessage();
        break;

      case MessageType.Error:
        handleError(message.content ?? 'Ошибка веб-сокета');
        break;

      default:
        handleError('Неизвестный тип сообщения');
    }
  }

  handlePongMessage() {
    setTimeout(() => {
      this.sendMessage({ type: MessageType.Ping });
    }, PING_PONG_INTERVAL);
  }

  sendMessage(message: Message) {
    this.ws.send(JSON.stringify(message));
  }

  // sendMessage(content: string) {
  //   this.ws.send(JSON.stringify({
  //     content,
  //     type: 'message',
  //   }));
  // }
}

export default ChatWS;
