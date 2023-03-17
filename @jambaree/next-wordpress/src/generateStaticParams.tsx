import { gql, request } from "graphql-request";

export async function generateStaticParams({
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
}: {
  /**
   * The URL of the GraphQL endpoint.
   * @default process.env.NEXT_PUBLIC_WPGRAPHQL_URL
   */
  graphqlUrl?: string;
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
  } = await request({
    url: graphqlUrl,
    document: gql`
      query ContentNodesQuery {
        contentNodes {
          nodes {
            uri
          }
        }
      }
    `,
  });

  const nodes = res?.contentNodes?.nodes;

  return nodes.map((node) => {
    const pathBreadcrumbs = node.uri.split("/").slice(1);

    const paths = [...(pathBreadcrumbs || "/")];

    return {
      paths,
    };
  });
}
