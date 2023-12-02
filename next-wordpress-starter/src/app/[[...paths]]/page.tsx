import { WordpressTemplate } from "@jambaree/next-wordpress";
import templates from "@/templates";

export default function PageRoute(props: {
  params?: { paths?: string[] };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const uri = props.params?.paths?.join("/") || "/";
  return (
    <div className="my-20">
      <h1>Page uri: {uri}</h1>
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>

      <WordpressTemplate
        params={props.params}
        searchParams={props.searchParams}
        templates={templates}
      />
    </div>
  );
}

export {
  generateMetadata,
  generateStaticParams,
} from "@jambaree/next-wordpress";
