/**
 * Swap the WP URL for the site URL
 * Swapping with ENVs NEXT_PUBLIC_WP_URL for NEXT_SITE_URL
 */
export const swapWpUrl = (url: string) => {
  const newUrl = url.replace(
    process.env.NEXT_PUBLIC_WP_URL!,
    process.env.NEXT_SITE_URL!
  );

  return newUrl;
};
