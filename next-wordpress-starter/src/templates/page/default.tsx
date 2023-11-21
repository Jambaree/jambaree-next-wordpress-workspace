import { FlexibleContent } from "@jambaree/next-wordpress";
import type { WpPage } from "@jambaree/next-wordpress/types";
import type { BlockData } from "@/components/blocks/types";
import * as blocks from "../../components/blocks";

interface PageData extends WpPage {
  acf?: {
    modules: BlockData[];
  };
}

export default function DefaultPageTemplate({ data }: { data: PageData }) {
  return <FlexibleContent blocks={blocks} rows={data.acf?.modules} />;
}
