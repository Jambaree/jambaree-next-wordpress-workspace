import { Items, getItems } from "./get-items";
/**
 * Get all items from multiple post types
 * @example
 * ```
 * const allItems = await getAllItems(["pages", "post"]);
 * ```
 */
export async function getAllItems(postTypes): Promise<Items> {
  let result = [];

  await Promise.all(
    postTypes.map(async (postType) => {
      const items = await getItems({ restBase: postType });
      if (items.length > 0) {
        // @ts-ignore
        result = result.concat(items); // Corrected this line
      }
      return;
    })
  );

  return result;
}
