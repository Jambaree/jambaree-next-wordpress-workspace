import React from "react";
import { notFound } from "next/navigation";
import getTemplate from "../utils/get-template";
import { getPageData } from "../api/get-page-data";

export default async function WordpressTemplate(props: {
  params: { paths: string[] };
  templates: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { params, templates, searchParams } = props;
  const uri = params?.paths?.join?.("/") || "/";

  const { data, archive } = await getPageData(uri);

  if (!data) {
    notFound();
  }

  // const isPreview = !!searchParams?.revision_id;

  const PageTemplate = await getTemplate({
    uri,
    data,
    archive,
    templates,
  });

  if (!PageTemplate) {
    notFound();
  }

  return (
    <PageTemplate
      uri={uri}
      data={data}
      archive={archive}
      // isPreview={isPreview}
      {...props}
    />
  );
}

export { WordpressTemplate };
