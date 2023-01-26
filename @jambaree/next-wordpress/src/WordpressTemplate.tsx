import React, { use } from "react";

import { notFound } from "next/navigation";
import getSeedData from "./getSeedData";
import getAllContentNodePaths from "./getAllContentNodePaths";
import getTemplate from "./getTemplate";

export default function WordpressTemplate({
  paths,
  templates,
}: {
  paths: string[];
  templates: any;
}) {
  const uri = paths?.join?.("/") || "/";
  const seedData = use(getSeedData({ uri }));

  if (!seedData) {
    notFound();
  }

  const PageTemplate = use(
    getTemplate({
      seedData,
      templates,
    })
  );

  if (!PageTemplate) {
    notFound();
  }

  return <PageTemplate uri={uri} seedData={seedData} paths={paths} />;
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
