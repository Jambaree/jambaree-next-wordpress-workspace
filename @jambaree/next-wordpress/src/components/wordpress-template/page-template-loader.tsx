import React from "react";
import { notFound } from "next/navigation";
import getTemplate from "../../utils/get-template";
import { getPageData } from "../../api/get-page-data";
import { draftMode } from "next/headers";
import { PreviewToolbar } from "../preview-toolbar";

export default async function PageTemplateLoader(props: {
  params: { paths: string[] };
  templates: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { params, templates, searchParams } = props;
  const uri = params?.paths?.join?.("/") || "/";
  const preview = draftMode();

  const { data, archive, previewData, ...rest } = await getPageData(
    uri,
    searchParams
  );

  if (!data) {
    notFound();
  }

  const PageTemplate = await getTemplate({
    uri,
    data,
    archive,
    templates,
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
        uri={uri}
        data={mergedData}
        archive={archive}
        isPreview={preview.isEnabled}
        {...props}
      />

      {preview.isEnabled && (
        <PreviewToolbar
          uri={uri}
          data={data}
          previewData={previewData}
          searchParams={searchParams}
        />
      )}
    </>
  );
}

export { PageTemplateLoader };
