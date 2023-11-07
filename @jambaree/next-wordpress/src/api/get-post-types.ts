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

export async function getPostTypes(): Promise<{
  post: PostType;
  page: PostType;
  attachment: PostType;
  nav_menu_item: PostType;
  /**
   * Custom post types, created by plugins and themes like CPT UI and ACF.
   */
  [postType: string]: PostType;
}> {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/types`
  );

  const data = await req.json();

  return data;
}
