import sanitizeHtml from 'sanitize-html';

const sanitizeUserInput = (userInput: string): string => sanitizeHtml(userInput, {
  allowedTags: [],
  allowedAttributes: {},
  disallowedTagsMode: 'discard',
});

export default sanitizeUserInput;
