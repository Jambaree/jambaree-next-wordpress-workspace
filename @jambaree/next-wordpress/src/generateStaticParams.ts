import { gql, request } from "graphql-request";

export async function generateStaticParams({
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
  siteMap = false,
}: {
  /**
   * The URL of the GraphQL endpoint.
   * @default process.env.NEXT_PUBLIC_WPGRAPHQL_URL
   */
  graphqlUrl?: string;
  siteMap?: boolean;
}) {
  if (!graphqlUrl) {
    throw new Error(
      "generateStaticParams: No GraphQL URL provided. Please set `NEXT_PUBLIC_WPGRAPHQL_URL` environment variable or pass `graphqlUrl` to `generateStaticParams`."
    );
  }

  const res: {
    contentNodes: {
      nodes: {
        uri: string;
      }[];
    };
    contentTypes: {
      nodes: {
        uri: string;
      }[];
    };
  } = await request({
    url: graphqlUrl,
    document: gql`
      query ContentNodesQuery {
        contentNodes(first: 99) {
          nodes {
            uri
          }
        }
        contentTypes(first: 99) {
          nodes {
            uri
          }
        }
      }
    `,
  });

  //todo: paginated queries to get more than 10 or 100 nodes (need to recursively get all until none left)

  const nodes = res?.contentNodes?.nodes;
  const types = res?.contentTypes?.nodes;

  const allNodes = [...nodes, ...types];

  return allNodes.map((node) => {
    if (node.uri === null) {
      return;
    }
    if (siteMap) {
      return node.uri;
    }

    const pathBreadcrumbs = node.uri.split("/").slice(1);

    const paths = [...(pathBreadcrumbs || "/")];

    return {
      paths,
    };
  });
}
