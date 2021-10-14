const equal = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b;
  }

  if (typeof a === 'function' && typeof b === 'function') {
    if (a.prototype !== b.prototype) {
      return false;
    }
  }

  const aObj = a as Record<string, unknown>; // using Record instead object
  const bObj = b as Record<string, unknown>; // see https://github.com/microsoft/TypeScript/issues/21732

  const keysA = Object.keys(aObj);
  const keysB = Object.keys(bObj);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((k: string) => equal(aObj[k], bObj[k]));
};

export default equal;
