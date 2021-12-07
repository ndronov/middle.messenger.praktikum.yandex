// eslint-disable-next-line import/no-extraneous-dependencies
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { paths } from '../configuration';

export const cleanWebpackPlugin = new CleanWebpackPlugin({
  root: paths.dist,
});
