import { gql, request } from "graphql-request";

type MenuItemsArgs = {
  id: string;

  idType?: "DATABASE_ID" | "ID" | "SLUG" | "LOCATION" | "NAME";

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
  id = "main-menu",
  idType = "NAME",
  graphqlUrl = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || "",
}: MenuItemsArgs) => {
  const data: {
    menu: Menu;
  } = await request({
    url: graphqlUrl,
    document: gql`
      query getMenuItems($id: ID!, $idType: MenuNodeIdTypeEnum!) {
        menu(id: $id, idType: $idType) {
          id
          slug

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
                  path
                  childItems {
                    nodes {
                      id
                      label
                      url
                      path
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
      id,
      idType,
    },
  });

  const menuItems = data?.menu?.menuItems?.nodes?.filter((item) => {
    return item?.parentDatabaseId === 0;
  });

  return menuItems;
};

export default getMenuItems;
