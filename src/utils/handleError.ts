const handleError = (e: Error, message = 'произошла ошибка'): void => {
  // eslint-disable-next-line no-console
  console.log(message, e);
};

export default handleError;
