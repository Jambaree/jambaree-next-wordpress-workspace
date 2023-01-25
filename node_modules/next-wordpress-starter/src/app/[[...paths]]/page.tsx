import WordpressTemplate from "@jambaree/next-wordpress/WordpressTemplate";
import templates from "../../templates";

export default async function PageTemplate(props: {
  params: { paths: string[] };
}) {
  const {
    params: { paths },
  } = props;

  const uri = paths?.join?.("/") || "/";

  return <WordpressTemplate uri={uri} paths={paths} templates={templates} />;
}
