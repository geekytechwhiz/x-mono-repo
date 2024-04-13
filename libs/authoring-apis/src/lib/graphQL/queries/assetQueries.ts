import { gql } from "@apollo/client";

export const FETCH_COMMUNITY_COLLECTION = gql`
  query FETCH_COMMUNITY_COLLECTION($uuid: String!, $start: Int!, $rows: Int!, $search: String!) {
    authoring_getAssets(
      assetType: COLLECTIONS
      uuid: $uuid
      pagination: { start: $start, rows: $rows }
      filter: { search: $search }
    )
  }
`;

export const FETCH_ASSETS = gql`
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
      filter: { search: $search }
    )

    collectionItems: authoring_getAssets(
      assetType: ASSETS
      uuid: $uuid2
      pagination: { start: $start, rows: $rows }
      filter: { search: $search }
    )
  }
`;

export const FETCH_COLLECTION_ITEM = gql`
  query FETCH_COLLECTION_ITEM(
    $uuid: String!
    $start: Int!
    $rows: Int!
    $search: String!
    $entityType: authoring_EntityType!
  ) {
    authoring_getAssets(
      assetType: ASSETS
      uuid: $uuid
      entityType: $entityType
      pagination: { start: $start, rows: $rows }
      filter: { search: $search }
    )
  }
`;

export const FETCH_CONTENT = gql`
  query FETCH_CONTENT(
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
      filter: { search: $search, tags: $tags }
    )
  }
`;

export const CREATE_COLLECTION = gql`
  mutation authoring_createAssets(
    $input: authoring_createAssetInfo!
    $entityType: authoring_EntityType!
  ) {
    authoring_createAssets(assetType: COLLECTIONS, input: $input, entityType: $entityType) {
      message
      id
      name
    }
  }
`;

export const CREATE_COMMUNITY = gql`
  mutation createAssets($input: authoring_createAssetInfo!) {
    authoring_createAssets(assetType: COMMUNITIES, input: $input) {
      message
      id
      name
    }
  }
`;

// export const CREATE_COMMUNITY_COLLECTION = gql `
//   mutation createAssets($input: authoring_createAssetInfo! $entityType: authoring_EntityType!) {
//     community:  authoring_createAssets(assetType: COMMUNITIES, input: $input) {
//       message
//       id
//       name
//     }

//     collection:  authoring_createAssets(assetType: COLLECTIONS, input: $input, entityType: $entityType) {
//       message
//       id
//       name
//     }
//   }
// `;

export const GET_FACET = gql`
  query GET_FACET($scope_id: String!, $facet_name: String!) {
    authoring_getFacets(scope_id: $scope_id, facet_name: $facet_name)
  }
`;

// export const DELETE_COMMUNITY_COLLECTION = gql `
// mutation deleteAssets($uuid1: String!, $uuid2: String!) {
// community: authoring_deleteAssets(assetType: COMMUNITIES, uuid: $uuid1) {
//   message
//   id
// }
// collection: authoring_deleteAssets(assetType: COLLECTIONS, uuid: $uuid2) {
//   message
//   id
// }
// }
// `;

export const DELETE_COMMUNITY = gql`
  mutation deleteAssets($uuid1: String!) {
    community: authoring_deleteAssets(assetType: COMMUNITIES, uuid: $uuid1) {
      message
      id
    }
  }
`;

export const DELETE_ASSET = gql`
  mutation deleteAssets($uuid: String!) {
    asset: authoring_deleteAssets(assetType: ASSETS, uuid: $uuid) {
      message
      id
    }
  }
`;

export const PUBLISH_ASSET = gql`
  mutation PUBLISH_ASSET(
    $uuid: String!
    $status: String!
    $uploadId: String!
    $metadata: authoring_JSON!
  ) {
    authoring_depositAssetItem(
      workspaceId: [{ id: $uploadId }]
      metadata: $metadata
      status: $status
      collectionId: $uuid
    )
  }
`;
