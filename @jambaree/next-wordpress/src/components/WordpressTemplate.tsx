import React from "react";
import { notFound } from "next/navigation";
import getSeedData from "../getSeedData";
import getTemplate from "../getTemplate";
import { getPageData } from "../api/get-page-data";
import { getSiteSettings } from "../api/get-site-settings";
import { getPostTypes } from "../api/get-post-types";

export default async function WordpressTemplate(props: {
  params: { paths: string[] };
  templates: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { params, templates, searchParams } = props;
  const uri = params?.paths?.join?.("/") || "/";

  // const siteSettings = await getSiteSettings();
  const postTypes = await getPostTypes();
  const data = await getPageData(uri);
  // console.log({ postTypes });

  return (
    <div className="prose">
      {/* <pre>
        <code>{JSON.stringify({ postTypes }, null, 2)}</code>
      </pre> */}

      <pre>
        <code>{JSON.stringify({ pageData: data }, null, 2)}</code>
      </pre>
    </div>
  );

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
