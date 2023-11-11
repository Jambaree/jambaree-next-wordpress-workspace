// nextjs app functions
export { generateMetadata } from "./src/next-app-functions/generate-meta-data";
export { generateStaticParams } from "./src/next-app-functions/generate-static-params";
export { generateSiteMap } from "./src/next-app-functions/generate-site-map";

// draft mode preview route handler
export { NextWordPressPreview } from "./src/draft/draft-route-handler";
// rest api functions
export { getPageData } from "./src/api/get-page-data";
export { getMenuItems } from "./src/api/get-menu-items";

// react components
export { FlexibleContent } from "./src/components/flexible-content";
export { WordpressTemplate } from "./src/components/wordpress-template";

// deprecated functions
export const getData = () => {
  throw new Error(
    "`getData` was replaced with `getPageData` in `@jambaree/next-wordpress@^2`. V2 has migrated to REST API instead of GraphQL for performance reasons."
  );
};
export const getSeedData = () => {
  throw new Error(
    "`getSeedData` was removed in `@jambaree/next-wordpress@^2`. V2 has migrated to REST API instead of GraphQL for performance reasons."
  );
};
