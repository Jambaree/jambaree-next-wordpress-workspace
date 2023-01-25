import React from "react";
import { notFound } from "next/navigation";
import getSeedData from "./getSeedData";
import getContentType from "./getContentType";
import getTemplate from "./getTemplate";

export default async function WordpressTemplate({ uri, paths, templates }) {
  const seedData = await getSeedData({ uri });

  if (!seedData) {
    notFound();
  }

  const PageTemplate = await getTemplate({
    seedData,
    templates,
  });

  if (!PageTemplate) {
    notFound();
  }

  return <PageTemplate uri={uri} seedData={seedData} paths={paths} />;
}

export const revalidate = "force-cache";

export async function generateStaticParams() {
  const types = await getContentType();

  return types.map((type) => {
    return {
      paths: [type.uri || "/products"],
    };
  });
}
