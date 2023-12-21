/**
 * A simple recursive deep merge function
 */
export function deepMerge(target: any, source: any) {
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === "object") {
      target[key] = target[key] || {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
}
