import { getPostTypes } from "./get-post-types";
import { getSiteSettings } from "./get-site-settings";

export async function getPageData(uri: string) {
  const paths = uri?.split("/");

  const postTypes: {
    [postType: string]: {
      slug: string;
      rest_base: string;
    };
  } = await getPostTypes();

  let postTypeRestBase = "pages";

  if (uri === "/") {
    const settings = await getSiteSettings();

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/pages/${settings.page_on_front}`
    );

    const data = await req.json();
    return data;
  }

  for (const key in postTypes) {
    if (uri.startsWith(postTypes[key].slug)) {
      postTypeRestBase = postTypes[key].rest_base;
    }
  }

  const req = await fetch(
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }/wp-json/wp/v2/${postTypeRestBase}?slug=${paths.slice(-1)}`
  );

  const data = await req.json();
  // todo: handle nested pages by checking length of data,
  // todo: if there is length > 1 we need to narrow down our selection to single page that has a parent if its a nested page,
  // todo: if its not nested then we get the one with no parent id

  return data?.[0];
}
