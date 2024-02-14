import { FlexibleContent } from "@jambaree/next-wordpress";
import type { WpPage, Row } from "@jambaree/next-wordpress";
import * as blocks from "../../components/blocks";

interface PageData extends WpPage {
  acf?: {
    modules: Row[];
  };
}

export default function DefaultPageTemplate({ data }: { data: PageData }) {
  if (!data.acf?.modules) return null;
  return <FlexibleContent blocks={blocks} rows={data.acf.modules} />;
}
