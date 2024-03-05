/* eslint-disable template-tag-spacing */
import { gql } from "@apollo/client";

export const userGroupsMutations = {
  CREATE_USER_GROUP: gql`
    mutation ($input: authoring_UserGroupInput) {
      authoring_createUserGroup(template: "communication", input: $input) {
        name
        message
      }
    }
  `,
  UPDATE_USER_GROUP: gql`
    mutation ($input: authoring_UpdateUserGroupInput) {
      authoring_updateUserGroup(template: "communication", input: $input) {
        message
      }
    }
  `,
};
