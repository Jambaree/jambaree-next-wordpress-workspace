import { gql, request } from "graphql-request";

const queryDocument = gql`
  query PostsQuery {
    posts {
      nodes {
        title
        id
        uri
        slug
        status
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            slug
            uri
          }
        }
        date
        content
        author {
          node {
            email
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

export default async function getProductData() {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
    throw new Error("Missing WP_URL environment variable");
  }

  const res = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,

    document: queryDocument,
  });

  const post = res?.posts?.nodes;

  return post;
}
