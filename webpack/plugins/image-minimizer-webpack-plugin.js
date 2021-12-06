// eslint-disable-next-line import/no-extraneous-dependencies
import { extendDefaultPlugins } from 'svgo';
// eslint-disable-next-line import/no-extraneous-dependencies
import ImageMinimizerWebpackPlugin from 'image-minimizer-webpack-plugin';

export const imageMinimizerWebpackPlugin = new ImageMinimizerWebpackPlugin({
  test: /\.(jpe?g|png|gif|svg)$/i,
  minimizerOptions: {
    plugins: [
      [
        'gifsicle',
        {
          interlaced: true,
        },
      ],
      [
        'mozjpeg',
        {
          progressive: true,
          arithmetic: false,
        },
      ],
      [
        'pngquant',
        {
          quality: [0.4, 0.7],
        },
      ],
      [
        'svgo',
        {
          plugins: extendDefaultPlugins([
            {
              name: 'removeViewBox',
              active: false,
            },
          ]),
        },
      ],
    ],
  },
});
