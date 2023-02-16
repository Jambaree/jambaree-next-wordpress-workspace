import { gql, request } from "graphql-request";

interface UseMenuItemsProps {
  name?: string;
  url?: string;
}

const GET_MENU_ITEMS = gql`
  query getMenuItems($name: ID!) {
    menu(id: $name, idType: NAME) {
      id
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
`;

const useMenuItems = async ({ name, url }: UseMenuItemsProps) => {
  const data = await request({
    url: url || process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
    variables: {
      name,
    },

    document: GET_MENU_ITEMS,
  });

  const filteredMenuItems = data?.menu?.menuItems?.nodes?.filter((item) => {
    return item?.parentDatabaseId === 0;
  });

  return filteredMenuItems;
};

export default useMenuItems;
