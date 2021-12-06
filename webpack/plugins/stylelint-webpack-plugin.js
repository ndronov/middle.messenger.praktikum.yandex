import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import StyleLintWebpackPlugin from 'stylelint-webpack-plugin';

import { paths, config } from '../configuration';

export const styleLintWebpackPlugin = new StyleLintWebpackPlugin({
  emitErrors: true,
  emitWarning: true,
  context: paths.src,
  extensions: ['.css'],
  failOnError: !config.IS_DEV,
  failOnWarning: !config.IS_DEV,
  lintDirtyModulesOnly: config.IS_DEV,
  configFile: path.resolve(__dirname, '../../.stylelintrc.json'),
});
