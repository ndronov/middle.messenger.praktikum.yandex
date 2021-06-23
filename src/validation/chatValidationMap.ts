const chatValidationMap = {
  message: {
    pattern: /^(?!.*angular).*$/i,
    error: 'Введите сообщение ("angular" - запрещённое слово)',
  },
};

export default chatValidationMap;
