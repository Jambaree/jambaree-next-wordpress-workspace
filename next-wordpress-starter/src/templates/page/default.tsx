import { FlexibleContent } from "@jambaree/next-wordpress";

import * as blocks from "../../components/blocks";

export default async function DefaultPageTemplate({
  uri,
  data,
  isPreview,
  searchParams,
}) {
  return <FlexibleContent rows={data?.acf?.modules} blocks={blocks} />;
}
