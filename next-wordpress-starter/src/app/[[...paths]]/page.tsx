import {
  WordpressTemplate,
  getAllContentNodePaths,
  getSeedData,
  getYoastData,
} from "@jambaree/next-wordpress";
import type { Metadata } from "next";
import templates from "../../templates";

export default async function PageTemplate(props: {
  params: { paths: string[] };
}) {
  const {
    params: { paths },
  } = props;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <WordpressTemplate paths={paths} templates={templates} />;
    </>
  );
}

export const revalidate = "force-cache";

export async function generateStaticParams() {
  const nodePaths = await getAllContentNodePaths();

  return nodePaths.map((node) => {
    return {
      paths: [node.uri || "/"],
    };
  });
}

export async function generateMetadata({ params: paths }): Promise<Metadata> {
  const uri = paths?.join?.("/") || "/";
  const seedData = await getSeedData({ uri });

  // const uri = paths?.join?.("/") || "/";
  // const seedData = await getSeedData({ uri });

  const yoastData = await getYoastData({
    uri,
    name: seedData?.name || seedData?.contentTypeName || "page",
  });

  return {
    title: yoastData?.seo?.title,
    description: yoastData?.seo?.metaDesc,
    openGraph: {
      title: yoastData?.seo?.opengraphTitle,
      description: yoastData?.seo?.opengraphDescription,
      url: yoastData?.seo?.opengraph?.url,
      siteName: yoastData?.seo?.opengraphDescription,
      // images: [
      //   {
      //     url: 'https://nextjs.org/og.png',
      //     width: 800,
      //     height: 600,
      //   },
      //   {
      //     url: 'https://nextjs.org/og-alt.png',
      //     width: 1800,
      //     height: 1600,
      //     alt: 'My custom alt',
      //   },
      // ],
      locale: "en-US",
      type: "website",
    },
  };
}
