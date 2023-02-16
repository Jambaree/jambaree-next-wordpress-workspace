import { gql, request } from "graphql-request";

const queryDocumentByUri = gql`
  query contentNodeSeedQueryUri($uri: String!) {
    nodeByUri(uri: $uri) {
      id
      uri
      isTermNode
      __typename
    }
  }
`;

const queryDocumentTaxonomyName = gql`
  query contentNodeSeedQueryUri($id: ID!) {
    taxonomy(id: $id, idType: NAME) {
      id
      __typename
      graphqlSingleName
      name
    }
  }
`;

const queryDocumentById = gql`
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
`;

export default async function getSeedData({
  uri,
  url,
}: {
  uri: string;
  url?: string;
}) {
  if (!process.env.NEXT_PUBLIC_WPGRAPHQL_URL && !url) {
    throw new Error("Missing WP_URL environment variable");
  }

  const uriRes = await request({
    url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL,
    variables: {
      uri,
    },
    document: queryDocumentByUri,
  });

  if (!uriRes?.nodeByUri?.id) {
    return null;
  }
  // must be a better way to do this instead of using the Typename of the taxonomy

  if (uriRes?.nodeByUri?.isTermNode) {
    const filterTaxonomyUri = uri.split("/")[0];
    const taxonomyRes = await request({
      url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL,
      variables: {
        id: filterTaxonomyUri === "tag" ? "post_tag" : filterTaxonomyUri,
      },
      document: queryDocumentTaxonomyName,
    });
    return taxonomyRes?.taxonomy;
  }

  const idRes = await request({
    url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL,
    variables: {
      id: uriRes?.nodeByUri?.id,
    },
    document: queryDocumentById,
  });

  return idRes?.node;
}
