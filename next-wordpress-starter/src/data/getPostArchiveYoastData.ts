import { gql, request } from "graphql-request";

const queryDocument = gql`
  query PostYoastQuery {
    seo {
      contentTypes {
        post {
          archive {
            metaRobotsNoindex
            metaRobotsNofollow
            metaRobotsIndex
            metaRobotsFollow
            metaDesc
            hasArchive
            fullHead
            breadcrumbTitle
            archiveLink
            title
          }
        }
      }
    }
  }
`;

export default async function getPostArchiveYoastData() {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
    throw new Error("Missing WP_URL environment variable");
  }

  const res = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,

    document: queryDocument,
    requestHeaders: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WP_URL}`,
    },
  });

  const seoData = res?.seo?.contentTypes?.post?.archive;

  return seoData;
}
