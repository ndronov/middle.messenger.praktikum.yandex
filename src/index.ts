import LoginPage from './pages/login';
import LogoutPage from './pages/logout';
import SignupPage from './pages/signup';
import UserSettings from './pages/userSettings';
import ChatList from './pages/chats';
import ActiveChat from './pages/activeChat';
import AvatarChange from './pages/avatarChange';
import PasswordChange from './pages/passwordChange';
import ErrorPage, { getErrorMeta } from './pages/error';
import router from './modules/router';

import './index.scss';


console.log('hello, world');

const testMessage = 'TypeScript works';

console.log(testMessage);

router
  .use('/', LoginPage)
  .use('/sign-out', LogoutPage)
  .use('/sign-up', SignupPage)
  .use('/chats', ChatList, {}, ['chats'])
  .use('/chat', ActiveChat, {}, ['chats', 'messages', 'user'])
  .use('/settings', UserSettings, {}, ['user'])
  .use('/avatar', AvatarChange, {}, ['user'])
  .use('/password', PasswordChange, {}, ['user'])
  .use('/404', ErrorPage, getErrorMeta(404))
  .use('/500', ErrorPage, getErrorMeta(500))
  .start();
