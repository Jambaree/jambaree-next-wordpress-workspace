import { WordpressTemplate } from "@jambaree/next-wordpress";
import templates from "@/templates";

export default function PageRoute({
  params,
  searchParams,
}: {
  params: { paths: string[] };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      <pre>{JSON.stringify({ params }, null, 2)}</pre>
      <pre>{JSON.stringify({ searchParams }, null, 2)}</pre>
      <WordpressTemplate
        params={params}
        searchParams={searchParams}
        templates={templates}
      />
    </>
  );
}

export {
  generateMetadata,
  generateStaticParams,
} from "@jambaree/next-wordpress";
