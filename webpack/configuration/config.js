const portNumber = 9000;
const hostName = 'localhost';
const jsFileOutput = 'assets/js/[name].[contenthash].js';
const cssFileOutput = 'assets/css/[name].[contenthash].css';

export const config = {
  HOST: hostName,
  PORT: portNumber,
  JS_FILE_OUTPUT: jsFileOutput,
  CSS_FILE_OUTPUT: cssFileOutput,
  IS_DEV: process.env.NODE_ENV === 'development',
};
