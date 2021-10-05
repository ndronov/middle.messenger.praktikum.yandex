import BaseAPI from './BaseAPI';

export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignUpResponse {
  id: number;
}

export interface SignInRequest {
  login: string;
  password: string;
}

export interface GetUserInfoResponse {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signUp(data: SignUpRequest): Promise<SignUpResponse> {
    return this.http.post<SignUpResponse>('/signup', { data });
  }

  signIn(data: SignInRequest): Promise<void> {
    return this.http.post<void>('/signin', { data });
  }

  logout(): Promise<void> {
    return this.http.post<void>('/logout');
  }

  read<T = GetUserInfoResponse>(): Promise<T> {
    return this.http.get<T>('/user');
  }

  create: undefined;

  update: undefined;

  delete: undefined;
}
