import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { cleanWebpackPlugin, miniCssExtractPlugin, imageMinimizerWebpackPlugin } from './plugins';
import { WebpackCommonConfig } from './common';

/**
 * Plugins for production build.
 */
const plugins = [cleanWebpackPlugin, miniCssExtractPlugin, imageMinimizerWebpackPlugin];

/**
 * Webpack production configuration.
 */
const WebpackConfig = {
  plugins,
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

export const WebpackProdConfig = merge(WebpackCommonConfig, WebpackConfig);
