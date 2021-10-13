import authAPI, { SignInRequest, SignUpRequest } from '../../api/AuthAPI';
import getSubmittedFormData from '../../utils/getSubmittedFormData';
import handleError from '../../utils/handleError';
import router from '../../modules/router';

interface AuthParams {
  goDefaultContentRoute?: boolean;
  goAuthRoute?: boolean;
}

const defaultAuthParams = {
  goDefaultContentRoute: true,
  goAuthRoute: true,
};

class AuthController {
  static defaultContentRoute = '/chats';

  static authRoute = '/';

  public static async login(e: Event): Promise<void> {
    try {
      const credentials = getSubmittedFormData<SignInRequest>(e);

      await authAPI.signIn(credentials);

      router.go(AuthController.defaultContentRoute);
    } catch (error) {
      handleError(error);
    }
  }

  public static async signUp(e: Event): Promise<void> {
    try {
      const newUserData = getSubmittedFormData<SignUpRequest>(e);

      await authAPI.signUp(newUserData);

      router.go(AuthController.defaultContentRoute);
    } catch (error) {
      handleError(error);
    }
  }

  public static async logout(): Promise<void> {
    try {
      await authAPI.logout();

      router.go(AuthController.authRoute);
    } catch (error) {
      handleError(error);
    }
  }

  public static async checkAuthorization(params?: AuthParams): Promise<void> {
    const { goDefaultContentRoute, goAuthRoute } = { ...defaultAuthParams, ...params };

    try {
      await authAPI.read();

      if (goDefaultContentRoute) {
        router.go(AuthController.defaultContentRoute);
      }
    } catch {
      if (goAuthRoute) {
        router.go(AuthController.authRoute);
      }
    }
  }
}

export default AuthController;
