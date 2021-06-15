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

  // @ts-ignore
  if (a.prototype !== b.prototype) {
    return false;
  }

  // @ts-ignore
  const keysA = Object.keys(a);
  // @ts-ignore
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // @ts-ignore
  return keysA.every((k: string) => equals(a[k], b[k]));
};

export default equal;
