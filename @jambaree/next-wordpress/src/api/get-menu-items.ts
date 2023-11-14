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
  if (!process.env.WP_APPLICATION_PASSWORD) {
    throw new Error(`'WP_APPLICATION_PASSWORD' environment variable is required for function 'getMenuItems'. 
Check your ${
      process.env.NODE_ENV === "development"
        ? "local .env file"
        : "deployment's environment variables."
    }.

You can generate an application password in your WordPress admin under Users > Your Profile > Application Passwords. 
Make sure the user has the required permissions to view menus.

${
  process.env.NEXT_PUBLIC_WP_URL
    ? `See ${process.env.NEXT_PUBLIC_WP_URL}/wp-admin/profile.php#application-passwords-section`
    : ""
}

`);
  }

  // get menu by slug
  const menu = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/menus?slug=${slug}`,
    args
  ).then(async (res) => {
    try {
      const json = await res.json();
      return json?.[0];
    } catch (err) {
      throw new Error(`Error fetching menu with slug ${slug}: ${err.message}`);
    }
  });

  // get menu items by menu id
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/menu-items?menus=${menu.id}`,
    args
  );

  let data;
  try {
    data = await req.json();
  } catch (err) {
    throw new Error(
      `Error fetching menu items for menu id ${menu.id}: ${err.message}`
    );
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

/**
 * Structure menu items into a tree with childItems instead of a single shallow array that the REST API returns.
 */
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
