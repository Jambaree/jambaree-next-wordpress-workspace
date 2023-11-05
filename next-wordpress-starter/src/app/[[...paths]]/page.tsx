import { WordpressTemplate } from "@jambaree/next-wordpress";

import templates from "@/templates";

export default async function PageRoute(props: {
  params: { paths: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <WordpressTemplate
      templates={templates}
      params={props?.params}
      searchParams={props?.searchParams}
    />
  );
}

export {
  generateStaticParams,
  generateMetadata,
} from "@jambaree/next-wordpress";
