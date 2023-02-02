import { gql, request } from "graphql-request";

export default async function getPageData({
  name,
  uri,
}: {
  name: string;
  uri: string;
}) {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
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
        }
      }
    }
  `;

  const res = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,
    variables: {
      uri,
    },
    document: queryDocument,
  });

  return res?.[name];
}
