export type PostType = {
  /**
   * `false` if no archive, `string` if archive slug is different from post type slug
   */
  has_archive: boolean | string;
  slug: string;
  /**
   * The base path for this post type's REST API endpoint.
   */
  rest_base: string;
};

type PostTypes = {
  post: PostType;
  page: PostType;
  attachment: PostType;
  nav_menu_item: PostType;
  /**
   * Custom post types, created by plugins and themes like CPT UI and ACF.
   */
  [postType: string]: PostType;
};

type PostTypesResponse = {
  code?: string;
  message?: string;
} & PostTypes;

/**
 * Get all post types from the WordPress REST API.
 */
export async function getPostTypes(): Promise<PostTypes> {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/types`
  );

  try {
    const data = (await req.json()) as PostTypesResponse;
    return data;
  } catch (err) {
    throw new Error(`getPostTypes: Error fetching post types: ${err.message}`);
  }
}
