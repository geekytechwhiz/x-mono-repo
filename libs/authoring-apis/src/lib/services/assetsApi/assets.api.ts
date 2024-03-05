/* eslint-disable no-console */
import graphqlInstance from "../../config/graphqlConfig";
import {
  CREATE_COLLECTION,
  CREATE_COMMUNITY,
  FETCH_ASSETS,
  FETCH_COMMUNITY_COLLECTION,
  FETCH_CONTENT,
  GET_FACET,
  FETCH_COLLECTION_ITEM,
  DELETE_COMMUNITY,
} from "../../graphQL/queries/assetQueries";
import { ApolloError } from "@apollo/client";

const assetsApi = {
  fetchCommunityCollection: async <T>(input: T, reload: boolean): Promise<any> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_COMMUNITY_COLLECTION,
        variables: input,
        fetchPolicy: reload ? "network-only" : "cache-first",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },

  fetchAssets: async <T>(input: T, reload: boolean): Promise<any> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_ASSETS,
        variables: input,
        fetchPolicy: reload ? "network-only" : "cache-first",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  deleteCommunity: async <T>(input: T): Promise<any> => {
    try {
      const { data } = await graphqlInstance.mutate({
        mutation: DELETE_COMMUNITY,
        variables: input,
      });
      return data;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  },

  createCollection: async <T>(input: T): Promise<any> => {
    try {
      const { data } = await graphqlInstance.mutate({
        mutation: CREATE_COLLECTION,
        variables: input,
        // fetchPolicy: '',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },

  createCommunity: async <T>(input: T): Promise<any> => {
    try {
      const { data } = await graphqlInstance.mutate({
        mutation: CREATE_COMMUNITY,
        variables: input,
        // fetchPolicy: '',
      });
      return data;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  },

  fetchDAMContent: async <T>(input: T): Promise<any> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_CONTENT,
        variables: input,
        //  fetchPolicy: 'network-only',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },

  fetchCollectionItem: async <T>(input: T, reload: boolean): Promise<any> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_COLLECTION_ITEM,
        variables: input,
        //fetchPolicy: reload ? 'network-only' : 'cache-first',
        fetchPolicy: "network-only",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },

  fetchFacet: async <T>(input: T): Promise<any> => {
    try {
      const { data } = await graphqlInstance.query({
        query: GET_FACET,
        variables: input,
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
};

export default assetsApi;
