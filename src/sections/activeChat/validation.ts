const validation = {
  pattern: /^(?!.*__proto__).*$/i,
  error: '__proto__ - запрещённое слово',
};

export default validation;
