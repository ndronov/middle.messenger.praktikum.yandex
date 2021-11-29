import isJsDom from '../../utils/isJsDom';

// @ts-ignore
// eslint-disable-next-line max-len
const jsDomParser = (html: string): HTMLElement => new JSDOM(html).window.document.body as HTMLElement;

const domParser = (html: string): HTMLElement => new DOMParser().parseFromString(html, 'text/html').body.firstElementChild as HTMLElement;

const getHtmlParser = (): (html: string) => HTMLElement => (isJsDom() ? jsDomParser : domParser);

const htmlToDOM = (html: string): HTMLElement => getHtmlParser()(html);

export default htmlToDOM;
