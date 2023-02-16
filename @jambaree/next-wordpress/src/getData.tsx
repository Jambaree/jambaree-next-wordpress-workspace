import { gql, request } from "graphql-request";

export default async function getPageData({
  query,
  url,
  variables,
}: {
  url?: string;
  query: any;
  variables?: any;
}) {
  if (!process.env.NEXT_PUBLIC_WPGRAPHQL_URL && !url) {
    throw new Error("Missing WP_URL environment variable");
  }
  const queryDocument = gql`
    ${query},
  `;

  const res = await request({
    url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL,
    variables: {
      ...variables,
    },
    document: queryDocument,
  });

  return res;
}
