import { gql, request } from "graphql-request";

type MenuItemsArgs = {
  /**
   * The name of the menu to retrieve.
   * @example "primary"
   * @example "secondary"
   * @example "footer"
   */
  name?: string;
  /**
   * The URL of the WordPress GraphQL endpoint. Defaults to the value of the NEXT_PUBLIC_WPGRAPHQL_URL environment variable.
   */
  graphqlUrl?: string;
};

type Menu = {
  id: string;
  slug: string;
  locations: string[];
  menuItems: {
    nodes: {
      path: string;
      url: string;
      label: string;
      target: string;
      parentDatabaseId: number;
      cssClasses: string;
      childItems: {
        nodes: {
          id: string;
          label: string;
          url: string;
          childItems: {
            nodes: {
              id: string;
              label: string;
              url: string;
            }[];
          };
        }[];
      };
    }[];
  };
};

export const getMenuItems = async ({
  name,
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
}: MenuItemsArgs) => {
  const data: {
    menu: Menu;
  } = await request({
    url: graphqlUrl,
    document: gql`
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
    `,

    variables: {
      name,
    },
  });

  const menuItems = data?.menu?.menuItems?.nodes?.filter((item) => {
    return item?.parentDatabaseId === 0;
  });

  return menuItems;
};

export default getMenuItems;
