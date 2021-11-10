import BaseAPI from './BaseAPI';

export interface ChangeProfileRequest {
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

class UsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: ChangeProfileRequest): Promise<void> {
    return this.http.put('/profile', { data });
  }

  changePassword(data: ChangePasswordRequest): Promise<void> {
    return this.http.put('/password', { data });
  }

  read: undefined;

  create: undefined;

  update: undefined;

  delete: undefined;
}

export default new UsersAPI();
