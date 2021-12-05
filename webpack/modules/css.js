import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { config } from '../configuration';

/**
 * Default modules loader for CSS.
 */
export const css = {
  test: /\.(sass|scss|css)$/,
  use: [
    config.IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
  ],
  exclude: /node_modules/,
};
