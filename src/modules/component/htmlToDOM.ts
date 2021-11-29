import isJsDom from '../../utils/isJsDom';

// @ts-ignore
// eslint-disable-next-line max-len
const jsDomParser = (html: string): HTMLElement => new JSDOM(html).window.document.body as HTMLElement;

const nativeDomParser = (html: string): HTMLElement => new DOMParser().parseFromString(html, 'text/html').body.firstElementChild as HTMLElement;

// eslint-disable-next-line max-len
const getHtmlParser = (): (html: string) => HTMLElement => (isJsDom() ? jsDomParser : nativeDomParser);

const htmlToDOM = (html: string): HTMLElement => getHtmlParser()(html);

export default htmlToDOM;
