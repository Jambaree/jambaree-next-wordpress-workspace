import { PostType, getPostTypes } from "./get-post-types";
import { getSiteSettings } from "./get-site-settings";
// import { getTaxonomies } from "./get-taxonomies";
export async function getPageData(uri: string) {
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

    const data = await req.json();
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

  // // check if uri matches a taxonomy
  // for (const key in taxonomies) {
  //   if (taxonomies[key]?.slug === paths[1]) {
  //     taxonomy = taxonomies[key];
  //   }
  // }
  // if (paths[0] === "tag") {
  //   taxonomy = taxonomies.post_tag;
  // }

  // if (taxonomy) {
  //   // todo: handle taxonomy pages
  //   // const req = await fetch(
  //   //   `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${taxonomy.rest_base}?slug=${paths.slice(
  //   //     -1
  //   //   )}&acf_format=standard`
  //   // );
  //   // const data = await req.json();
  //   // return { data, taxonomy };
  //   return null;
  // }

  // handle fetching archive pages
  if (archive) {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${archive.rest_base}?acf_format=standard`
    );
    const data = await req.json();
    return { data, archive };
  }

  // handle regular pages
  const req = await fetch(
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }/wp-json/wp/v2/${postTypeRestBase}?slug=${paths.slice(
      -1
    )}&acf_format=standard`
  );

  const data = await req.json();
  // todo: handle nested pages by checking length of data,
  // todo: if there is length > 1 we need to narrow down our selection to single page that has a parent if its a nested page,
  // todo: if its not nested then we get the one with no parent id

  return { data: data?.[0] };
}
