import { getSeparator } from "./yoast/separators";
import type { Metadata } from "next";
import { gql, request } from "graphql-request";

import getSeedData from "./getSeedData";
import toCamel from "./utils/toCamel";
import type { Seperator } from "./yoast/separators";

export async function generateMetadata({
  params,
  // searchParams,
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
}): Promise<Metadata> {
  if (!graphqlUrl) {
    throw new Error(
      "No graphqlUrl provided. Please set NEXT_PUBLIC_WPGRAPHQL_URL env or pass graphqlUrl to generateMetadata"
    );
  }

  const uri = params?.paths?.join?.("/") || "/";
  const seedData = await getSeedData({ uri });

  if (seedData?.isContentNode) {
    const res: {
      contentNode: {
        seo: {
          title: string;
          metaDesc: string;
          opengraphTitle: string;
          opengraphDescription: string;
          opengraphImage: {
            sourceUrl: string;
          };
          opengraphSiteName: string;
          opengraphUrl: string;
          opengraphType: string;
          opengraphPublishedTime: string;
          twitterDescription: string;
          twitterTitle: string;
          twitterImage: {
            sourceUrl: string;
          };
          opengraphAuthor: string;
        };
      };
    } = await request({
      url: graphqlUrl,
      document: gql`
        query yoastSeo($uri: ID!) {
          contentNode(id: $uri, idType: URI) {
            __typename
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
              opengraphImage {
                sourceUrl
              }
              opengraphSiteName
              opengraphUrl
              opengraphType
              opengraphPublishedTime
              twitterDescription
              twitterTitle
              twitterImage {
                sourceUrl
              }
              opengraphAuthor
            }
          }
        }
      `,
      variables: {
        uri,
      },
    });

    const seo = res?.contentNode?.seo;

    return {
      title: seo?.title,
      description: seo?.metaDesc,
      openGraph: {
        title: seo?.opengraphTitle,
        description: seo?.opengraphDescription,
        siteName: seo?.opengraphSiteName,
        url: seo?.opengraphUrl,
        type: seo?.opengraphType,
        publishedTime: seo?.opengraphPublishedTime,
        authors: [seo?.opengraphAuthor],
        images: seo?.opengraphImage?.sourceUrl
          ? [seo?.opengraphImage?.sourceUrl]
          : undefined,
        locale: "en-US",
      },
      viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 5,
      },
      twitter: {
        card: seo?.twitterImage?.sourceUrl,
        title: seo?.twitterTitle,
        description: seo?.twitterDescription,
        images: seo?.twitterImage?.sourceUrl
          ? [seo?.twitterImage?.sourceUrl]
          : undefined,
      },
    } as Metadata;
  }

  if (seedData?.__typename === "ContentType") {
    const res: {
      generalSettings: {
        title: string;
      };
      seo: {
        openGraph: {
          frontPage: {
            title: string;
          };
          defaultImage: {
            uri: string;
          };
        };
        contentTypes: {
          [key: string]: {
            archive: {
              title: string;
              metaDesc: string;
              archiveLink: string;
            };
            title: string;
          };
        };
      };
    } = await request({
      url: graphqlUrl,
      document: gql`
        {
          generalSettings {
            title
          }
          seo {
            openGraph {
               frontPage {
                 title
               }
               defaultImage {
                  uri
               }
            }
            contentTypes {
              ${toCamel(seedData?.graphqlSingleName)} {
                archive {
                  title
                  metaDesc
                  archiveLink
                }
                title
              }
            }
          }
        }
      `,
      variables: {
        uri,
      },
    });

    const seo = res?.seo?.contentTypes?.[toCamel(seedData?.graphqlSingleName)];

    // * This is to handle the weird behavior for the default post type title defaulting to the site title
    let archiveTitle = seo?.archive?.title;
    if (
      archiveTitle === res?.generalSettings?.title &&
      seedData?.graphqlSingleName === "post"
    ) {
      archiveTitle = `Blog Archive ${seo?.title}`;
    }

    return {
      title: archiveTitle,
      description: seo?.archive?.metaDesc,
      openGraph: {
        title: archiveTitle,
        description: seo?.archive?.metaDesc,
        siteName: res?.seo?.openGraph?.frontPage?.title,
        images: res?.seo?.openGraph?.defaultImage?.uri
          ? [res?.seo?.openGraph?.defaultImage?.uri]
          : undefined,
        locale: "en-US",
      },
      viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 5,
      },
    } as Metadata;
  }

  if (seedData?.isTermNode) {
    const res: {
      generalSettings: {
        title: string;
      };
      seo: {
        meta: {
          config: {
            separator: Seperator["value"];
          };
        };
      };
    } = await request({
      url: graphqlUrl,
      document: gql`
        {
          generalSettings {
            title
          }
          seo {
            meta {
              config {
                separator
              }
            }
          }
        }
      `,
    });

    const seperator = getSeparator(
      res?.seo?.meta?.config?.separator || "sc-dash"
    );

    return {
      title: `${seedData?.name} ${seperator} ${res?.generalSettings?.title}`,
    };
  }
}
