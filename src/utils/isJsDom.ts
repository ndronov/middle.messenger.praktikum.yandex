function isJsDom(): boolean {
  return (typeof window !== 'undefined' && window.name === 'nodejs')
      || (typeof window.navigator !== 'undefined'
        && (window.navigator.userAgent.includes('Node.js')
          || window.navigator.userAgent.includes('jsdom')));
}
export default isJsDom;
