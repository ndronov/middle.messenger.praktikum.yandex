import Component from '../../modules/component';
import AuthController from '../../controllers/authController';
import template from './template.pug';

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
    return template();
  }
}

export default LogoutPage;
