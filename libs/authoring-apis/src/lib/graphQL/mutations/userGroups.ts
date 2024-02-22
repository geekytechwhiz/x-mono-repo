import { gql } from "@apollo/client";

export const userGroups = {
  CREATE_USER_GROUP: gql`
    mutation ($input: authoring_UserGroupInput) {
      authoring_createUserGroup(template: "communication", input: $input) {
        name
        message
      }
    }
  `,
};
