import { gql, request } from "graphql-request";

const queryDocument = gql`
  query ContentTypeQuery {
    contentNodes {
      nodes {
        uri
      }
    }
  }
`;

const getContentType = async () => {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
    throw new Error("Missing WP_URL environment variable");
  }

  const res = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,
    document: queryDocument,
  });

  const typeSlugs = res?.contentNodes?.nodes;

  return typeSlugs;
};

export default getContentType;
