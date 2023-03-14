import { gql, request } from "graphql-request";

const queryDocument = gql`
  query getAllContentNodePathsQuery {
    contentNodes {
      nodes {
        uri
      }
    }
  }
`;

const getAllContentNodePaths = async ({ url }: { url?: string }) => {
  if (!process.env.NEXT_PUBLIC_WPGRAPHQL_URL && !url) {
    throw new Error("Missing WP_URL environment variable");
  }

  const res = await request({
    url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
    document: queryDocument,
  });
  // @ts-expect-error
  const typeSlugs = res?.contentNodes?.nodes;

  return typeSlugs;
};

export default getAllContentNodePaths;
