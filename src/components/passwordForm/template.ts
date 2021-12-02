const template = `
form.settings-form(novalidate="")
  if (avatar)
    img.settings-form-avatar(src=avatar, alt="Аватар")
  else
    div.settings-form-avatar

  old-password-input(data-component-id=oldPasswordInput.id)
  new-password-input(data-component-id=newPasswordInput.id)
  new-password-confirmation-input(data-component-id=newPasswordConfirmationInput.id)

  submit-button(data-component-id=submitButton.id)
`;

export default template;
