const template = `
form.chats-additional-form(novalidate="")
  h1.title Удалите пользователя из чата

  chat-id-input(data-component-id=chatIdInput.id)
  user-id-input(data-component-id=userIdInput.id)

  div.gap

  submit-button(data-component-id=submitButton.id)
`;

export default template;
