// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'webpack-merge';
// eslint-disable-next-line import/no-extraneous-dependencies
import TerserPlugin from 'terser-webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { cleanWebpackPlugin, miniCssExtractPlugin, imageMinimizerWebpackPlugin } from './plugins';
import { WebpackCommonConfig } from './common';

const plugins = [cleanWebpackPlugin, miniCssExtractPlugin, imageMinimizerWebpackPlugin];

const WebpackConfig = {
  plugins,
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

export const WebpackProdConfig = merge(WebpackCommonConfig, WebpackConfig);
