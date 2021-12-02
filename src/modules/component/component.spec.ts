import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { types } from 'util';

import TestPageAlfa from '../../test-env/TestPageAlfa';

const html = '<!DOCTYPE html><html><head></head><body><div class="root"></div></body></html>';

function mockBrowser(): void {
  const jsdom = new JSDOM(html, {
    url: 'http://localhost/',
  });

  const { window } = jsdom;

  Object.assign(global, {
    window,
    document: window.document,
    expect,
    JSDOM,
  });
}

describe('Component', () => {
  beforeEach(() => {
    mockBrowser();
  });

  it('Component initialization works correctly', () => {
    const alfaPage = new TestPageAlfa({ tagName: 'blockquote', text: 'alfa', id: 'beta' });

    expect(alfaPage.meta.tagName).to.eq('blockquote');
    expect(alfaPage.meta.componentId).to.eq('beta');
    expect(alfaPage.meta.props.text).to.eq('alfa');
    expect(alfaPage.props.text).to.eq('alfa');
    expect(types.isProxy(alfaPage.props)).to.eq(true);
  });

  it('Component mounting works correctly', () => {
    const alfaPage = new TestPageAlfa({ tagName: 'blockquote', id: 'beta' });
    const root = document.querySelector('.root');

    alfaPage.mountToRoot('.root');

    expect(alfaPage.content instanceof window.HTMLElement).to.eq(true);
    expect(alfaPage.content.tagName).to.eq('BLOCKQUOTE');
    expect(alfaPage.meta.rootElement).to.eq(root);
    expect(alfaPage.meta.rootElement?.contains(alfaPage.content)).to.eq(true);
    expect(alfaPage.content.id).to.eq('beta');
  });
});
