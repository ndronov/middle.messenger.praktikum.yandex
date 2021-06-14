const userSettingValidationMap = {
  email: {
    pattern: /.+@.+\..+/i,
    error: 'Некорректный адрес',
  },
  login: {
    pattern: /^[a-zA-Z_]{4,20}$/,
    error: 'Логин должен содержать от 4 до 20 букв латинского алфавита',
  },
  name: {
    pattern: /^[а-яА-ЯёЁ-]+$/,
    error: 'Имя и фамилия могут содержать только символы кириллицы',
  },
  phone: {
    pattern: /^((\+7|7|8)+([0-9]){10})$/,
    error: 'Некорректный номер',
  },
  password: {
    pattern: /^.{8,}$/,
    error: 'Пароль должен быть не короче 8 символов',
  },
};

export default userSettingValidationMap;
