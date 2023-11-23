export const getSingleItem = async ({
  id,
  slug,
  postTypeRestBase,
}: {
  id?: string;
  slug?: string;
  postTypeRestBase: string;
}) => {
  if (id) {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${postTypeRestBase}/${id}?acf_format=standard&_embed`
    );
    try {
      const data = await req.json();
      if (data.code === "rest_no_route") {
        return null;
      }
      return data;
    } catch (err) {
      throw new Error(
        `Error fetching from /wp-json/wp/v2/${postTypeRestBase}/${id}: ${err.message}`
      );
    }
  }

  if (slug) {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${postTypeRestBase}?slug=${slug}&acf_format=standard`
    );
    try {
      const data = await req.json();
      if (data.code === "rest_no_route") {
        return null;
      }
      return data?.[0];
    } catch (err) {
      throw new Error(
        `Error fetching from /wp-json/wp/v2/${postTypeRestBase}?slug=${slug}: ${err.message}`
      );
    }
  }
};
