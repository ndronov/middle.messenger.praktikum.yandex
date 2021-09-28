// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import UserSettingsForm from '../components/userSettingsForm';
import AvatarForm from '../components/avatarForm';
import mockUserSettings from '../mockData/mockUserSettings';
import handleFormSubmit from '../utils/handleFormSubmit';

const template = `
div.container
  aside.aside-panel
    a.back-button(href="/") &#8592;

  user-settings-form(data-component-id=userSettingsForm.id)
  avatar-form(data-component-id=avatarForm.id)
`;

class AvatarChange extends Component {
  constructor() {
    const userSettingsForm = new UserSettingsForm({
      values: mockUserSettings,
    });

    const avatarForm = new AvatarForm({
      onSubmit: handleFormSubmit,
    });

    super('div', {
      hasFlow: true,
      userSettingsForm,
      avatarForm,
    });
  }

  render(): string {
    return pug.render(template, {
      userSettingsForm: this.props.userSettingsForm,
      avatarForm: this.props.avatarForm,
    });
  }
}

export default AvatarChange;
