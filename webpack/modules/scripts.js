export const typeScript = {
  test: /\.(ts|tsx)$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
};

export const javaScript = {
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
};
