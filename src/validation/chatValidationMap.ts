const chatValidationMap = {
  message: {
    pattern: /^(?!.*angular).*$/i,
    error: 'angular - запрещённое слово',
  },
};

export default chatValidationMap;
