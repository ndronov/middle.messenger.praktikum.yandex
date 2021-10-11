import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import UserSettings from './pages/userSettings';
import ChatList from './pages/chats';
import ActiveChat from './pages/activeChat';
import AvatarChange from './pages/avatarChange';
import PasswordChange from './pages/passwordChange';
import ErrorPage, { getErrorMeta } from './pages/error';
import router from './modules/router';

router
  .use('/', LoginPage)
  .use('/sign-up', SignupPage)
  .use('/chats', ChatList)
  .use('/active-chat', ActiveChat)
  .use('/settings', UserSettings)
  .use('/avatar', AvatarChange)
  .use('/password', PasswordChange)
  .use('/404', ErrorPage, getErrorMeta(404))
  .use('/500', ErrorPage, getErrorMeta(500))
  .start();
