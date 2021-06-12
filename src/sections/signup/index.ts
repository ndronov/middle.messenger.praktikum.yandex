import Page from './page';
import renderBlock from '../../utils/renderBlock';

const page = new Page({
  // TODO fix props
  className: 'some-custom-class',
  child: 'Click it',
  id: 'my-button',
});

renderBlock('.app', page);
