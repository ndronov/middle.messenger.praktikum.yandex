import { BASE_URL } from '../modules/http';

const avatarBaseURL = `${BASE_URL}/resources`;

const getAvatarURL = (avatar?: string): string => {
  if (!avatar) return '';

  return `${avatarBaseURL}${avatar}`;
};

export default getAvatarURL;
