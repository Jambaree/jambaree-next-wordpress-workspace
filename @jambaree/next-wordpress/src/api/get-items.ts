/**
 * Get all items of a specific type from a WordPress REST API endpoint
 * @example
 * ```
 * const pages = await getItems({ restBase: "pages" });
 * ```
 * This would fetch all item recursively with an endpoint like `https://example.com/wp-json/wp/v2/pages`
 * @see https://developer.wordpress.org/rest-api/reference/
 */

import { getSiteSettings } from "./get-site-settings";

export type Items = {
  id: number;
  slug: string;
  link: string;
  path: string;
  modified_gmt: string;
  [x: string]: any;
}[];

export async function getItems({ restBase = "pages" }): Promise<Items> {
  let allData = [];
  let page = 1;
  let morePagesAvailable = true;

  // const settings = await getSiteSettings();

  while (morePagesAvailable) {
    const params = {
      per_page: "100",
      _embed: "true",
      acf_format: "standard",
      page,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${restBase}?${queryString}&acf_format=standard&_embed`
      );

      const data = await req.json();

      if (data.length === 0 || data.code === "rest_post_invalid_page_number") {
        morePagesAvailable = false;
      } else {
        for (const key in data) {
          // Add relative path to data
          const path = data?.[key]?.link?.replace?.(
            process.env.NEXT_PUBLIC_WP_URL,
            ""
          );
          data[key].path = path;
        }

        allData = allData.concat(data);
        page++;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      morePagesAvailable = false;
    }
  }

  return allData;
}
