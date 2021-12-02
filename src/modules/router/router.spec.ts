import { expect } from 'chai';
import { JSDOM } from 'jsdom';

import TestPageAlfa from '../../test-env/TestPageAlfa';
import TestPageBeta from '../../test-env/TestPageBeta';
import TestPageGamma from '../../test-env/TestPageGamma';

import Router from './router';

const html = '<!DOCTYPE html><html><head></head><body><div class="root"></div></body></html>';

function mockBrowser(): void {
  const jsdom = new JSDOM(html, {
    url: 'http://localhost/beta',
  });

  const { window } = jsdom;

  Object.assign(global, {
    window,
    document: window.document,
    expect,
    JSDOM,
  });
}

describe('Router', () => {
  beforeEach(() => {
    mockBrowser();
    Router.clear();
  });

  it('Router instance is singleton', () => {
    const router1 = new Router('.app');
    const router2 = new Router('.app');

    expect(router1).to.eq(router2);
  });

  it('router.use() method works correctly', () => {
    const router = new Router('.root');

    router
      .use('/alfa', TestPageAlfa)
      .use('/beta', TestPageBeta)
      .use('/gamma', TestPageGamma);

    expect(router.routes.length).to.eq(3);
    expect(router.getRoute('/alfa')?.blockClass).to.eq(TestPageAlfa);
    expect(router.getRoute('/beta')?.blockClass).to.eq(TestPageBeta);
    expect(router.getRoute('/gamma')?.blockClass).to.eq(TestPageGamma);
  });

  it('router.start() method works correctly', () => {
    const router = new Router('.root');

    router
      .use('/alfa', TestPageAlfa)
      .use('/beta', TestPageBeta)
      .use('/gamma', TestPageGamma)
      .start();

    expect(router.currentRoute?.pathname).to.eq('/beta');
  });

  it('router.go() method works correctly', () => {
    const router = new Router('.root');

    router
      .use('/alfa', TestPageAlfa)
      .use('/beta', TestPageBeta)
      .use('/gamma', TestPageGamma)
      .start();

    router.go('/alfa');

    expect(router.currentRoute?.pathname).to.eq('/alfa');
  });
});
