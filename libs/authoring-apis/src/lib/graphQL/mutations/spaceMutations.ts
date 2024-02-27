import { gql } from "@apollo/client";

export const CREATE_SPACE = gql`
  mutation authoring_createSpace($input: authoring_ExoSpaceInput, $template: String!) {
    authoring_createSpace(input: $input, template: $template)
  }
`;
export const UPDATE_SPACE = gql`
  mutation authoring_updateSpace(
    $input: authoring_ExoSpaceInput
    $template: String!
    $id: String!
  ) {
    authoring_updateSpace(input: $input, template: $template, id: $id)
  }
`;
export const DELETE_SPACE = gql`
  mutation authoring_deleteSpace($id: String!) {
    authoring_deleteSpace(spaceId: $id) {
      message
      __typename
    }
  }
`;
export const JOIN_SPACE = gql`
  mutation authoring_joinSpace($id: String!) {
    authoring_joinSpace(spaceId: $id) {
      message
      __typename
    }
  }
`;
export const LEAVE_SPACE = gql`
  mutation authoring_leaveSpace($id: String!) {
    authoring_leaveSpace(spaceId: $id) {
      message
      __typename
    }
  }
`;

export const INVITE_MEMBERS_TO_SPACE = gql`
  mutation authoring_updateMemberlistForSpace(
    $spaceId: String!
    $removeMembers: [authoring_JSON]!
    $inviteMembers: [authoring_JSON]!
    $cancelMembers: [authoring_JSON]!
  ) {
    authoring_updateMemberlistForSpace(
      removeMember: $removeMembers
      invite_members: $inviteMembers
      cancelMember: $cancelMembers
      spaceId: $spaceId
    )
  }
`;
