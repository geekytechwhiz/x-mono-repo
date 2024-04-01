import { ApolloError } from "@apollo/client";
import { setValidationForFetchPage, updateDataAfterFetch } from "@platformx/authoring-state";
import { formatChildren, getSelectedSite } from "@platformx/utilities";
import { createSearchParams } from "react-router-dom";
import graphqlInstance from "../../config/graphqlConfig";
import { PageQueries } from "../../graphQL/queries/pageQueries";
import { ApiResponse } from "../../utils/types";

export const savePageModel = PageQueries.SAVE_PAGE_MODEL;
export const fetchAllPageList = PageQueries.FETCH_ALL_PAGE_LIST;
export const fetchPageListAll = PageQueries.FETCH_PAGE_LIST_ALL;
export const publishPageModel = PageQueries.PUBLISH_PAGE_MODEL;
export const updatePrelemData = PageQueries.UPDATE_PRELEM_CONTENT;
export const schedulePublish = PageQueries.SCHEDULE_PUBLISH;
export const scheduleUnpublish = PageQueries.SCHEDULE_UNPUBLISH;
export const cancelPublish = PageQueries.CANCEL_PUBLISH;
export const cancelUnpublish = PageQueries.CANCEL_UNPUBLISH;
export const createPgModel = PageQueries.CREATE_PAGE_MODEL;
export const deletePage = PageQueries.DELETE_PAGE;
export const reschedulePublish = PageQueries.RESCHEDULE_PUBLISH;
export const rescheduleUnpublish = PageQueries.RESCHEDULE_UNPUBLISH;
export const unpublishPage = PageQueries.UNPUBLISH_PAGE;

// const setValidationForFetchPage = (res: any) => {
//   return {
//     type: 'SET_VALIDATION_OBJECT',
//     validations: res,
//   };
// };

const fetchAllValidation = async (docTypes: any, runFetchValidationQuery: any) => {
  const validations: any = {};
  for (const documentType of docTypes) {
    // eslint-disable-next-line no-await-in-loop
    const response = await runFetchValidationQuery({
      variables: { input: documentType },
    });
    validations[documentType] = response.data.authoring_getDocValidationSchema;
  }
  return validations;
};

const fetchValidationForPageSelected = (
  dispatch: any,
  runFetchValidationQuery: any,
  children: any,
) => {
  const s = new Set();
  for (let i = 0; i < children.length; i++) {
    s.add(children[i].DocumentType);
  }
  fetchAllValidation(s, runFetchValidationQuery)
    .then((response) => {
      dispatch(setValidationForFetchPage({ validations: response }));
    })
    .catch((err: any) => {
      console.error(err);
    });
};

export const fetchPageModel = (
  dispatch: any,
  runFetchPageModel: any,
  runFetchValidationQuery: any,
  path: any,
  navigate?: any,
  actionType?: any,
  deviceType?: string,
  editOption?: string,
  searchCatURL?: string,
  searchTermURL?: string,
  sortByURL?: string,
) => {
  if (path !== "") {
    const arr = path?.split("/");
    // eslint-disable-next-line prefer-destructuring
    const folder = arr[6];
    const pathnm = `${arr[10]}`;
    return runFetchPageModel({
      variables: { folder: folder, path: pathnm },
      context: {
        headers: {
          sitename: getSelectedSite(),
        },
      },
    })
      .then((resp: any) => {
        const data = JSON.parse(JSON.stringify(resp.data.authoring_getCmsItemByPath));
        const { children, content, PageSettings } = data;
        delete data.children;
        delete data.content;
        delete data.__typename;
        fetchValidationForPageSelected(dispatch, runFetchValidationQuery, children);
        const pm = data;
        const childrenWithContent = formatChildren(children, content);
        pm.Children = childrenWithContent;

        dispatch(
          updateDataAfterFetch({
            pageModel: pm,
            pageSettings: PageSettings,
            prelemMetaArray: childrenWithContent,
          }),
        );
        if (navigate) {
          localStorage.setItem("path", path);
          navigate(
            {
              pathname: actionType ? `/preview-page/${deviceType}` : "/edit-page",
              search: `?${createSearchParams({
                page: path.toString(),
                editoption: editOption ? editOption.toString() : "",
                searchCat: searchCatURL ? searchCatURL.toString() : "",
                searchTerm: searchTermURL ? searchTermURL.toString() : "",
                sortBy: sortByURL ? sortByURL.toString() : "",
              })}`,
            },
            { state: "old" },
          );
        }
      })
      .catch((err: any) => {
        console.error(JSON.stringify(err, null, 2));
      });
  }
};

// export const runPageFetchContentQuery = async (prelemMetaInfo: any, fetchContentQuery: any) => {
//   const docPath = prelemMetaInfo.DocumentPath;
//   const docType = prelemMetaInfo.DocumentType;
//   const response = await fetchContentQuery({
//     variables: {
//       path: docPath,
//       docType: docType,
//       prelemId: prelemMetaInfo?.PrelemId,
//     },
//   });
//   return response;
// };

export const runPageFetchValidationQuery = async (
  prelemMetaInfo: any,
  fetchValidationQuery: any,
) => {
  const docType = prelemMetaInfo.DocumentType;
  const response = await fetchValidationQuery({
    variables: { input: docType },
  });
  return response;
};

export const pageApi = {
  getPageDetails: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: PageQueries.FETCH_PAGE_MODEL_DRAFT,
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
