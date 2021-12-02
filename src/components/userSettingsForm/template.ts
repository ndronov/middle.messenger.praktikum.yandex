const template = `
form.settings-form(novalidate="")
  if (avatar)
    img.settings-form-avatar(src=avatar, alt="Аватар")
  else
    div.settings-form-avatar

  email-input(data-component-id=emailInput.id)
  login-input(data-component-id=loginInput.id)
  first-name-input(data-component-id=firstNameInput.id)
  second-name-input(data-component-id=secondNameInput.id)
  display-name-input(data-component-id=displayNameInput.id)
  phone-input(data-component-id=phoneInput.id)

  div.links
    link(data-component-id=avatarLink.id)
    link(data-component-id=passwordLink.id)
    link(data-component-id=logoutLink.id)

  submit-button(data-component-id=submitButton.id)
`;

export default template;
