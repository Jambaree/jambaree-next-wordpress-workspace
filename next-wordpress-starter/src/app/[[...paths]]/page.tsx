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
    <WordpressTemplate
      params={params}
      searchParams={searchParams}
      templates={templates}
    />
  );
}

export {
  generateMetadata,
  generateStaticParams,
} from "@jambaree/next-wordpress";
