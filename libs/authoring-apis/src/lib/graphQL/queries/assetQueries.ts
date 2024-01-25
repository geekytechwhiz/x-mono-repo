import { gql } from "@apollo/client";

export const FETCH_COMMUNITY_COLLECTION = gql `
  query FETCH_ASSETS($uuid: String!, $start: Int!, $rows: Int!, $search: String!) {
    authoring_getAssets(
      assetType: COLLECTIONS
      uuid: $uuid
      pagination: { start: $start, rows: $rows }
      search: $search
    )
  }
`;

export const FETCH_ASSETS = gql `
  query FETCH_ASSETS(
    $uuid1: String!
    $uuid2: String!
    $start: Int!
    $rows: Int!
    $search: String!
  ) {
    community: authoring_getAssets(
      assetType: COLLECTIONS
      uuid: $uuid1
      pagination: { start: $start, rows: $rows }
      search: $search
    )

    collectionItems: authoring_getAssets(
      assetType: ASSETS
      uuid: $uuid2
      pagination: { start: $start, rows: $rows }
      search: $search
    )
  }
`;

export const FETCH_COLLECTION_ITEM = gql `
  query FETCH_ASSETS($uuid: String!, $start: Int!, $rows: Int!, $search: String!) {
    authoring_getAssets(
      assetType: ASSETS
      uuid: $uuid
      pagination: { start: $start, rows: $rows }
      search: $search
    )
  }
`;

export const FETCH_CONTENT = gql `
  query FETCH_ASSETS(
    $assetType: authoring_ASSET_TYPE!
    $uuid: String!
    $entityType: authoring_EntityType!
    $start: Int!
    $rows: Int!
    $search: String!
    $tags: authoring_JSON!
  ) {
    authoring_getAssets(
      assetType: $assetType
      entityType: $entityType
      uuid: $uuid
      pagination: { start: $start, rows: $rows }
      filter: {
        search: $search
        tags: $tags
      }
    )
  }
`;

export const CREATE_COLLECTION = gql `
  mutation authoring_createAssets(
    $input: authoring_createAssetInfo!
    $entityType: authoring_EntityTye!
  ) {
    authoring_createAssets(assetType: COLLECTIONS, input: $input, entityType: $entityType) {
      message
      id
      name
    }
  }
`;

export const CREATE_COMMUNITY = gql `
  mutation createAssets($input: authoring_createAssetInfo!) {
    authoring_createAssets(assetType: COMMUNITIES, input: $input) {
      message
      id
      name
    }
  }
`;

export const GET_FACET = gql `
query GET_FACET($scope_id: String!, $facet_name: String!) {
  authoring_getFacets(
    scope_id: $scope_id
    facet_name:$facet_name
  )
}
`;