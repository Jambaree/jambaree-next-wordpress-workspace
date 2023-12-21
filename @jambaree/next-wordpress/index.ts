// nextjs app functions
export { generateMetadata } from "./src/next-app-functions/generate-meta-data";
export { generateStaticParams } from "./src/next-app-functions/generate-static-params";
export { generateSiteMap } from "./src/next-app-functions/generate-site-map";
export { revalidate } from "./src/next-app-functions/revalidate";

// draft mode preview route handler
export { NextWordPressPreview } from "./src/draft/draft-route-handler";

// rest api functions
export { getPageData } from "./src/api/page-data/get-page-data";
export { getMenuItems } from "./src/api/get-menu-items";
export { getSingleItem } from "./src/api/get-single-item";

// custom rest api functions implemented in jambaree-next-wp-plugin v2.1.0 (https://github.com/Jambaree/jambaree-next-wp-plugin)
export { getOptionsPage } from "./src/api/get-options-page";

// react components
export { FlexibleContent } from "./src/components/flexible-content";
export { WordpressTemplate } from "./src/components/wordpress-template/wordpress-template";

// utils helpers
export { getFeaturedImage } from "./src/utils/get-featured-image";
export { stripWpUrl } from "./src/utils/strip-wp-url";
export { swapWpUrl } from "./src/utils/swap-wp-url";

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
