import authAPI, { SignInRequest } from '../../api/AuthAPI';
import getSubmittedFormData from '../../utils/getSubmittedFormData';
import handleError from '../../utils/handleError';
import router from '../../modules/router';

class LoginController {
  public static async login(e: Event): Promise<void> {
    try {
      const credentials = getSubmittedFormData<SignInRequest>(e);

      await authAPI.signIn(credentials);

      router.go('/chats');
    } catch (error) {
      handleError(error);
    }
  }
}

export default LoginController;
