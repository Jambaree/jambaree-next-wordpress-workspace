import { gql, request } from "graphql-request";

interface UseMenuItemsProps {
  location?: string;
  slug?: string;
}

const GET_MENU_ITEMS = gql`
  query getMenuItems {
    menus {
      nodes {
        slug
        locations
        menuItems {
          nodes {
            path
            url
            label
            target
            parentDatabaseId
            cssClasses
            childItems {
              nodes {
                id
                label
                url
                childItems {
                  nodes {
                    id
                    label
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const useMenuItems = async ({ location, slug }: UseMenuItemsProps) => {
  const data = await request({
    url:
      process.env.NEXT_PUBLIC_WP_URL ||
      "https://nextwordpress.wpengine.com/graphql",
    document: GET_MENU_ITEMS,
  });

  if (location) {
    const menu =
      data?.menus?.nodes &&
      data?.menus?.nodes.find((node) => node.locations.includes(location));

    const menuItems =
      menu?.menuItems?.nodes &&
      menu.menuItems.nodes.filter((item) => item.parentDatabaseId === 0);

    return menuItems;
  } else if (slug) {
    const menu = data.find((node) => node.slug === slug);

    const menuItems =
      menu?.menuItems?.nodes &&
      menu.menuItems.nodes.filter((item) => item.parentDatabaseId === 0);

    return menuItems;
  }
};

export default useMenuItems;
