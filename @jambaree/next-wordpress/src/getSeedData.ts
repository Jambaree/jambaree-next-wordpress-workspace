import { gql, request } from "graphql-request";

export default async function getSeedData({
  uri,
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
  isPreview,
  searchParams,
}: {
  uri: string;
  graphqlUrl?: string;

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

  const uriRes = await request({
    url: graphqlUrl,
    variables: {
      uri,
    },
    document: gql`
      query contentNodeSeedQueryUri($uri: String!) {
        nodeByUri(uri: $uri) {
          id
          uri
          isTermNode
          __typename
        }
      }
    `,
  });

  if (!uriRes?.nodeByUri?.id) {
    return null;
  }

  // must be a better way to do this instead of using the Typename of the taxonomy

  if (uriRes?.nodeByUri?.isTermNode) {
    const filterTaxonomyUri = uri.split("/")[0];
    const taxonomyRes = await request({
      url: graphqlUrl,
      variables: {
        id: filterTaxonomyUri === "tag" ? "post_tag" : filterTaxonomyUri,
      },
      document: gql`
        query contentNodeSeedQueryUri($id: ID!) {
          taxonomy(id: $id, idType: NAME) {
            id
            __typename
            graphqlSingleName
            name
          }
        }
      `,
    });
    return taxonomyRes?.taxonomy;
  }

  const seedData = await request({
    url: graphqlUrl,
    variables: {
      id: uriRes?.nodeByUri?.id,
    },
    document: gql`
      query contentNodeSeedQueryId($id: ID!) {
        node(id: $id) {
          id

          __typename # this will be ContentType if its an archive
          ... on ContentNode {
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

          ... on ContentType {
            # this is for archive pages
            name
            graphqlSingleName
            uri
          }
        }
      }
    `,
  });

  return seedData?.node;
}
