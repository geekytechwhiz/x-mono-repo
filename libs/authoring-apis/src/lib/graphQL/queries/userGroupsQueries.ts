/* eslint-disable template-tag-spacing */
import { gql } from "@apollo/client";

export const userGroupsQueries = {
  GET_USER_GROUPS_LIST: gql`
    query GET_USER_GROUPS_LIST($pagination: authoring_Paginate!) {
      authoring_getUserGroupList(pagination: $pagination) {
        id
        children
        label
        description
        tags
        groupName
        parentId
        name
      }
    }
  `,
};
