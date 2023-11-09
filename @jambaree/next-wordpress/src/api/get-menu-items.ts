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

  let data;
  try {
    data = await req.json();
  } catch (err) {
    throw new Error(`Error fetching menu items: ${err.message}`);
  }

  const flatMenu = data?.map?.((menuItem) => {
    return {
      ...menuItem,
      label: menuItem?.title?.rendered,
      path: menuItem.url.replace(process.env.NEXT_PUBLIC_WP_URL, ""),
    };
  });

  return structureMenuItems(flatMenu);
}

function structureMenuItems(menuItems) {
  // Create a map for easy lookup of child items
  const itemsById = new Map(
    menuItems.map((item) => [item.id, { ...item, childItems: [] }])
  );

  // The final structured menu items
  const structuredItems = [];

  // Iterate over the menu items to structure them
  for (const item of menuItems) {
    const structuredItem = itemsById.get(item.id);

    if (item.parent === 0) {
      // This is a top-level menu item
      structuredItems.push(structuredItem);
    } else {
      // This item is a child of another item
      const parentItem = itemsById.get(item.parent);
      if (parentItem) {
        parentItem.childItems.push(structuredItem);
      }
    }
  }

  return structuredItems;
}
