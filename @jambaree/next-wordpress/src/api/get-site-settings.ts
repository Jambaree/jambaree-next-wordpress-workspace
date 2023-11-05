export async function getSiteSettings() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/settings`,
    {
      headers: {
        Authorization: `Basic ${btoa(
          process.env.WP_APPLICATION_PASSWORD as string
        )}`,
      },
    }
  );

  const data = await req.json();

  return data;
}
