import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import UserSettings from './pages/userSettings';
import ChatList from './pages/chats';
import ActiveChat from './pages/activeChat';
import AvatarChange from './pages/avatarChange';
import PasswordChange from './pages/passwordChange';
import ErrorPage, { getErrorMeta } from './pages/error';

import Router from './modules/router';
import { ComponentConstructor } from './modules/component';

const router = new Router('.app');

router
  .use('/', LoginPage as unknown as ComponentConstructor)
  .use('/sign-up', SignupPage as unknown as ComponentConstructor)
  .use('/chats', ChatList as unknown as ComponentConstructor)
  .use('/active-chat', ActiveChat as unknown as ComponentConstructor)
  .use('/settings', UserSettings as unknown as ComponentConstructor)
  .use('/avatar', AvatarChange as unknown as ComponentConstructor)
  .use('/password', PasswordChange as unknown as ComponentConstructor)
  .use('/404', ErrorPage as unknown as ComponentConstructor, getErrorMeta(404))
  .use('/500', ErrorPage as unknown as ComponentConstructor, getErrorMeta(500))
  .start();
