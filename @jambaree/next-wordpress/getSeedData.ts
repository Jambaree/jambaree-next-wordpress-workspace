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
        contentType {
          node {
            uri
            graphqlSingleName
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          opengraphSiteName
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

export default async function getSeedData({ uri }: { uri: string }) {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
    throw new Error("Missing WP_URL environment variable");
  }

  const uriRes = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,
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
    const taxonomyRes = await request({
      url: process.env.NEXT_PUBLIC_WP_URL,
      variables: {
        id:
          uriRes?.nodeByUri?.__typename.toLowerCase() === "tag"
            ? "post_tag"
            : uriRes?.nodeByUri?.__typename.toLowerCase(),
      },
      document: queryDocumentTaxonomyName,
    });
    return taxonomyRes?.taxonomy;
  }

  const idRes = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,
    variables: {
      id: uriRes?.nodeByUri?.id,
    },
    document: queryDocumentById,
  });

  return idRes?.node;
}
