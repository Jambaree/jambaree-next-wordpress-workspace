import { WordpressTemplate } from "@jambaree/next-wordpress";
import templates from "../../templates";

export default async function PageTemplate(props: {
  params: { paths: string[] };
}) {
  const {
    params: { paths },
  } = props;

  return <WordpressTemplate paths={paths} templates={templates} />;
}
