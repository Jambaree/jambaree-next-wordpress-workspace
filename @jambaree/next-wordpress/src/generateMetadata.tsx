import getSeedData from "./getSeedData";
import type { Metadata } from "next";
import getYoastData from "./getYoastData";

export async function generateMetadata({ params }): Promise<Metadata> {
  const uri = params?.paths?.join?.("/") || "/";
  const seedData = await getSeedData({ uri });
  const yoastData = await getYoastData({
    uri,
    name: seedData?.name || seedData?.contentTypeName || "page",
  });

  if (!yoastData) {
    return {};
  }

  return {
    title: yoastData?.seo?.title,
    description: yoastData?.seo?.metaDesc,
    openGraph: {
      title: yoastData?.seo?.opengraphTitle,
      description: yoastData?.seo?.opengraphDescription,
      siteName: yoastData?.seo?.opengraphSiteName,
      url: yoastData?.seo?.opengraphUrl,
      type: yoastData?.seo?.opengraphType,
      publishedTime: yoastData?.seo?.opengraphPublishedTime,
      authors: [yoastData?.seo?.opengraphAuthor],
      images: [
        yoastData?.seo?.opengraphImage?.sourceUrl ||
          "https://yoast.com/app/uploads/2013/02/Yoast_Logo_Large_RGB-250x115.png",
      ],
      locale: "en-US",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    twitter: {
      card: yoastData?.seo?.twitterImage?.sourceUrl,
      title: yoastData?.seo?.twitterTitle,
      description: yoastData?.seo?.twitterDescription,
      images: [
        yoastData?.seo?.twitterImage?.sourceUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png",
      ],
    },
  };
}
