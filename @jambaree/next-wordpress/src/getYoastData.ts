import { gql, request } from "graphql-request";

export default async function getYoastData({
  name,
  uri,
  url,
}: {
  name: string;
  uri: string;
  url?: string;
}) {
  if (!process.env.NEXT_PUBLIC_WPGRAPHQL_URL && !url) {
    throw new Error("Missing WP_URL environment variable");
  }

  const queryDocument = gql`
    query query($uri: ID!) {
      ${name}(id: $uri, idType: URI) {
        __typename
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          opengraphSiteName
          opengraphUrl
          opengraphType
          opengraphPublishedTime
          twitterDescription
          twitterTitle
          twitterImage {
            sourceUrl
          }
          opengraphAuthor
        }
      }
    }
  `;

  const res = await request({
    url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
    variables: {
      uri,
    },
    document: queryDocument,
  });

  return res?.[name];
}
