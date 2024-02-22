import { ShowToastError } from "@platformx/utilities";
import userGroupsApi from "../../services/userGroups/userGroups.api";

interface userGroupsResponse {
  success: boolean;
}
function useUserGroups() {
  const createUserGroup = async (props): Promise<userGroupsResponse> => {
    try {
      const response: any = await userGroupsApi.createUserGroups({
        input: props,
      });
      if (response?.authoring_createUserGroup.message === "Successfully created!!!") {
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

  return { createUserGroup };
}

export default useUserGroups;
