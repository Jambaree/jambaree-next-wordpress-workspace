import React from "react";
import { PageTemplateLoader } from "./page-template-loader";

export function WordpressTemplate(props: {
  params: { paths: string[] };
  searchParams?: Record<string, string | string[] | undefined>;
  templates: any;
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
