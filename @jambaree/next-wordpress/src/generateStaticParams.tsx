import getAllContentNodePaths from "./getAllContentNodePaths";
export async function generateStaticParams() {
  const nodePaths = await getAllContentNodePaths();

  return nodePaths.map((node) => {
    const beginningUri = node.uri.split("/").slice(1);

    return {
      paths: [...(beginningUri || "/")],
    };
  });
}
