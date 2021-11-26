import { expect } from 'chai';
import { JSDOM, DOMWindow } from 'jsdom';

import TestPage from '../../test-utils/TestPage';

import Router from './router';

function firePopstateOnRoute(window: DOMWindow): void {
  const { history } = window;
  const originalBack = history.back;
  const originalForwards = history.forward;

  // eslint-disable-next-line no-proto
  (history as unknown as { __proto__: History }).__proto__.back = function patchedBack(this: History, ...args: Parameters<History['back']>): void {
    originalBack.apply(this, args);

    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // eslint-disable-next-line no-proto
  (history as unknown as { __proto__: History }).__proto__.forward = function patchedForward(this: History, ...args: Parameters<History['forward']>): void {
    originalForwards.apply(this, args);

    window.dispatchEvent(new PopStateEvent('popstate'));
  };
}

const html = '<!DOCTYPE html><html><head></head><body><div class="root"></div></body></html>';

function mockBrowser(): void {
  const jsdom = new JSDOM(html, {
    url: 'http://localhost/',
  });

  const { window } = jsdom;

  firePopstateOnRoute(window);

  Object.assign(global, { window, document: window.document, expect });
}

describe('Router', () => {
  before(() => {
    // mockBrowser();
  });

  beforeEach(() => {
    mockBrowser();
    Router.clear();
  });

  // afterEach(() => {
  // });

  it('router is singleton', () => {
    const router1 = new Router('.app');
    const router2 = new Router('.app');

    expect(router1).to.eq(router2);
  });

  it('router starts successfully', () => {
    const router = new Router('.root');

    router
      .use('/', TestPage, { text: 'text on root page' })
      .use('/foo', TestPage, { text: 'foo' })
      .use('/bar', TestPage, { text: 'bar' })
      .start();

    const testPageText = document.getElementById('text-element')?.textContent;

    expect(testPageText).to.eq('text on root page');
  });
});
