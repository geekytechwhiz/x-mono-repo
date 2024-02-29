/* eslint-disable no-useless-catch */
import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import {
  CREATE_COLLECTION,
  CREATE_COMMUNITY,
  FETCH_ASSETS,
  FETCH_COMMUNITY_COLLECTION,
  FETCH_CONTENT,
  GET_FACET,
} from "../../graphQL/queries/assetQueries";

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
      if (err instanceof ApolloError) throw err;
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
      if (err instanceof ApolloError) throw err;
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
      if (err instanceof ApolloError) throw err;
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
      if (err instanceof ApolloError) throw err;
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
      if (err instanceof ApolloError) throw err;
    }
  },
};

export default assetsApi;
