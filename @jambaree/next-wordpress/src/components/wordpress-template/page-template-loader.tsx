import React from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { deepMerge } from "@/utils/deep-merge";
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Merge previewData with data
  const mergedData = deepMerge({}, data); // Start with a clone of data
  if (previewData) {
    deepMerge(mergedData, previewData); // Merge previewData into mergedData
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Create a proxy to log warnings when user is accessing deprecated data keys
  const preppedData =
    archive && mergedData ? createDataProxy(mergedData) : mergedData;

  return (
    <>
      {process.env.ROUTE_PARAMS_DEBUG_ENABLED ? (
        <RouteParamsDebug params={params} searchParams={searchParams} />
      ) : null}

      <PageTemplate
        archive={archive}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- preppedData is a proxy of mergedData
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
