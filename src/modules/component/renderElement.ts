const renderElement = (source: Element, target: Element): void => {
  // eslint-disable-next-line no-param-reassign
  target.innerHTML = '';

  Array.from(source.attributes).forEach(({ name, value }) => {
    target.setAttribute(name, value);
  });

  source.childNodes.forEach((childNode) => {
    setTimeout(() => target.append(childNode));
  });
};

export default renderElement;
