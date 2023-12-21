import React from "react";
import type { Templates } from "../../utils/get-template";
import { PageTemplateLoader } from "./page-template-loader";

export type SearchParams = Record<string, string | string[] | undefined>;
export type RouteParams = { paths?: string[] };

export function WordpressTemplate(props: {
  params: RouteParams;
  searchParams?: SearchParams;
  templates: Templates;
  /**
   * Suppresses warnings when a template is not found.
   */
  supressWarnings?: boolean;
}) {
  return <PageTemplateLoader {...props} />;

  // todo: try to get PPR working with this
  // return (
  //   <Suspense
  //     fallback={
  //       <div className="m-24 bg-red-500 w-[500px] h-[500px]">Loading...</div>
  //     }
  //   >
  //     <PageTemplateLoader {...props} />
  //   </Suspense>
  // );
}
