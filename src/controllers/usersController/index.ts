import usersAPI, { ChangeProfileRequest, ChangePasswordRequest } from '../../api/UsersAPI';
import getSubmittedFormData from '../../utils/getSubmittedFormData';
import getRawFormData from '../../utils/getRawFormData';
import handleError from '../../utils/handleError';
import router from '../../modules/router';
import store from '../../store';

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

  public static async changeAvatar(e: Event): Promise<void> {
    try {
      const newAvatarData = getRawFormData(e);

      const user = await usersAPI.changeAvatar(newAvatarData);

      setTimeout(() => store.setData({ user }), 0);

      router.go('/settings');
    } catch (error) {
      handleError(error);
    }
  }
}

export default UsersController;
