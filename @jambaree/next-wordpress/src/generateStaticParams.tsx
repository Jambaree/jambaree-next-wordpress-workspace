import getAllContentNodePaths from "./getAllContentNodePaths";
export async function generateStaticParams() {
  const nodePaths = await getAllContentNodePaths();

  return nodePaths.map((node) => {
    // /soltions-and-products/product-1 will turn into -> ["soltions-and-products", "product-1"]
    const pathBreadcrumbs = node.uri.split("/").slice(1);

    return {
      paths: [...(pathBreadcrumbs || "/")],
    };
  });
}
