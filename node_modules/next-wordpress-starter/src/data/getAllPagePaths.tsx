import { gql, request } from "graphql-request";

const queryDocument = gql`
  query PageQuery {
    pages {
      nodes {
        slug
      }
    }
  }
`;

const getAllPagePaths = async () => {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
    throw new Error("Missing WP_URL environment variable");
  }

  const res = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,

    document: queryDocument,

    requestHeaders: {
      Authorization: `Bearer ${process.env.WP_URL}`,
    },
  });

  const pages: { nodes: { slug: string } }[] = res?.pages?.nodes;

  return pages;
};

export default getAllPagePaths;
