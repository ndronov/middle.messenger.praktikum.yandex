const template = `
form.auth-form(novalidate="")
  h1.title Вход
  login-input(data-component-id=loginInput.id)
  password-input(data-component-id=passwordInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
  link(data-component-id=signupLink.id)
`;

export default template;
