const template = `
label(class=className)= label
  input.input(type=type, name=inputName, placeholder=placeholder, value=value, accept=accept)
  span(class = "error error_hidden")= error
`;

export default template;