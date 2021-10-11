import authAPI, { SignUpRequest } from '../../api/AuthAPI';
import getSubmittedFormData from '../../utils/getSubmittedFormData';
import handleError from '../../utils/handleError';
import router from '../../modules/router';

class SignupController {
  public static async signUp(e: Event): Promise<void> {
    try {
      const newUserData = getSubmittedFormData<SignUpRequest>(e);

      await authAPI.signUp(newUserData);

      router.go('/chats');
    } catch (error) {
      handleError(error);
    }
  }
}

export default SignupController;
