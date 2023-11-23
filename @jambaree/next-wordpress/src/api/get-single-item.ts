import { draftMode } from "next/headers";

export const getSingleItem = async ({
  id,
  slug,
  postTypeRestBase,
}: {
  id?: string;
  slug?: string;
  postTypeRestBase: string;
}) => {
  const params: Record<string, string> = {
    acf_format: "standard", // includes ACF data in the response
    _embed: "true", // includes embedded data in the response like (featured image, author, etc.)
  };

  const preview = draftMode();
  let headers;
  if (preview.isEnabled) {
    headers = {
      Authorization: `Basic ${btoa(process.env.WP_APPLICATION_PASSWORD!)}`,
    };
    params.status = "any";
  }

  if (id) {
    const queryString = new URLSearchParams(params).toString();

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${postTypeRestBase}/${id}?${queryString}`,
      {
        headers,
      }
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
    params.slug = slug;
    const queryString = new URLSearchParams(params).toString();

    const endpoint = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${postTypeRestBase}?${queryString}`;

    const req = await fetch(endpoint, {
      headers,
    });
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
