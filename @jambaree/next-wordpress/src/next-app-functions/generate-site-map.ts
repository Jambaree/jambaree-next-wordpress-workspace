import type { MetadataRoute } from "next";
import { getAllItems } from "../api/get-all-items";
/**
 * The generateSiteMap function can be exported from your Next.js page.js and
 * used to generate a sitemap.xml file for your site.
 * This function uses the WordPress REST API to generate the sitemap.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export async function generateSiteMap({
  postTypes = ["pages", "post"],
}): Promise<MetadataRoute.Sitemap> {
  const allItems = await getAllItems(postTypes);

  return allItems.map((item) => {
    return {
      url: `${process.env.NEXT_SITE_URL}${item.path}`,
      lastModified: item.modified_gmt,
      changeFrequency: "daily",
      priority: 0.5,
    };
  });
}
