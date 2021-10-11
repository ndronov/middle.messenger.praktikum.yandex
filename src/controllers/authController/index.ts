import authAPI, { SignInRequest, SignUpRequest } from '../../api/AuthAPI';
import getSubmittedFormData from '../../utils/getSubmittedFormData';
import handleError from '../../utils/handleError';
import router from '../../modules/router';

class AuthController {
  public static async login(e: Event): Promise<void> {
    try {
      const credentials = getSubmittedFormData<SignInRequest>(e);

      await authAPI.signIn(credentials);

      router.go('/chats');
    } catch (error) {
      handleError(error);
    }
  }

  public static async signUp(e: Event): Promise<void> {
    try {
      const newUserData = getSubmittedFormData<SignUpRequest>(e);

      await authAPI.signUp(newUserData);

      router.go('/chats');
    } catch (error) {
      handleError(error);
    }
  }

  public static async logout(): Promise<void> {
    try {
      await authAPI.logout();

      router.go('/');
    } catch (error) {
      handleError(error);
    }
  }

  public static async checkAuthorization(): Promise<void> {
    try {
      await authAPI.read();
      router.go('/chats');
    } catch {
      router.go('/');
    }
  }
}

export default AuthController;
