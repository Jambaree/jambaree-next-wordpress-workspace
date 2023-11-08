const args = {
  headers: {
    Authorization: `Basic ${btoa(
      process.env.WP_APPLICATION_PASSWORD as string
    )}`,
  },
};

export async function getMenuItems({ slug }: { slug: string }): Promise<
  {
    id: number;
    label: string;
    path: string;
    url: string;
  }[]
> {
  const menu = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/menus?slug=${slug}`,
    args
  ).then(async (res) => {
    const json = await res.json();

    return json?.[0];
  });

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/menu-items?menus=${menu.id}`,
    args
  );

  const data = await req.json();

  return data?.map?.((menuItem) => {
    return {
      ...menuItem,
      label: menuItem?.title?.rendered,
      path: menuItem.url.replace(process.env.NEXT_PUBLIC_WP_URL, ""),
    };
  });
}
