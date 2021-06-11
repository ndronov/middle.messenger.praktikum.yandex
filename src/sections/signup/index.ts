import Page from './page';
import renderDOM from '../../utils/renderDOM';

const page = new Page({
  // TODO fix props
  className: 'some-custom-class',
  child: 'Click it',
  id: 'my-button',
});

renderDOM('.app', page);
