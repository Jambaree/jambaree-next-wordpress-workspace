import React from "react";
import { notFound } from "next/navigation";
import getTemplate from "../utils/get-template";
import { getPageData } from "../api/get-page-data";
import { draftMode } from "next/headers";
import { PreviewToolbar } from "./preview-toolbar";

export default async function WordpressTemplate(props: {
  params: { paths: string[] };
  templates: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { params, templates } = props;
  const uri = params?.paths?.join?.("/") || "/";
  const preview = draftMode();

  const { data, archive, previewData } = await getPageData(uri);

  if (preview.isEnabled && !previewData) {
    return (
      <div style={{ margin: "24px" }}>
        <h1>No preview data found for this uri '{uri}'.</h1>
        <p>
          Try clicking preview again or check that post revisions are enabled on
          this site.
        </p>
      </div>
    );
  }

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
  if (previewData) {
    Object.keys(previewData).forEach((key) => {
      data[key] = previewData[key];
    });
  }

  return (
    <>
      <PageTemplate
        uri={uri}
        data={data}
        archive={archive}
        isPreview={preview.isEnabled}
        {...props}
      />

      {preview.isEnabled && (
        <PreviewToolbar uri={uri} searchParams={props.searchParams} />
      )}
    </>
  );
}

export { WordpressTemplate };
