import { draftMode } from "next/headers";
import type { WpPage, WpSettings } from "../types";
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
  searchParams?: {
    page?: string;
  }
): Promise<{
  /**
   * The data is the page data for the current page/post/custom.
   */
  data?: WpPage;
  /**
   * The items is an array of the related posts/pages/custom if the uri is an archive page,
   * based on WordPress's posts per page setting, and the current page number as a searchParam (?page=1).
   */
  items?: WpPage[];
  /**
   * The archive is the post type archive data if the uri is an archive page.
   */
  archive?: PostType;
  /**
   * The previewData is the preview data for the current page/post/custom.
   */
  previewData?: WpPage;
}> {
  const preview = draftMode();

  const paths = uri.split("/");
  const slug = paths.slice(-1).toString();
  const postTypes = await getPostTypes();

  let archive: PostType | null = null;
  let postTypeRestBase = "pages";

  const settings = await getSiteSettings();

  console.log({ uri });
  console.log({ paths });
  console.log({ slug });
  // todo: handle url encoded values like this %2F ("/")
  // handle front page
  if (uri === "/" || uri === "%2F") {
    console.log("getting front page now");
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
      has_archive: blogPage.slug,
      slug: "posts",
      rest_base: "posts",
    };
  }

  // handle fetching archive pages
  if (archive) {
    const params = {
      per_page: String(settings.posts_per_page || 10),
      _embed: "true",
      acf_format: "standard",
      page: String(searchParams?.page || "1"),
    };

    const currentPageQueryString = new URLSearchParams(params).toString();

    const archiveItemsRequest = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${archive.rest_base}?${currentPageQueryString}`
    );

    try {
      const items = (await archiveItemsRequest.json()) as WpPage[];

      let pageForItems;
      if (typeof archive.has_archive === "string") {
        pageForItems = await getSingleItem({
          slug: archive.has_archive,
          postTypeRestBase: "pages",
        });
      }

      const totalPages = archiveItemsRequest.headers.get("X-WP-TotalPages");
      const totalItems = archiveItemsRequest.headers.get("X-WP-Total");
      const hasNextPage = Number(totalPages) > Number(searchParams?.page || 1);

      return {
        data: {
          items,

          page: pageForItems,
          prevPage:
            Number(searchParams?.page || 1) > 1
              ? Number(searchParams?.page || 1) - 1
              : null,
          nextPage: hasNextPage ? Number(searchParams?.page || 1) + 1 : null,
          totalPages,
          totalItems,
          currentPage: searchParams?.page || 1,
        },
        archive,
      };
    } catch (err) {
      throw new Error(`Error fetching archive page: ${err?.message}`);
    }
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

async function getFrontPage({
  settings,
  preview,
  postTypeRestBase = "pages",
}: {
  /**
   * The site settings from the WordPress REST API.
   * You can get this easily with the `getSiteSettings` function.
   */
  settings: WpSettings;
  /**
   * The preview object from the Next.js `draftMode` function.
   */
  preview: ReturnType<typeof draftMode>;
  /**
   * The post type rest base for the front page.
   */
  postTypeRestBase?: string;
}) {
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
