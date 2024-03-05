import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import { ApiResponse } from "../utils/common.types";
import { SpaceQueries } from "../../graphQL/queries/spaceQueries";

export const spaceManagementAPI = {
  fetchSpaces: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: SpaceQueries.FETCH_SPACE_LIST,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.error(err.graphQLErrors);
      throw err;
    }
  },

  getSpaceBasedId: async <T>(id: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: SpaceQueries.FETCH_SPACE_DETAILS_BY_ID,
        variables: { id },
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.error(err.graphQLErrors);
      throw err;
    }
  },

  getMembersToInvite: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: SpaceQueries.FETCH_MEMBERS_TO_INVITE,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.error(err.graphQLErrors);
      throw err;
    }
  },

  getSpaceMembers: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: SpaceQueries.FETCH_SPACE_MEMBERS,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.error(err.graphQLErrors);
      throw err;
    }
  },

  getAllExoMembers: async <T>(): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: SpaceQueries.FETCH_ALL_EXO_MEMBERS,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.error(err.graphQLErrors);
      throw err;
    }
  },
};
