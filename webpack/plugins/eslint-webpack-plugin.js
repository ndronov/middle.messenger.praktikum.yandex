import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

import { paths, config } from '../configuration';

export const eSLintWebpackPlugin = new ESLintWebpackPlugin({
  emitError: true,
  emitWarning: true,
  context: paths.src,
  failOnError: !config.IS_DEV,
  failOnWarning: !config.IS_DEV,
  lintDirtyModulesOnly: config.IS_DEV,
  extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  overrideConfigFile: path.resolve(__dirname, '../../.eslintrc'),
});
