// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import PasswordForm from '../../components/passwordForm';
import handleFormSubmit from '../../utils/handleFormSubmit';
import userSettingsValidationMap from '../../validation/userSettingsValidationMap';
import mockPassword from '../../mockData/mockPassword';

const template = `
div.container
  aside.aside-panel
    button.back-button(type="button") &#8592;

  user-settings-form(data-component-id=passwordForm.id)
`;

class PasswordChange extends Component {
  constructor(root: string) {
    const passwordForm = new PasswordForm({
      editMode: true,
      values: mockPassword,
      validation: userSettingsValidationMap,
      onSubmit: handleFormSubmit,
      validateOnSubmit: true,
    });

    super('div', {
      root,
      passwordForm,
    });
  }

  render(): string {
    return pug.render(template, {
      passwordForm: this.props.passwordForm,
    });
  }
}

export default PasswordChange;
