import { AxiosResponse } from "axios";
import {
  DUPLICATE_PRELEM,
  FETCH_ALL_PRELEM_SEARCH_LIST,
  FETCH_PRELEM_CONTENT,
  FETCH_PRELEM_DEFAULT_META,
  FETCH_PRELEM_VALIDATION,
  FETCH_RESET_DATA,
} from "../../graphQL/queries/prelemQueries";
import { addPrelem } from "@platformx/authoring-state";
import axiosInstance, { createAxiosError } from "../../config/restApiConfig";
import { createSearchParams } from "react-router-dom";
import { formatAddPrelem } from "@platformx/utilities";

export const fetchPrelemValidation = FETCH_PRELEM_VALIDATION;
export const fetchPrelemContent = FETCH_PRELEM_CONTENT;
export const fetchAllPrelemSearchList = FETCH_ALL_PRELEM_SEARCH_LIST;
export const duplicatePrelem = DUPLICATE_PRELEM;
export const fetchResetData = FETCH_RESET_DATA;
export const fetchPrelemDefaultMeta = FETCH_PRELEM_DEFAULT_META;

export const setPrelemArray = (
  prelemContentValidation,
  prelemContentSchema,
  prelemToBeAdded,
  navigate,
  insertPrelemAt,
) => {
  const prelemMetaInstance = {
    ...formatAddPrelem(prelemToBeAdded),
    content: JSON.parse(JSON.stringify(prelemContentSchema)),
  };
  const path = localStorage.getItem("path");
  if (path) {
    navigate(
      {
        pathname: "/edit-page",
        search: `?${createSearchParams({
          page: path.toString(),
        })}`,
      },
      { state: "old" },
    );
  } else navigate("/edit-page", { state: "old" });
  return {
    prelemMetaInstance: prelemMetaInstance,
    prelemValidation: prelemContentValidation,
    insertPrelemAt: insertPrelemAt,
  };
};

export const addPrelemFunc = (
  dispatch: any,
  prelemToBeAdded: any,
  runFetchContentQuery,
  runFetchValidationQuery,
  navigate,
  insertPrelemAt: any,
) => {
  const docPath = prelemToBeAdded.DocumentPath;
  const docType = prelemToBeAdded.DocumentType;
  return runFetchContentQuery({
    variables: {
      path: docPath,
      docType: docType,
      prelemId: prelemToBeAdded?.PrelemId,
    },
  })
    .then((resp) => {
      runFetchValidationQuery({
        variables: { input: docType },
      })
        .then((res) => {
          const prelemMetaInstance = {
            ...formatAddPrelem(prelemToBeAdded),
            content: JSON.parse(JSON.stringify(resp.data.authoring_getCmsItemContent)),
          };
          dispatch(
            addPrelem({
              prelemMetaInstance: prelemMetaInstance,
              prelemValidationInstance: res.data.authoring_getDocValidationSchema,
              prelemPosition: insertPrelemAt,
            }),
          );
          const path = localStorage.getItem("path");
          if (path) {
            navigate(
              {
                pathname: "/edit-page",
                search: `?${createSearchParams({
                  page: path.toString(),
                })}`,
              },
              { state: "old" },
            );
          } else navigate("/edit-page", { state: "old" });
        })
        .catch((err) => {
          console.error(JSON.stringify(err, null, 2));
        });
    })
    .catch((error) => {
      console.error(JSON.stringify(error, null, 2));
    });
};

const prelemsApi = {
  getPrelemsLayoutsList: async (
    searchValue: string,
    categoryValue: string,
  ): Promise<AxiosResponse<any>> => {
    try {
      return await axiosInstance.get(
        `api/v1/web/en/authoring/layouts/0/2147483647/asc?prelemSearchText=${searchValue}&prelemTag=${categoryValue}`,
      );
    } catch (e: any) {
      throw createAxiosError(e);
    }
  },
  getTopNavigations: async (): Promise<AxiosResponse<any>> => {
    try {
      return await axiosInstance.get("api/v1/web/en/authoring/top-navigations");
    } catch (e: any) {
      throw createAxiosError(e);
    }
  },
  getPrelemSuggestions: async (inputValue: string): Promise<AxiosResponse<any>> => {
    try {
      return await axiosInstance.get(
        `api/v1/web/en/authoring/prelem-suggestions?searchText=${inputValue}`,
      );
    } catch (e: any) {
      throw createAxiosError(e);
    }
  },
};

export default prelemsApi;
