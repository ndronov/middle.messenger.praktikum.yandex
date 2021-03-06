// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'webpack-merge';

import { WebpackCommonConfig } from './common';
import { paths, config } from './configuration';
import { hotModuleReplacementPlugin } from './plugins';

/**
 * Default dev server settings.
 */
const devServer = {
  open: true,
  compress: true,
  port: config.PORT,
  host: config.HOST,
  client: {
    progress: true,
  },
  static: [
    {
      watch: true,
      directory: paths.dist,
    },
  ],
};

const plugins = [hotModuleReplacementPlugin];

const WebpackConfig = {
  plugins,
  devServer,
  devtool: 'cheap-module-source-map',
};

export const WebpackDevConfig = merge(WebpackCommonConfig, WebpackConfig);
