import { gql } from "@apollo/client";

export const SpaceQueries = {
  FETCH_SPACE_LIST: gql`
    query FETCH_SPACE_LIST($start: Int!, $rows: Int!, $searchTerm: String!) {
      authoring_getExoSpaceList(
        filter: all
        expand: "members"
        searchTerm: $searchTerm
        pagination: { start: $start, rows: $rows }
      )
    }
  `,

  FETCH_SPACE_DETAILS_BY_ID: gql`
    query FETCH_SPACE_DETAILS_BY_ID($id: String!) {
      authoring_getExoContentList(
        spaceId: $id
        pagination: { start: 0, rows: 1 }
        searchTerm: ""
        role: "member"
        type: SPACE
        filter: single
      )
    }
  `,
  FETCH_MEMBERS_TO_INVITE: gql`
    query FETCH_MEMBERS_TO_INVITE(
      $searchTerm: String!
      $currentUser: String!
      $spaceIdentifier: String!
    ) {
      authoring_searchExoMemberToInvite(
        searchTerm: $searchTerm
        currentUser: $currentUser
        spaceIdentifier: $spaceIdentifier
      )
    }
  `,

  FETCH_ALL_EXO_MEMBERS: gql`
    query {
      authoring_getExoContentList(
        pagination: { start: 0, rows: 5000 }
        searchTerm: ""
        role: "member"
        type: USER
        filter: all
      )
    }
  `,

  FETCH_SPACE_MEMBERS: gql`
    query FETCH_SPACE_MEMBERS($spaceId: String!) {
      authoring_getExoSpaceMembers(pagination: { start: 0, rows: 1 }, spaceId: $spaceId)
    }
  `,
};
