import { getData } from "@jambaree/next-wordpress";

export default async function DefaultPageTemplate({
  uri,
  isPreview,
  searchParams,
}) {
  const data = await getData({
    variables: { id: uri, idType: "URI" },
    query,
    isPreview,
    searchParams,
  });

  return (
    <>
      <h1>Default Page Template for {data?.page?.title}</h1>
      <div>
        <pre>
          <code>{JSON.stringify({ data }, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}
const query = /* GraphQL */ `
  query PageQuery($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      __typename
      id
      title
      uri
      slug
    }
  }
`;
