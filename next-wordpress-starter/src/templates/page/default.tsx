import { FlexibleContent } from "@jambaree/next-wordpress";
import type { WpPage } from "@jambaree/next-wordpress/src/types";
import type { RowItem } from "@jambaree/next-wordpress/src/components/flexible-content";
import * as blocks from "../../components/blocks";

interface PageData extends WpPage {
  acf?: {
    modules: RowItem[];
  };
}

export default function DefaultPageTemplate({ data }: { data: PageData }) {
  if (!data.acf?.modules) return null;
  return <FlexibleContent blocks={blocks} rows={data.acf.modules} />;
}
