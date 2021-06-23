const htmlToDOM = (html: string): HTMLElement => new DOMParser().parseFromString(html, 'text/html').body.firstElementChild as HTMLElement;

export default htmlToDOM;
