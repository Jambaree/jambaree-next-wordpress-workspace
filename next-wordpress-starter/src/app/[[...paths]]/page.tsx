import { WordpressTemplate } from "@jambaree/next-wordpress";

import templates from "@/templates";

export default async function PageTemplate(props: {
  params: { paths: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <WordpressTemplate
        templates={templates}
        params={props?.params}
        searchParams={props?.searchParams}
      />
    </>
  );
}

export {
  generateStaticParams,
  generateMetadata,
} from "@jambaree/next-wordpress";

export const revalidate = 60; // revalidate this page every 60 seconds
