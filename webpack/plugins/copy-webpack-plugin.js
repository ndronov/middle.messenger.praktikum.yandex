// eslint-disable-next-line import/no-extraneous-dependencies
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { paths } from '../configuration';

export const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: paths.public,
      to: paths.dist,
      globOptions: {
        dot: true,
        ignore: ['**/.DS_Store', '**/.gitkeep', '**/index.html'],
      },
    },
  ],
});
