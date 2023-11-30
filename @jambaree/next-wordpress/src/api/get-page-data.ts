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
  uri: string,
  searchParams: any
): Promise<{ data?: WpPage; archive?: any; previewData?: any }> {
  const preview = draftMode();
  // console.log({ searchParams });
  const paths = uri.split("/");
  const slug = paths.slice(-1).toString();
  const postTypes = await getPostTypes();
  // console.log({ postTypes });
  let archive: PostType | null = null;
  let postTypeRestBase = "pages";

  const settings = await getSiteSettings();

  // handle front page
  if (uri === "/") {
    const { data, previewData } = await getFrontPage({
      settings,
      preview,
    });

    return { data, previewData };
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

  const blogPage = await getSingleItem({
    id: settings.page_for_posts,
    postTypeRestBase: "pages",
  });

  if (blogPage?.slug === slug) {
    archive = {
      has_archive: blogPage?.slug,
      slug: "posts",
      rest_base: "posts",
    };
  }

  // handle fetching archive pages
  if (archive) {
    const params = {
      per_page: settings.posts_per_page,
      page: searchParams?.page || 1,
      _embed: true,
      acf_format: "standard",
    };
    const queryString = new URLSearchParams(params).toString();

    const archiveItemsRequest = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${archive.rest_base}?${queryString}`
    );
    const nextPageRequest = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${archive.rest_base}?${queryString}`
    );

    try {
      const hasNextPage = await nextPageRequest.json();
      const items = await archiveItemsRequest.json();

      const pageForItems = await getSingleItem({
        slug: archive.has_archive,
        postTypeRestBase: "pages",
      });

      return {
        data: {
          items,
          page: pageForItems,
          prevPage: searchParams?.page > 1 ? searchParams?.page - 1 : null,
          nextPage:
            hasNextPage.length > 0 ? Number(searchParams?.page || 1) + 1 : null,
          totalPages: archiveItemsRequest.headers.get("X-WP-TotalPages"),
          total: archiveItemsRequest.headers.get("X-WP-Total"),
          currentPage: searchParams?.page || 1,
        },
        archive,
      };
    } catch (err) {
      throw new Error(`Error fetching archive page: ${err.message}`);
    }
  }

  if (uri.startsWith("private/")) {
    const restBase = uri.split("/")[1];
    const id = uri.split("/")[2];

    const data = await getSingleItem({
      id: id,
      postTypeRestBase: restBase,
    });

    return { data };
  }

  // handle single items
  const data = await getSingleItem({
    slug: slug,
    postTypeRestBase,
  });

  // posts are a special case because they can have an empty slug prefix like pages
  const possiblePostData = await getSingleItem({
    slug: slug,
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

async function getFrontPage({ settings, preview, postTypeRestBase = "pages" }) {
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
