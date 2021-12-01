import pug from 'pug';
import Component from '../modules/component';
import AuthController from '../controllers/AuthController';

const template = `
div Выход из системы...
`;

class LogoutPage extends Component {
  constructor() {
    super('div', {
      hasFlow: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    await AuthController.logout();
  }

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return pug.render(template, {});
  }
}

export default LogoutPage;
