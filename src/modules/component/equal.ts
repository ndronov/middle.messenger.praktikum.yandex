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

  const keysA = Object.keys(a as Record<string, unknown>); // using Record instead object
  const keysB = Object.keys(a as Record<string, unknown>); // see https://github.com/microsoft/TypeScript/issues/21732

  if (keysA.length !== keysB.length) {
    return false;
  }

  // @ts-ignore
  return keysA.every((k: string) => equals(a[k], b[k]));
};

export default equal;
