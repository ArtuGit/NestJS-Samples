export function findObjPropOnAnyLevel(
  obj: Record<string, any>,
  property: string,
): any | undefined {
  for (const key in obj) {
    const value = obj[key];
    if (key === property) {
      return value;
    } else if (typeof value === 'object') {
      const nestedValue = findObjPropOnAnyLevel(value, property);
      if (nestedValue !== undefined) {
        return nestedValue;
      }
    }
  }
  return undefined;
}
