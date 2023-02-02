import { gql, request } from "graphql-request";

export default async function getPageData({
  uri,
  query,
  url,
  variables,
}: {
  uri: string;
  url?: string;
  query: any;
  variables?: any;
}) {
  if (!process.env.NEXT_PUBLIC_WP_URL && !url) {
    throw new Error("Missing WP_URL environment variable");
  }
  const queryDocument = gql`
    ${query},


  `;

  const res = await request({
    url: url || process.env.NEXT_PUBLIC_WP_URL,
    variables: {
      uri,
      ...variables,
    },
    document: queryDocument,
  });

  return res;
}
