import {
  htmlWebpackPlugin, copyWebpackPlugin, eSLintWebpackPlugin, styleLintWebpackPlugin,
} from './plugins';
import { paths, config } from './configuration';
import {
  pug, css, fonts, images, javaScript, typeScript,
} from './modules';

const entry = [`${paths.src}/index.ts`, `${paths.src}/styles/index.scss`];

const output = {
  publicPath: '/',
  path: paths.dist,
  filename: config.JS_FILE_OUTPUT,
};

const plugins = [htmlWebpackPlugin, copyWebpackPlugin, eSLintWebpackPlugin, styleLintWebpackPlugin];

const modules = {
  rules: [pug, css, fonts, images, javaScript, typeScript],
};

const resolve = {
  extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  alias: {
    '@': paths.src,
  },
};

export const WebpackCommonConfig = {
  entry,
  output,
  plugins,
  resolve,
  module: modules,
  context: __dirname,
  target: config.IS_DEV ? 'web' : 'browserslist',
  mode: config.IS_DEV ? 'development' : 'production',
};
