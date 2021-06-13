const validation = {
  login: {
    pattern: /^[a-zA-Z_]{4,20}$/,
    error: 'Логин должен содержать от 4 до 20 букв латинского алфавита',
  },
  password: {
    pattern: /^.{8,}$/,
    error: 'Пароль должен быть не короче 8 символов',
  },
};

export default validation;
