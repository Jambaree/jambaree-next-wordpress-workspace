import { FlexibleContent, getData } from "@jambaree/next-wordpress";

import * as blocks from "../../components/blocks";

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
    <FlexibleContent
      rows={data?.page?.template?.acf?.modules}
      blocks={blocks}
    />
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
      template {
        ... on DefaultTemplate {
          acf {
            modules {
              __typename
              ... on DefaultTemplate_Acf_Modules_Hero {
                headline
                subline
                links {
                  link {
                    target
                    title
                    url
                  }
                  variant
                }
                image {
                  altText
                  sourceUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              ... on DefaultTemplate_Acf_Modules_Textarea {
                text
              }
            }
          }
        }
      }
    }
  }
`;
