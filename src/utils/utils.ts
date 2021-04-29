/**
 * Removes undefined keys from an Object in place.
 * Taken from https://stackoverflow.com/a/38340374/11701504.
 * @param obj A JS Object.
 */
export const removeUndefinedFromObject = (obj: { [key: string]: any }): void =>
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
