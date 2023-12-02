import {
  WordpressTemplate,
  generateStaticParams as jambareeGenerateStaticParams,
} from "@jambaree/next-wordpress";
import templates from "@/templates";

export default function PageRoute(props: {
  params: { paths: string[] };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  return (
    <WordpressTemplate
      params={props.params}
      searchParams={props.searchParams}
      templates={templates}
    />
  );
}

export {
  generateMetadata,
  // generateStaticParams,
} from "@jambaree/next-wordpress";

export async function generateStaticParams() {
  return jambareeGenerateStaticParams({
    postTypes: ["pages"],
  });
}
