// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import UserSettingsForm from '../../components/userSettingsForm';
import handleFormSubmit from '../../utils/handleFormSubmit';
import userSettingsValidationMap from '../../validation/userSettingsValidationMap';
import mockUserSettings from '../../mockData/mockUserSettings';

const template = `
div.container
  aside.aside-panel
    button.back-button(type="button") &#8592;

  user-settings-form(data-component-id=userSettingsForm.id)
`;

class UserSettings extends Component {
  constructor(root: string) {
    const userSettingsForm = new UserSettingsForm({
      editMode: true,
      values: mockUserSettings,
      validation: userSettingsValidationMap,
      onSubmit: handleFormSubmit,
      validateOnSubmit: true,
    });

    super('div', {
      root,
      userSettingsForm,
    });
  }

  render(): string {
    return pug.render(template, {
      userSettingsForm: this.props.userSettingsForm,
    });
  }
}

export default UserSettings;
