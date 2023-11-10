export const swapWpUrl = (url: string) => {
  const newUrl = url?.replace?.(
    process.env.NEXT_PUBLIC_WP_URL as string,
    process.env.NEXT_SITE_URL as string
  );

  return newUrl;
};
