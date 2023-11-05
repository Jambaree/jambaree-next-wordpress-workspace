export async function getPostTypes() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/types`
  );

  const data = await req.json();

  return data;
}
