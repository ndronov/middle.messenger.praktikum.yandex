// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import PasswordForm from '../components/passwordForm';
import handleFormSubmit from '../utils/handleFormSubmit';
import userSettingsValidationMap from '../validation/userSettingsValidationMap';
import mockPassword from '../mockData/mockPassword';
import AuthController from '../controllers/authController';

const template = `
div.container
  aside.aside-panel
    a.back-button(href="/") &#8592;

  user-settings-form(data-component-id=passwordForm.id)
`;

class PasswordChange extends Component {
  constructor() {
    const passwordForm = new PasswordForm({
      editMode: true,
      values: mockPassword,
      validation: userSettingsValidationMap,
      onSubmit: handleFormSubmit,
      validateOnSubmit: true,
    });

    super('div', {
      hasFlow: true,
      passwordForm,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    await AuthController.checkAuthorization();
  }

  render(): string {
    return pug.render(template, {
      passwordForm: this.props.passwordForm,
    });
  }
}

export default PasswordChange;
