// This function creates a proxy for your data object
export function createDataProxy(data: any): any {
  return new Proxy(data, {
    get(target, property) {
      if (property === "items") {
        // eslint-disable-next-line no-console -- this is a warning for deprecated usage
        console.warn(
          `⚠️ Warning: Using 'data.items' key in archive templates is deprecated.
  Please use the posts plural_name key instead. This will usually be the plural_name of the post type, converted to camelCase.`
        );
      }
      return target[property];
    },
  });
}
