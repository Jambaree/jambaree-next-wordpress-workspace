import { PostType, getPostTypes } from "./get-post-types";
import { getSiteSettings } from "./get-site-settings";
import { draftMode } from "next/headers";
// import { getTaxonomies } from "./get-taxonomies";

/**
 * Get data for a specific page from a WordPress REST API endpoint based on the URI
 * @param {string} uri - The URI of the page to fetch
 * @returns {Promise} - A promise that resolves to an object containing the data for the page
 * @example
 * ```
 * const pageData = await getPageData("/about");
 * ```
 */
export async function getPageData(uri: string) {
  const preview = draftMode();

  const paths = uri?.split("/");
  const postTypes = await getPostTypes();
  // const taxonomies = await getTaxonomies();
  let archive: PostType | null = null;
  // let taxonomy: any = null;
  let postTypeRestBase = "pages";

  // handle front page
  if (uri === "/") {
    const settings = await getSiteSettings();

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/pages/${settings.page_on_front}?acf_format=standard`
    );

    let data;
    try {
      data = await req.json();
    } catch (err) {
      throw new Error(`Error fetching front page: ${err.message}`);
    }

    if (preview.isEnabled) {
      const previewData = await getPreviewData({
        id: data?.id,
        postTypeRestBase,
      });

      return { data, previewData };
    }

    return { data };
  }

  for (const key in postTypes) {
    // get rest base for post type
    if (uri.startsWith(postTypes[key].slug)) {
      postTypeRestBase = postTypes[key].rest_base;
    }
    // check if uri matches a post type archive uri
    if (postTypes[key]?.has_archive === uri) {
      archive = postTypes[key];
    }
  }

  // handle fetching archive pages
  if (archive) {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${archive.rest_base}?acf_format=standard`
    );
    try {
      const data = await req.json();
      return { data, archive };
    } catch (err) {
      throw new Error(`Error fetching archive page: ${err.message}`);
    }
  }

  // handle single items
  const endpoint = `${
    process.env.NEXT_PUBLIC_WP_URL
  }/wp-json/wp/v2/${postTypeRestBase}?slug=${paths.slice(
    -1
  )}&acf_format=standard`;

  const req = await fetch(endpoint);

  let data;
  try {
    data = await req.json();
  } catch (err) {
    throw new Error(`Error fetching from ${endpoint}: ${err.message}`);
  }

  if (preview.isEnabled) {
    const previewData = await getPreviewData({
      id: data?.[0]?.id,
      postTypeRestBase,
    });

    return { data: data?.[0], previewData };
  }

  return { data: data?.[0] };
}

const getPreviewData = async ({ id, postTypeRestBase }) => {
  const endpoint = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${postTypeRestBase}/${id}/autosaves?acf_format=standard`;
  const req = await fetch(endpoint, {
    headers: {
      Authorization: `Basic ${btoa(
        process.env.WP_APPLICATION_PASSWORD as string
      )}`,
    },
  });
  try {
    const autosaves = await req.json();
    return autosaves?.[0];
  } catch (err) {
    throw new Error(
      `Error fetching preview data for ${endpoint}: ${err.message}`
    );
  }
};
