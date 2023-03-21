import { gql, request } from "graphql-request";

export async function getSeedData({
  uri,
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
  isPreview,
  searchParams,
}: {
  /**
   * uri is the path of the page from nextjs
   */
  uri: string;

  /**
   * graphqlUrl is the url of the graphql endpoint
   * if not passed it will use the NEXT_PUBLIC_WPGRAPHQL_URL environment variable
   */
  graphqlUrl?: string;

  /**
   * isPreview is used to determine if we are in preview mode
   * if true it will use the searchParams to get the revision id and jwt
   */
  isPreview?: boolean;

  /**
   * searchParams are used for preview authentication jwt and revision id
   */
  searchParams?: any;
}) {
  if (!graphqlUrl) {
    throw new Error(
      "Missing graphqlUrl in getSeedData, add NEXT_PUBLIC_WPGRAPHQL_URL environment variable or pass it as an argument"
    );
  }

  if (isPreview) {
    const previewSeedData = await request({
      url: graphqlUrl,
      variables: {
        id: searchParams?.revision_id,
      },
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${searchParams?.key}`,
      },
      document: gql`
        query PreviewContentNodeSeedQuery($id: ID!) {
          contentNode(id: $id, idType: DATABASE_ID) {
            uri
            __typename
            template {
              templateName
              __typename
            }
            contentTypeName
            contentType {
              node {
                uri
                graphqlSingleName
              }
            }
          }
        }
      `,
    });

    return previewSeedData?.contentNode;
  }

  const { nodeByUri: seedData }: any = await request({
    url: graphqlUrl,
    variables: {
      uri,
    },
    document: gql`
      query nodeByUri($uri: String!) {
        nodeByUri(uri: $uri) {
          __typename
          isTermNode
          uri
          id

          ... on ContentType {
            graphqlSingleName
          }

          ... on ContentNode {
            isContentNode
            template {
              templateName
              __typename
            }
            contentTypeName
            contentType {
              node {
                uri
                graphqlSingleName
              }
            }
          }
          ... on TermNode {
            name
            slug
            taxonomyName
          }
        }
      }
    `,
  });

  return seedData;
}

export default getSeedData;
