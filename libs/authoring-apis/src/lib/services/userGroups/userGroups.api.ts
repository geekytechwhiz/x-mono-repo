import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import { userGroups } from "../../graphQL/mutations/userGroups";
import { ApiResponse } from "../../utils/types";

const userGroupsApi = {
  createUserGroups: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: userGroups.CREATE_USER_GROUP,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) throw err;
      return err;
    }
  },
};
export default userGroupsApi;
