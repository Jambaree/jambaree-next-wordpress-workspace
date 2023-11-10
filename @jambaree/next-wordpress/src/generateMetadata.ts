import type { Metadata } from "next";
import { getSiteSettings } from "./api/get-site-settings";
import { getPageData } from "./api/get-page-data";

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

const swapWpUrl = (url: string) => {
  const newUrl = url?.replace?.(
    process.env.NEXT_PUBLIC_WP_URL as string,
    process.env.NEXT_SITE_URL as string
  );

  return newUrl;
};
