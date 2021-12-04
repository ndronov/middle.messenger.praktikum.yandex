const template = `
div.container
  nav.navigation
    div.links
      link(data-component-id=logoutLink.id)
      link(data-component-id=profileLink.id)
    button.search-button &#128269; Поиск
    chats(data-component-id=dialogs.id)
  div.active-chat
    div.chat-header
      div.avatar
      div.chat-title= chatTitle
    chat-content(data-component-id=chatContent.id)
    message-sending-form(data-component-id=messageSendingForm.id)
`;

export default template;