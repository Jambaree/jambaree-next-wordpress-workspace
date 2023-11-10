import { getItems } from "../api/get-items";
import { getPostTypes } from "../api/get-post-types";

/**
 * The generateStaticParams function can be exported from your Next.js App's page.js and
 * will be called at build time to generate the static routes for your site based on the WordPress REST API results.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams({
  wpUrl = process.env.NEXT_PUBLIC_WP_URL || "",
  includedPostTypes = ["page", "post"],
}: {
  /**
   * The URL of the GraphQL endpoint.
   * @default process.env.NEXT_PUBLIC_WP_URL
   */
  wpUrl?: string;
  /**
   * The post types to include in the static generation.
   */
  includedPostTypes?: string[];
}) {
  if (!wpUrl) {
    throw new Error(
      "generateStaticParams: No wpUrl provided. Please set `NEXT_PUBLIC_WP_URL` environment variable or pass `wpUrl` to `generateStaticParams`."
    );
  }

  const allItems: { paths: string[] }[] = [];
  const postTypes = await getPostTypes();

  for (const key in postTypes) {
    if (!includedPostTypes.includes(postTypes?.[key]?.slug)) {
      continue;
    }

    const postType = postTypes[key];
    const result = await getItems({ restBase: postType.rest_base });

    for (const item of result) {
      if (item.path === "/") {
        allItems.push({
          paths: ["/"],
        });
        continue;
      }

      const pathBreadcrumbs = item.path.split("/").filter((x) => x);

      allItems.push({
        paths: [...(pathBreadcrumbs || "/")],
      });
    }
  }

  return allItems;
}
