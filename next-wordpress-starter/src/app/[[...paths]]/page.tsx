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
    <>
      <pre>{JSON.stringify({ params: props.params }, null, 2)}</pre>
      <pre>{JSON.stringify({ searchParams: props.searchParams }, null, 2)}</pre>
      <WordpressTemplate
        params={props.params}
        searchParams={props.searchParams}
        templates={templates}
      />
    </>
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
