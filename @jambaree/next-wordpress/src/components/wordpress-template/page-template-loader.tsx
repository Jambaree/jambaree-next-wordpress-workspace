import React from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { createDataProxy } from "../../helpers/data-proxy";
import getTemplate from "../../utils/get-template";
import { getPageData } from "../../api/get-page-data";
import { PreviewToolbar } from "../preview-toolbar";
import { RouteParamsDebug } from "../route-params-debug";

export default async function PageTemplateLoader(props: {
  params?: { paths?: string[] };
  templates: any;
  searchParams?: Record<string, string | string[] | undefined>;
  supressWarnings?: boolean;
}) {
  const { params, templates, searchParams, supressWarnings } = props;
  const uri = params?.paths?.join("/") || "/";

  const preview = draftMode();

  const { data, archive, previewData } = await getPageData(uri, searchParams);

  if (!data && !previewData && !archive) {
    notFound();
  }

  if (previewData) {
    // eslint-disable-next-line no-console -- only showing in preview mode
    console.log({ previewData });
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

  // Create a proxy to log warnings when user is accessing deprecated data keys
  const preppedData =
    archive && mergedData ? createDataProxy(mergedData) : mergedData;

  return (
    <>
      {process.env.ROUTE_PARAMS_DEBUG_ENABLED ? (
        <RouteParamsDebug params={params} searchParams={searchParams} />
      ) : null}

      <PageTemplate
        archive={archive}
        data={preppedData}
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
