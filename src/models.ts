export interface UserProfile {
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
    user: UserProfile;
    time: string;
    content: string;
  }
}
