/* eslint-disable no-unused-vars */
import { useQuery } from "@apollo/client";
import { ShowToastError } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { userGroupsQueries } from "../../graphQL/queries/userGroupsQueries";
import userGroupsApi from "../../services/userGroups/userGroups.api";
import { userGroupsProps, userGroupsResponse, userGroupsResult } from "./useUserGropus.types";

export const useUserGroupList = ({ startIndex }: userGroupsProps): userGroupsResult => {
  const ROW_SIZE = 10;
  const [contents, setContents] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const variables = {
    pagination: { start: startIndex, rows: ROW_SIZE },
  };

  const { error, data, fetchMore, refetch, loading } = useQuery(
    userGroupsQueries.GET_USER_GROUPS_LIST,
    {
      variables,
      fetchPolicy: "no-cache",
    },
  );

  const fetchMoreContent = async () => {
    try {
      const result: any = await fetchMore({
        variables: {
          ...variables,
          pagination: {
            start: contents.length,
            rows: ROW_SIZE,
          },
        },
      });

      const fetchMoreData = result.data?.authoring_getUserGroupList || [];
      const combinedData: any = [...contents, ...fetchMoreData];
      setContents(combinedData);
      if (result.data?.authoring_getUserGroupList?.length < 10) setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const refresh = async () => {
    await refetch(variables);
  };

  useEffect(() => {
    const groupsList = data?.authoring_getUserGroupList || [];
    if (groupsList?.length) {
      setContents(groupsList);
    }
    if (!loading && groupsList?.length < 10) {
      setIsLoading(false);
    }
  }, [data]);

  return {
    isLoading,
    error,
    fetchMore: fetchMoreContent,
    refetch: refresh,
    contents,
  };
};

export function useUserGroups() {
  const createUserGroup = async (props): Promise<userGroupsResponse> => {
    try {
      const response: any = await userGroupsApi.createUserGroups({
        input: props,
      });
      if (response?.data?.authoring_createUserGroup?.message === "Successfully created!!!") {
        return {
          success: true,
        };
      } else if (response?.error?.message === 'Unexpected error value: "NAME:ALREADY_EXISTS"') {
        ShowToastError("Group name already exists");
        return {
          success: false,
        };
      } else {
        ShowToastError("Something went wrong!!!");
        return {
          success: false,
        };
      }
    } catch (err) {
      ShowToastError("INTERNAL SERVER ERROR");
      return {
        success: false,
      };
    }
  };

  const updateUserGroup = async (props): Promise<userGroupsResponse> => {
    try {
      const response: any = await userGroupsApi.updateUserGroups({
        input: props,
      });
      if (response?.data?.authoring_updateUserGroup?.message === "Successfully updated!!!") {
        return {
          success: true,
        };
      } else {
        ShowToastError("Something went wrong!!!");
        return {
          success: false,
        };
      }
    } catch (err) {
      ShowToastError("INTERNAL SERVER ERROR");
      return {
        success: false,
      };
    }
  };

  return { createUserGroup, updateUserGroup };
}
