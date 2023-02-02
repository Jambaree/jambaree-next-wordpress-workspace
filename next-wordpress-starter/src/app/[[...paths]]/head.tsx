import { YoastSEO } from "@jambaree/next-wordpress";
import { getYoastData } from "@jambaree/next-wordpress";
import { getSeedData } from "@jambaree/next-wordpress";

export default async function Head(props: { params: { paths: string[] } }) {
  const {
    params: { paths },
  } = props;

  const uri = paths?.join?.("/") || "/";
  const seedData = await getSeedData({ uri });

  const yoastData = await getYoastData({
    uri,
    name: seedData?.name || seedData?.contentTypeName,
  });

  return <YoastSEO ogUrl={uri} seo={yoastData?.seo} />;
}
