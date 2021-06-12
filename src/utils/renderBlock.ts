import Block from '../modules/block';

const renderBlock = (rootSelector: string, block: Block): void => {
  const rootElement = document.querySelector(rootSelector);

  if (!rootElement) {
    throw new Error(`Элемент с селектором "${rootSelector}" не обнаружен на странице`);
  }

  rootElement.appendChild(block.content);
};

export default renderBlock;
