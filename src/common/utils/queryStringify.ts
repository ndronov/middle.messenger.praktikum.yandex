const queryStringify = (params: Record<string, string>): string => {
  if (typeof params !== 'object') {
    throw new Error('Data must be object');
  }

  const keyValuePairs = Object.keys(params).map((key) => {
    const value = params[key].toString();

    return `${key}=${value}`;
  });

  return `?${keyValuePairs.join('&')}`;
};

export default queryStringify;
