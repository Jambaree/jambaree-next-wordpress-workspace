import { getData } from "@jambaree/next-wordpress";

export default async function DefaultPageTemplate({ uri }) {
  const { page } = await getData({ uri, query });
  return (
    <>
      <h1>Default Page Template for {page?.title}</h1>
    </>
  );
}
const query = `
  query PageQuery($uri: ID!) {
    page(id: $uri, idType: URI) {
      __typename
      id
      title
      uri
      slug
    }
  }`;
