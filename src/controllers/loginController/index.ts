import AuthAPI, { SignInRequest } from '../../api/AuthAPI';
import getSubmittedFormData from '../../utils/getSubmittedFormData';
import Router from '../../modules/router';

// TODO rework router
const router = new Router('.app');
const authAPI = new AuthAPI();

class LoginController {
  // eslint-disable-next-line class-methods-use-this
  public async login(e: Event) {
    try {
      const credentials = getSubmittedFormData(e) as unknown as SignInRequest;
      // TODO надо делать валидацию формы ?
      // TODO add preloader ?

      await authAPI.signIn(credentials);

      router.go('/chats');

      // TODO stop preloader ?
    } catch (error) {
      // TODO handle error
      console.log(error);
    }
  }
}

export default new LoginController();
