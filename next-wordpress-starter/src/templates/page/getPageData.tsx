import { gql, request } from "graphql-request";

const queryDocument = gql`
  query PageQuery($uri: ID!) {
    page(id: $uri, idType: URI) {
      __typename
      id
      title
      uri
      slug

      productBanner {
        button {
          title
          target
          url
        }
        headline
        image {
          sourceUrl
        }
      }
      template {
        ... on DefaultTemplate {
          acf {
            modules {
              __typename
              ... on DefaultTemplate_Acf_Modules_Banner {
                headline
                overlay
                image {
                  altText
                  sourceUrl
                }
                button {
                  url
                  title
                }
              }

              ... on DefaultTemplate_Acf_Modules_CallToAction {
                headline
                button {
                  url
                  title
                  target
                }
              }
              ... on DefaultTemplate_Acf_Modules_Downloads {
                headline
                subline
                enableCommonDownloads
                downloads {
                  title
                  downloadType
                  link {
                    title
                    target
                    url
                  }
                  # file {
                  #   url {
                  #     relativePath
                  #     publicURL
                  #   }
                  # }
                }
              }
              ... on DefaultTemplate_Acf_Modules_Hero {
                heroStyle
                heroTitle
                heroImage {
                  altText
                  sourceUrl
                }
              }
              ... on DefaultTemplate_Acf_Modules_InfoBox {
                headline
                subline
                images {
                  image {
                    altText
                    sourceUrl
                  }
                }
                button {
                  url
                  title
                }
              }

              ... on DefaultTemplate_Acf_Modules_Contact {
                contactHeadline
                contactSubline
                formId
                map {
                  lat
                  lng
                }
              }
              ... on DefaultTemplate_Acf_Modules_TextImage {
                fieldGroupName
                elements {
                  subline
                  alignImage
                  button {
                    title
                    target
                    url
                  }
                  headline
                  image {
                    sourceUrl
                    altText
                  }
                }
              }

              ... on DefaultTemplate_Acf_Modules_Retailers {
                headline
                retailers {
                  name
                  addressLine1
                  addressLine2
                  link {
                    url
                  }
                  phoneNumber
                  logo {
                    altText
                    sourceUrl
                  }
                  products {
                    productName
                  }
                }
              }

              ... on DefaultTemplate_Acf_Modules_Tiles {
                tiles {
                  link {
                    title
                    url
                  }
                  image {
                    sourceUrl
                    altText
                  }
                }
              }
              ... on DefaultTemplate_Acf_Modules_TwoColumnText {
                headline
                column1
                column2
              }
              ... on DefaultTemplate_Acf_Modules_Wysiwyg {
                content
              }
            }
          }
        }
      }
    }
  }
`;

export default async function getPageData({ uri }: { uri: string }) {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
    throw new Error("Missing WP_URL environment variable");
  }

  const res = await request({
    url: process.env.NEXT_PUBLIC_WP_URL,
    variables: {
      uri,
    },
    document: queryDocument,
    requestHeaders: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WP_URL}`,
    },
  });

  const page = res?.page;
  return page;
}
