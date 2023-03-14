import { notFound } from "next/navigation";
import { gql, request } from "graphql-request";

export default async function WordpressPreview(props) {
  console.log(props);

  const key = props?.searchParams?.key;
  const pagePath = props?.searchParams?.slug;
  const revisionId = props?.searchParams?.revision_id;

  if (!key || !pagePath || !revisionId) {
    notFound();
  }

  const previewSeedData = await getPreviewSeedData({ revisionId, key });

  return (
    <div>
      <h1>Preview</h1>
      <div>key: {key}</div>
      <div>pagePath: {pagePath}</div>
      <div>revisionId: {revisionId}</div>

      <pre>
        <code>{JSON.stringify(previewSeedData, null, 2)}</code>
      </pre>
    </div>
  );
}

const getPreviewSeedData = async ({ revisionId, key }) => {
  console.log("getPreviewSeedData", { key });
  try {
    const res = await request({
      url: process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
      document: gql`
        query PreviewQuery($id: ID!) {
          contentNode(id: $id, idType: DATABASE_ID) {
            __typename
            template {
              templateName
              __typename
            }
            contentTypeName
            contentType {
              node {
                uri
                graphqlSingleName
              }
            }
          }
        }
      `,
      variables: {
        id: revisionId,
      },
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
