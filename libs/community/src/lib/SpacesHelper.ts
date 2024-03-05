import { spaceManagementAPI } from "@platformx/authoring-apis";
import { ShowToastError } from "@platformx/utilities";

export const getSpacesList = async (searchTerms: any) => {
  const { start = 0, searchTerm = "" } = searchTerms;
  try {
    const response: any = await spaceManagementAPI.fetchSpaces({
      start: start,
      rows: 20,
      searchTerm: searchTerm,
    });
    if (response?.authoring_getExoSpaceList && response?.authoring_getExoSpaceList.length >= 0) {
      const spaceListResponse = response?.authoring_getExoSpaceList || [];
      return spaceListResponse;
    }
  } catch (err: any) {
    ShowToastError(
      err?.graphQLErrors[0]?.message ||
        err?.networkError?.result?.errors[0]?.message ||
        err?.message ||
        "",
    );
  }
};

/**
 * space id based get full details api call
 * @param id string
 * @returns object
 */
export const getSpacesDetailsBasedId = (id: string) => {
  try {
    return spaceManagementAPI.getSpaceBasedId(id);
  } catch (err: any) {
    return err;
  }
};

export const getSpaceMembersList = async (id: string) => {
  try {
    const response: any = await spaceManagementAPI.getSpaceMembers({
      spaceId: id,
    });
    if (
      response?.authoring_getExoSpaceMembers &&
      Object.keys(response?.authoring_getExoSpaceMembers).length >= 0
    ) {
      const spaceListResponse = response?.authoring_getExoSpaceMembers || {};
      return spaceListResponse;
    }
  } catch (err: any) {
    if (err) {
      throw err;
    }
  }
};
export const getAllExoMembersList = async () => {
  try {
    const response: any = await spaceManagementAPI.getAllExoMembers();
    if (
      response?.authoring_getExoContentList &&
      response?.authoring_getExoContentList.length >= 0
    ) {
      const allExoMemberResponse = response?.authoring_getExoContentList || [];
      return allExoMemberResponse;
    }
  } catch (err: any) {
    if (err) {
      throw err;
    }
  }
};
// array2 have some users, this method filters the array1 which don't have the users which are in array2
export const filterArrayValues = (array1: any[] = [], array2: any[] = []) => {
  const usernamesInArray2 = array2.map((item) => item?.user_name);
  return array1.filter((item) => !usernamesInArray2.includes(item?.user_name));
};
// array2 have some users, this method filters the array1 which have the users which are in array2
export const filterArrayValueswithSameKey = (array1: any[] = [], array2: any[] = []) => {
  const usernamesInArray2 = array2.map((item) => item?.user_name);
  return array1.filter((item) => usernamesInArray2.includes(item?.user_name));
};

export const formatInvitedMenbers = (array: any[] = []) => {
  return array.map((item: any) => {
    return {
      id: `organization:${item.user_name}`,
      remoteId: item.user_name,
      providerId: "organization",
    };
  });
};

export const formatCancleMembers = (array: any[] = [], spaceName = "") => {
  return array.map((item: any) => {
    return {
      space: spaceName,
      user: item.user_name,
      status: "IGNORED",
    };
  });
};

export const formatRemoveMembers = (array: any[] = [], spaceName = "") => {
  return array.map((item: any) => {
    return { space: spaceName, member: item.user_name };
  });
};
