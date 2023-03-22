import { getData } from "@jambaree/next-wordpress";

export default async function DefaultMovieTemplate({
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
    <div>
      Movie uri: {uri}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

const query = /* GraphQL */ `
  query MovieQuery($id: ID!, $idType: MovieIdType) {
    movie(id: $id, idType: $idType) {
      __typename
      id
      title
      uri
      slug
    }
  }
`;
