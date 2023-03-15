import { gql, request } from "graphql-request";

export default async function getPageData({
  query,
  url,
  variables,
  isPreview,
  searchParams,
}: {
  url?: string;
  query: any;
  variables?: any;
  isPreview?: boolean;
  searchParams?: any;
}) {
  if (!process.env.NEXT_PUBLIC_WPGRAPHQL_URL && !url) {
    throw new Error("Missing WP_URL environment variable");
  }
  const queryDocument = gql`
    ${query},
  `;

  const res = await request({
    url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
    variables: isPreview
      ? { id: searchParams?.revision_id, idType: "DATABASE_ID" }
      : variables,
    document: queryDocument,
    requestHeaders: isPreview
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${searchParams?.key}`,
        }
      : undefined,
  });

  return res;
}
