import React from "react";
// import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getSeedData from "./getSeedData";
// import getAllContentNodePaths from "./getAllContentNodePaths";
import getTemplate from "./getTemplate";
// import getYoastData from "./getYoastData";

export default async function WordpressTemplate({
  paths,
  templates,
}: {
  paths: string[];
  templates: any;
}) {
  const uri = paths?.join?.("/") || "/";
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
