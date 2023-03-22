import type { Metadata } from "next";
import { gql, request } from "graphql-request";

import getSeedData from "./getSeedData";

export async function generateMetadata({
  params,
  searchParams,
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
        seo: Seo;
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

    // console.log(res.contentNode);

    return formatSeo(res.contentNode.seo);
  }

  if (seedData?.__typename === "ContentType") {
    // const res: {
    //   contentNode: {
    //     seo: Seo;
    //   };
    // } = await request({
    //   url: graphqlUrl,
    //   document: gql`
    //     query yoastSeo($uri: ID!) {
    //       seo(id: $uri, idType: URI) {
    //         contentTypes {
    //           ${seedData?.graphqlSingleName} {
    //             title
    //             archive {
    //               fullHead
    //             }
    //           }
    //         }
    //       }
    //     }
    //   `,
    //   variables: {
    //     uri,
    //   },
    // });
    // console.log(res.contentNode);
    // return formatSeo(res.contentNode.seo);
  }

  // if (!nodeType) return {};

  // const res: {
  //   seo: Seo;
  // } = await request({
  //   url: graphqlUrl,
  //   document: gql`
  //   query yoastSeo($uri: ID!) {
  //     ${nodeType}(id: $uri, idType: URI) {
  //       __typename
  //       ${seoString}
  //     }
  //   }
  // `,
  //   variables: {
  //     uri,
  //   },
  // });

  // const yoastData = res?.[nodeType];

  // return {
  //   title: yoastData?.seo?.title,
  //   description: yoastData?.seo?.metaDesc,
  //   openGraph: {
  //     title: yoastData?.seo?.opengraphTitle,
  //     description: yoastData?.seo?.opengraphDescription,
  //     siteName: yoastData?.seo?.opengraphSiteName,
  //     url: yoastData?.seo?.opengraphUrl,
  //     type: yoastData?.seo?.opengraphType,
  //     publishedTime: yoastData?.seo?.opengraphPublishedTime,
  //     authors: [yoastData?.seo?.opengraphAuthor],
  //     images: [
  //       yoastData?.seo?.opengraphImage?.sourceUrl ||
  //         "https://yoast.com/app/uploads/2013/02/Yoast_Logo_Large_RGB-250x115.png",
  //     ],
  //     locale: "en-US",
  //   },
  //   viewport: {
  //     width: "device-width",
  //     initialScale: 1,
  //     maximumScale: 5,
  //   },
  //   twitter: {
  //     card: yoastData?.seo?.twitterImage?.sourceUrl,
  //     title: yoastData?.seo?.twitterTitle,
  //     description: yoastData?.seo?.twitterDescription,
  //     images: [
  //       yoastData?.seo?.twitterImage?.sourceUrl ||
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png",
  //     ],
  //   },
  // };
}

type Seo = {
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

const formatSeo = (seo): Metadata => {
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
      images: [
        seo?.opengraphImage?.sourceUrl ||
          "https://yoast.com/app/uploads/2013/02/Yoast_Logo_Large_RGB-250x115.png",
      ],
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
      images: [
        seo?.twitterImage?.sourceUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png",
      ],
    },
  };
};
