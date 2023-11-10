import { generateSiteMap } from "@jambaree/next-wordpress";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /**
   * Add your custom post types here, by rest_base
   * @example ["pages", "posts", "custom-post-type"]
   * This would be the same as the rest_base in the WordPress API
   * https://example.com/wp-json/wp/v2/pages
   * https://example.com/wp-json/wp/v2/posts
   * https://example.com/wp-json/wp/v2/custom-post-type
   *
   * @see https://developer.wordpress.org/rest-api/reference/
   */
  const sitemap = await generateSiteMap({
    postTypes: ["pages", "posts"],
  });

  return sitemap;
}
