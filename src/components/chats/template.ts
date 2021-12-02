const template = `
div.chats
  each chat in chats
    a.chat(href='/chat/' + chat.id)
      div.avatar(title=chat.title)
      div.content
        span.name= chat.title
        if chat.last_message
          span.message= chat.last_message.content
      div.additional-content
        if chat.last_message
          time.time= formatTime(chat.last_message.time)
        if chat.unread_count
          span.notifications-number= chat.unread_count
`;

export default template;
