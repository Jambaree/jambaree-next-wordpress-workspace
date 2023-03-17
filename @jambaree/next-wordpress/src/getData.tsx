import { gql, request } from "graphql-request";

export default async function getData({
  query,
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
  variables,
  isPreview,
  searchParams,
}: {
  graphqlUrl?: string;
  query: any;
  variables?: any;
  isPreview?: boolean;
  searchParams?: any;
}) {
  if (!graphqlUrl) {
    throw new Error(
      "Missing graphqlUrl,add the NEXT_PUBLIC_WPGRAPHQL_URL env or pass it as a param"
    );
  }
  const queryDocument = gql`
    ${query},
  `;

  const res = await request({
    url: graphqlUrl,
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

export { getData };
