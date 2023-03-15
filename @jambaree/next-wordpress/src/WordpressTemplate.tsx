import React from "react";
import { notFound } from "next/navigation";
import getSeedData from "./getSeedData";
import getTemplate from "./getTemplate";

export default async function WordpressTemplate(props: {
  paths: string[];
  templates: any;
  searchParams?: any;
}) {
  const { paths, templates, searchParams } = props;

  const uri = paths?.join?.("/") || "/";

  const isPreview = uri === "preview";

  const seedData = await getSeedData({ uri, isPreview, searchParams });

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

  return (
    <PageTemplate
      uri={uri}
      seedData={seedData}
      isPreview={isPreview}
      {...props}
    />
  );
}
