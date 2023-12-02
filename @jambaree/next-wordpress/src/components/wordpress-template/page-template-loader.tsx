import React from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import getTemplate from "../../utils/get-template";
import { getPageData } from "../../api/get-page-data";
import { PreviewToolbar } from "../preview-toolbar";

export default async function PageTemplateLoader(props: {
  params?: { paths?: string[] };
  templates: any;
  searchParams?: Record<string, string | string[] | undefined>;
  supressWarnings?: boolean;
}) {
  const { params, templates, searchParams, supressWarnings } = props;
  const uri = params?.paths?.join("/") || "/";
  console.log({ uri });
  const preview = draftMode();

  const { data, archive, previewData } = await getPageData(uri, searchParams);

  if (!data) {
    notFound();
  }

  const PageTemplate = await getTemplate({
    uri,
    data,
    archive,
    templates,
    supressWarnings,
  });

  if (!PageTemplate) {
    notFound();
  }

  // Merge preview data into data
  const mergedData = { ...data };
  if (previewData) {
    Object.keys(previewData).forEach((key) => {
      mergedData[key] = previewData[key];
    });
  }

  return (
    <>
      <PageTemplate
        archive={archive}
        data={mergedData}
        isPreview={preview.isEnabled}
        uri={uri}
        {...props}
      />

      {preview.isEnabled ? (
        <PreviewToolbar
          data={data}
          previewData={previewData}
          searchParams={searchParams}
          uri={uri}
        />
      ) : null}
    </>
  );
}

export { PageTemplateLoader };
