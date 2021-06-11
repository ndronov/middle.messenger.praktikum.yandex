import Page from './page';
import renderDOM from '../../utils/renderDOM';

const page = new Page({
  className: 'some-custom-class',
  child: 'Click it',
  id: 'my-button',
});

renderDOM('.app', page);
