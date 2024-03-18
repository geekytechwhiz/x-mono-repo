import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import { WorkflowQueries } from "../../graphQL/queries/workflowQueries";
import { ApiResponse } from "../../utils/types";

const workflowApi = {
  workflow_submission: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: WorkflowQueries.CONTENT_WORKFLOW_SUBMISSION,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  getWorkflowList: async <T>(input?: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: WorkflowQueries.GET_WORKFLOW_LISTING,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  updateWorkflowStatus: async <T>(input?: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: WorkflowQueries.UPDATE_WORKFLOW_STATUS,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },

  getUserAssignedTaskList: async <T>(input?: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: WorkflowQueries.GET_USER_ASSIGNED_TASK_LIST,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
  getWorkflowHistory: async <T>(input?: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: WorkflowQueries.GET_WORKFLOW_HISTORY,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) {
        /* Apollo errors */
      }
      throw err;
    }
  },
};
export default workflowApi;
