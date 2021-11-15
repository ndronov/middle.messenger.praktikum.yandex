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
  avatar: string;
  unread_count: number;
  login: string;
  last_message: {
    user: User;
    time: string;
    content: string;
  }
}
