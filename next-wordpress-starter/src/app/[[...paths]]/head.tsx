import { YoastSEO } from "@jambaree/next-wordpress";

import { getSeedData } from "@jambaree/next-wordpress";

export default async function Head(props: { params: { paths: string[] } }) {
  const {
    params: { paths },
  } = props;

  const uri = paths?.join?.("/") || "/";
  const seedData = await getSeedData({ uri });

  return <YoastSEO ogUrl={uri} seo={seedData?.seo} />;
}
