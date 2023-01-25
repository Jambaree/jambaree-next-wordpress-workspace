import React from "react";

const YoastSEO = (props) => {
  const { seo, ogUrl } = props;

  const {
    title,
    metaDesc,
    opengraphTitle,
    opengraphDescription,
    opengraphImage,
    opengraphSiteName,
  } = seo || {};

  return (
    <>
      {title && <title>{title}</title>}

      {metaDesc && <meta name="description" content={metaDesc} />}

      <meta property="og:type" content="website" />

      {(!!opengraphDescription || !!metaDesc) && (
        <meta
          property="og:description"
          content={opengraphDescription || metaDesc}
        />
      )}

      {opengraphImage && (
        <meta property="og:image" content={opengraphImage.sourceUrl} />
      )}

      {opengraphSiteName && (
        <meta property="og:site_name" content={opengraphSiteName} />
      )}

      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {(opengraphTitle || title) && (
        <meta property="og:title" content={opengraphTitle || title} />
      )}

      <meta name="twitter:card" content="summary" />

      {opengraphImage && (
        <meta property="twitter:image" content={opengraphImage.sourceUrl} />
      )}

      {(opengraphTitle || title) && (
        <meta property="twitter:title" content={opengraphTitle || title} />
      )}
    </>
  );
};

export default YoastSEO;
