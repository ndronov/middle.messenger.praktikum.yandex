export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar?: string;
  unread_count: number;
  login: string;
  last_message?: {
    user: User;
    time: string;
    content: string;
  }
}

export interface Message {
  chat_id: number;
  time: string;
  type: 'message' | 'file';
  user_id: number;
  content : string;
  is_read: boolean;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}
