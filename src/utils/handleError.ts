const handleError = (e: Error | string, message = 'произошла ошибка'): void => {
  const error = typeof e === 'string' ? new Error(e) : e;
  // eslint-disable-next-line no-console
  console.log(message, error);
};

export default handleError;
