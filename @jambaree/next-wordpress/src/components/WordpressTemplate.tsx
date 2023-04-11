import React from "react";
import { notFound } from "next/navigation";
import getSeedData from "../getSeedData";
import getTemplate from "../getTemplate";

export default async function WordpressTemplate(props: {
  params: { paths: string[] };
  templates: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { params, templates, searchParams } = props;
  const uri = params?.paths?.join?.("/") || "/";
  const isPreview = !!searchParams?.revision_id;

  const seedData = await getSeedData({ uri, isPreview, searchParams });
  if (!seedData) {
    notFound();
  }

  const PageTemplate = await getTemplate({
    uri,
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

export { WordpressTemplate };
