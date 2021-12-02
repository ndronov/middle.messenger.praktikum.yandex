const template = `
div.container
  nav.navigation
    div.links
      link(data-component-id=logoutLink.id)
      link(data-component-id=profileLink.id)
    button.search-button &#128269; Поиск
    chats(data-component-id=dialogs.id)
  div.chats-additional-forms.active-chat
    new-chat-form(data-component-id=newChatForm.id)
    add-user-to-chat-form(data-component-id=addUserToChatForm.id)
    delete-user-from-chat-form(data-component-id=deleteUserFromChatForm.id)
`;

export default template;
