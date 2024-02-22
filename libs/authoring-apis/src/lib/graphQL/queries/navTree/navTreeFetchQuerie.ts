import { gql } from "@apollo/client";

export const FETCH_MENU_LIST_ALL = gql`
  query FETCH_MENU_LIST_ALL($pagePath: String!) {
    authoring_getNavigation(pagePath: $pagePath)
  }
`;
