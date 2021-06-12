const renderElement = (source: Element, target: Element): void => {
  Array.from(source.attributes).forEach(({ name, value }) => {
    target.setAttribute(name, value);
  });

  // eslint-disable-next-line no-param-reassign
  target.innerHTML = '';

  source.childNodes.forEach((childNode) => {
    setTimeout(() => target.append(childNode));
  });
};

export default renderElement;
