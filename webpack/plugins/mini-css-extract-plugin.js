// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { config } from '../configuration';

export const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: config.CSS_FILE_OUTPUT,
});
