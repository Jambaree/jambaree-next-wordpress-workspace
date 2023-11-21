export const swapWpUrl = (url: string) => {
  const newUrl = url.replace(
    process.env.NEXT_PUBLIC_WP_URL!,
    process.env.NEXT_SITE_URL!
  );

  return newUrl;
};
