import React from "react";
import { notFound } from "next/navigation";
// import getSeedData from "../getSeedData";
import getTemplate from "../getTemplate";
import { getPageData } from "../api/get-page-data";
// import { getSiteSettings } from "../api/get-site-settings";
// import { getPostTypes } from "../api/get-post-types";

export default async function WordpressTemplate(props: {
  params: { paths: string[] };
  templates: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { params, templates, searchParams } = props;
  const uri = params?.paths?.join?.("/") || "/";

  const { data, archive } = await getPageData(uri);

  // if (!data) {
  //   notFound();
  // }

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

  // return (
  //   <div className="prose">
  //     <pre>
  //       <code>{JSON.stringify({ uri, archive, data }, null, 2)}</code>
  //     </pre>
  //   </div>
  // );

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
