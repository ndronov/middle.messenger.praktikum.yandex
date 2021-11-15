import BaseAPI from './BaseAPI';
import { User } from '../models';

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

class AuthAPI extends BaseAPI {
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

  read<T = User>(): Promise<T> {
    return this.http.get<T>('/user');
  }

  create: undefined;

  update: undefined;

  delete: undefined;
}

export default new AuthAPI();
