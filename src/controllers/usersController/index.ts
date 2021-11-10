import usersAPI, { ChangeProfileRequest, ChangePasswordRequest } from '../../api/UsersAPI';
import getSubmittedFormData from '../../utils/getSubmittedFormData';
import handleError from '../../utils/handleError';

class UsersController {
  public static async changeProfile(e: Event): Promise<void> {
    try {
      const newProfileData = getSubmittedFormData<ChangeProfileRequest>(e);

      await usersAPI.changeProfile(newProfileData);
    } catch (error) {
      handleError(error);
    }
  }

  public static async changePassword(e: Event): Promise<void> {
    try {
      const newPasswordData = getSubmittedFormData<ChangePasswordRequest>(e);

      await usersAPI.changePassword(newPasswordData);
    } catch (error) {
      handleError(error);
    }
  }
}

export default UsersController;
