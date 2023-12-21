import React from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { WpPage } from "@/types";
import type { Templates } from "../../utils/get-template";
import { deepMerge } from "../../utils/deep-merge";
import { createDataProxy } from "../../helpers/data-proxy";
import getTemplate from "../../utils/get-template";
import type { ArchivePageData } from "../../api/page-data/get-page-data";
import { getPageData } from "../../api/page-data/get-page-data";
import { PreviewToolbar } from "../preview-toolbar";
import { RouteParamsDebug } from "../route-params-debug";
import type { RouteParams, SearchParams } from "./wordpress-template";

export default async function PageTemplateLoader(props: {
  params?: RouteParams;
  templates: Templates;
  searchParams?: SearchParams;
  supressWarnings?: boolean;
}) {
  const { params, templates, searchParams, supressWarnings, ...rest } = props;
  const uri = params?.paths?.join("/") || "/";

  const preview = draftMode();

  const { data, archive, previewData } = await getPageData(uri, searchParams);

  if (!data && !previewData && !archive) {
    notFound();
  }

  const PageTemplate = getTemplate({
    uri,
    data,
    archive,
    templates,
    supressWarnings,
  });

  if (!PageTemplate) {
    notFound();
  }

  let mergedData: WpPage | ArchivePageData = data!;
  if (previewData) {
    // eslint-disable-next-line no-console -- only showing in preview mode
    console.log({ previewData });
    mergedData = deepMerge<WpPage | ArchivePageData>(mergedData, previewData); // Merge previewData into mergedData
  }
  if (archive) {
    mergedData = createDataProxy(
      mergedData as ArchivePageData
    ) as ArchivePageData;
  }

  return (
    <>
      {process.env.ROUTE_PARAMS_DEBUG_ENABLED ? (
        <RouteParamsDebug params={params} searchParams={searchParams} />
      ) : null}

      <PageTemplate
        archive={archive}
        data={mergedData}
        isPreview={preview.isEnabled}
        params={params}
        searchParams={searchParams}
        uri={uri}
        {...rest}
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
