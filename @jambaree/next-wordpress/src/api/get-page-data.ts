import { draftMode } from "next/headers";
import type { WpPage } from "../types";
import type { PostType } from "./get-post-types";
import { getPostTypes } from "./get-post-types";
import { getSiteSettings } from "./get-site-settings";
import { getSingleItem } from "./get-single-item";

/**
 * Get data for a specific page from a WordPress REST API endpoint based on the URI
 * @example
 * ```
 * const pageData = await getPageData("/about");
 * ```
 */
export async function getPageData(
  uri: string
): Promise<{ data?: WpPage; archive?: any; previewData?: any }> {
  const preview = draftMode();

  const paths = uri.split("/");
  const slug = paths.slice(-1).toString();
  const postTypes = await getPostTypes();

  let archive: PostType | null = null;
  let postTypeRestBase = "pages";

  // handle front page
  if (uri === "/") {
    const settings = await getSiteSettings();

    const data = await getSingleItem({
      id: settings.page_on_front,
      postTypeRestBase,
    });

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
    if (postTypes[key].has_archive === uri) {
      archive = postTypes[key];
    }
  }

  // handle fetching archive pages
  if (archive) {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${archive.rest_base}?acf_format=standard&_embed`
    );
    try {
      const data = await req.json();
      return { data, archive };
    } catch (err) {
      throw new Error(`Error fetching archive page: ${err.message}`);
    }
  }

  if (uri.startsWith("private/")) {
    const restBase = uri.split("/")[1];
    const id = uri.split("/")[2];

    const data = await getSingleItem({
      id,
      postTypeRestBase: restBase,
    });

    return { data };
  }

  // handle single items
  const data = await getSingleItem({
    slug,
    postTypeRestBase,
  });

  // posts are a special case because they can have an empty slug prefix like pages
  const possiblePostData = await getSingleItem({
    slug,
    postTypeRestBase: "posts",
  });
  if (possiblePostData) {
    postTypeRestBase = "posts";
  }

  if (preview.isEnabled) {
    const previewId = possiblePostData?.id || data?.id;
    const previewData = await getPreviewData({
      id: previewId,
      postTypeRestBase,
    });

    return { data: data || possiblePostData, previewData };
  }

  return { data: data || possiblePostData };
}

const getPreviewData = async ({
  id,
  postTypeRestBase,
}: {
  id: string;
  postTypeRestBase: string;
}) => {
  const endpoint = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${postTypeRestBase}/${id}/autosaves?acf_format=standard&_embed`;
  const req = await fetch(endpoint, {
    headers: {
      Authorization: `Basic ${btoa(process.env.WP_APPLICATION_PASSWORD!)}`,
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
