import type { Metadata } from "next";
import { getSiteSettings } from "../api/get-site-settings";
import { getPageData } from "../api/get-page-data";
import { swapWpUrl } from "../utils/swap-wp-url";
/**
 * The generateMetadata function can be exported from your Next.js page.js and used to generate metadata for your page.
 * This function uses the yoast_head_json field from the WordPress REST API to generate the metadata.
 * The WordPress plugin YoastSEO is required for this to work.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata({
  params,
  // searchParams,
  wpUrl = process.env.NEXT_PUBLIC_WP_URL || "",
}): Promise<Metadata> {
  if (!wpUrl) {
    throw new Error(
      "No wpUrl provided. Please set NEXT_PUBLIC_WP_URL env or pass wpUrl to generateMetadata"
    );
  }

  const uri = params?.paths?.join?.("/") || "/";
  const siteSettings = await getSiteSettings();
  const { data } = await getPageData(uri);

  return {
    generator: "Jambaree.com",
    applicationName: siteSettings.title,
    metadataBase: new URL(process.env.NEXT_PUBLIC_WP_URL || "http://localhost"),
    title: data?.yoast_head_json?.title,
    description: data?.yoast_head_json?.og_description,

    openGraph: {
      title: data?.yoast_head_json?.og_title,
      description: data?.yoast_head_json?.og_description,
      siteName: data?.yoast_head_json?.og_site_name,
      locale: data?.yoast_head_json?.og_locale,
      url: swapWpUrl(data?.yoast_head_json?.og_url),
      images: data?.yoast_head_json?.og_image
        ? data?.yoast_head_json?.og_image?.map((ogImg) => ogImg.url)
        : [],
    },

    twitter: {
      card: data?.yoast_head_json?.twitter_card,
      images: data?.yoast_head_json?.twitter_image,
    },
  } as Metadata;
}
