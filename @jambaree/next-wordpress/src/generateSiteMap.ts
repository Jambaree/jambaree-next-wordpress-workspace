import { generateStaticParams } from "./generateStaticParams";
export function generateSiteMap() {
  const params = generateStaticParams({
    graphqlUrl: process.env.NEXT_PUBLIC_WPGRAPHQL_URL,
    siteMap: true,
  });

  return params;
}
