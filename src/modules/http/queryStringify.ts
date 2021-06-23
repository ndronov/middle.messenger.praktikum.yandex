const queryStringify = (params?: Record<string, unknown>): string => {
  if (!params) {
    return '';
  }

  if (typeof params !== 'object') {
    throw new Error('Data must be object');
  }

  const keyValuePairs = Object.keys(params).map((key) => `${key}=${params[key]}`);

  return `?${keyValuePairs.join('&')}`;
};

export default queryStringify;
