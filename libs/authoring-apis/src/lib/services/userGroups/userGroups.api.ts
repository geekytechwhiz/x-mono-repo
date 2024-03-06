import graphqlInstance from "../../config/graphqlConfig";
import { userGroupsMutations } from "../../graphQL/mutations/userGroupsMutations";
import { userGroupsQueries } from "../../graphQL/queries/userGroupsQueries";
import { ApiResponse } from "../../utils/types";

const userGroupsApi = {
  createUserGroups: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data, errors } = await graphqlInstance.query({
        query: userGroupsMutations.CREATE_USER_GROUP,
        variables: input,
        fetchPolicy: "no-cache",
      });
      const errorMsg = (errors?.length && errors[0]?.message) || "";
      return { data, error: { message: errorMsg, status: 200 }, loading: false };
    } catch (err: any) {
      return err;
    }
  },
  getUserGroupsList: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: userGroupsQueries.GET_USER_GROUPS_LIST,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      return err;
    }
  },
  updateUserGroups: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data, errors } = await graphqlInstance.query({
        query: userGroupsMutations.UPDATE_USER_GROUP,
        variables: input,
        fetchPolicy: "no-cache",
      });
      const errorMsg = (errors?.length && errors[0]?.message) || "";
      return { data, error: { message: errorMsg, status: 200 }, loading: false };
    } catch (err: any) {
      return err;
    }
  },
};

export default userGroupsApi;
