// eslint-disable-next-line import/no-extraneous-dependencies
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { paths } from '../configuration';

export const htmlWebpackPlugin = new HtmlWebpackPlugin({
  inject: 'body',
  template: `${paths.public}/index.html`,
});
