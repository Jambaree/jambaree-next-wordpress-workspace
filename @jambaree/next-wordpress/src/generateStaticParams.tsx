import getAllContentNodePaths from "./getAllContentNodePaths";
export async function generateStaticParams() {
  const nodePaths = await getAllContentNodePaths({
    url: process.env.NEXT_PUBLIC_WPGRAPHQL_URL,
  });

  return nodePaths.map((node) => {
    // /soltions-and-products/product-1 will turn into -> ["soltions-and-products", "product-1"]
    const pathBreadcrumbs = node.uri.split("/").slice(1);

    // previously was /solutions%20and%20products/product-1
    const paths = [...(pathBreadcrumbs || "/")];

    return {
      paths,
    };
  });
}
