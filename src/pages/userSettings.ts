// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import Link from '../components/link';
import UserSettingsForm from '../components/userSettingsForm';
import handleFormSubmit from '../utils/handleFormSubmit';
import userSettingsValidationMap from '../validation/userSettingsValidationMap';
import mockUserSettings from '../mockData/mockUserSettings';
import AuthController from '../controllers/authController';
import { RouterLink } from '../types';

const template = `
div.container
  aside.aside-panel
    link(data-component-id=backLink.id)

  user-settings-form(data-component-id=userSettingsForm.id)
`;

class UserSettings extends Component {
  constructor() {
    const userSettingsForm = new UserSettingsForm({
      editMode: true,
      values: mockUserSettings,
      validation: userSettingsValidationMap,
      onSubmit: handleFormSubmit,
      validateOnSubmit: true,
    });

    const backLink = new Link({
      label: '<',
      go: RouterLink.Back,
      className: 'back-button',
    });

    super('div', {
      hasFlow: true,
      backLink,
      userSettingsForm,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async componentDidMount(): Promise<void> {
    await AuthController.checkAuthorization();
  }

  render(): string {
    return pug.render(template, {
      backLink: this.props.backLink,
      userSettingsForm: this.props.userSettingsForm,
    });
  }
}

export default UserSettings;
