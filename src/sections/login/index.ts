import Button from '../../components/button';
import renderDOM from '../../utils/renderDOM';

const button = new Button({
  className: 'some-custom-class',
  child: 'Click it',
  id: 'my-button',
});

renderDOM('.app', button);
