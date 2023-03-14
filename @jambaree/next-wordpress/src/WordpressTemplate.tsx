import React from "react";
// import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getSeedData from "./getSeedData";
import getTemplate from "./getTemplate";
// import getYoastData from "./getYoastData";

import WordpressPreview from "./WordpressPreview";

export default async function WordpressTemplate(props: {
  paths: string[];
  templates: any;
}) {
  const { paths, templates } = props;

  const uri = paths?.join?.("/") || "/";

  if (uri === "preview") {
    return <WordpressPreview {...props} />;
  }

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
