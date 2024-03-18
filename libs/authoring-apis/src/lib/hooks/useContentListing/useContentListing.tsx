import { useLazyQuery, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
// import { previewContent } from '../../pages/QuizPollEvents/store/ContentAction';
import {
  ContentState,
  previewArticle,
  previewContent,
  updateContentList,
} from "@platformx/authoring-state";
import {
  ShowToastError,
  ShowToastSuccess,
  capitalizeFirstLetter,
  convertToLowerCase,
  getCurrentLang,
  getSelectedSite,
  getSubDomain,
  useUserSession,
} from "@platformx/utilities";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams } from "react-router-dom";
import { FETCH_CONTENT_BY_PATH } from "../../graphQL/queries/contentTypesQueries";
import contentTypeAPIs, {
  createContentType,
  deleteContentType,
  publishContentType,
} from "../../services/contentTypes/contentTypes.api";
import { LanguageList } from "../../utils/constants";
import useVod from "../useVod/useVod";
import { CONTENT_CONSTANTS } from "./Uitls/Constants";
import { mapDeleteContent, mapDuplicateContent, mapUnPublishContent } from "./mapper";

const { LANG, DRAFT, EVENT, POLL, PUBLISHED, QUESTION, QUIZ, UNPUBLISHED, PREVIEW_PATH } =
  CONTENT_CONSTANTS;
const useContentListing = (filter = "ALL") => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { duplicateVod } = useVod();
  const { contentList, startIndex } = useSelector((state: ContentState) => state);
  const navigate = useNavigate();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [deleteMutate] = useMutation(deleteContentType);
  const [unPublishMutate] = useMutation(publishContentType);
  const [runFetchContentByPath] = useLazyQuery(FETCH_CONTENT_BY_PATH);
  const [createMutate] = useMutation(createContentType, {
    context: {
      headers: {
        language: localStorage.getItem(LANG),
        sitename: getSelectedSite(),
      },
    },
  });

  const location = useLocation();

  const fetchContentDetails = async (listItemDetails: {
    tagName: string | undefined;
    page: any;
  }) => {
    try {
      const response: any = await contentTypeAPIs.fetchContent({
        contentType:
          listItemDetails.tagName === "VOD"
            ? "Vod"
            : capitalizeFirstLetter(listItemDetails.tagName),
        path: listItemDetails?.page,
      });
      if (response.authoring_getCmsContentByPath) {
        const { authoring_getCmsContentByPath: content } = response;
        return content;
      }
    } catch (err) {
      ShowToastError(t("api_error_toast"));
    }
  };
  const deleteContent = async (listItemDetails: any) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      if (selectedItem.page_state === PUBLISHED) {
        await unPublish(listItemDetails);
      }
      try {
        const contentToSend = mapDeleteContent(
          listItemDetails.tagName === "VOD"
            ? "Vod"
            : capitalizeFirstLetter(listItemDetails.tagName),
          selectedItem,
        );
        const response: any = await deleteMutate({
          variables: {
            ...contentToSend,
          },
        });
        // const {
        //   authoring_deleteContent: { message },
        // } = response.data;
        if (response) {
          const searchResponse = await contentTypeAPIs.fetchSearchContent(
            capitalizeFirstLetter(listItemDetails.tagName),
            location,
            filter,
            startIndex,
            contentList,
            true,
          );
          dispatch(updateContentList(searchResponse));
          ShowToastSuccess(
            `${capitalizeFirstLetter(listItemDetails.tagName)} ${t("deleted_toast")}`,
          );
        }
      } catch (error: any) {
        ShowToastError(t("api_error_toast"));
      }
    }
  };

  const unPublish = async (listItemDetails: any) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        const contentToSend = mapUnPublishContent(
          listItemDetails.tagName === "VOD"
            ? "Vod"
            : capitalizeFirstLetter(listItemDetails.tagName),
          selectedItem.page,
        );
        const unPublishResponse = await unPublishMutate({
          variables: {
            ...contentToSend,
          },
        });
        if (unPublishResponse) {
          const response = await contentTypeAPIs.fetchSearchContent(
            capitalizeFirstLetter(listItemDetails.tagName),
            location,
            filter,
            startIndex,
            contentList,
            true,
          );
          dispatch(updateContentList(response));
          ShowToastSuccess(
            `${capitalizeFirstLetter(listItemDetails.tagName)} ${t("unpublished_toast")}`,
          );
        }
      } catch (error: any) {
        ShowToastError(error?.graphQLErrors[0]?.message || t("api_error_toast"));
      }
    }
  };

  const view = (listItemDetails: { tagName: string; currentPageUrl: any; course_id: any }) => {
    // eslint-disable-line

    if (listItemDetails.tagName.toUpperCase() === "VOD") {
      window.open(`${getSubDomain()}/${i18n.language}/video${listItemDetails?.currentPageUrl}`);
    } else if (listItemDetails.tagName === convertToLowerCase("Courses")) {
      window.open(
        `${getSubDomain()}/${i18n.language}/course/course-details?courseId=${
          listItemDetails?.course_id
        }`,
      );
      // window.open(`${listItemDetails?.currentPageUrl}`);
    } else {
      window.open(
        `${getSubDomain()}/${i18n.language}/${listItemDetails.tagName?.toLowerCase()}${
          listItemDetails?.currentPageUrl
        }`,
      );
    }
  };

  const edit = (listItemDetails: { tagName: string; page: any }) => {
    dispatch(previewContent({}));
    dispatch(previewArticle({}));
    navigate(
      `/content/create/${listItemDetails.tagName?.toLowerCase()}?path=${listItemDetails.page}`,
      {
        state: listItemDetails.tagName?.toLowerCase(),
      },
    );
  };

  const editPage = (listItemDetails: { path: any }) => {
    navigate({
      pathname: "/edit-page",
      search: `?${createSearchParams({
        page: listItemDetails.path.toString(),
      })}`,
    });
  };

  const preview = async (listItemDetails: any) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    const type = capitalizeFirstLetter(listItemDetails?.tagName);
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        if (selectedItem?.page_state === DRAFT || selectedItem?.page_state === UNPUBLISHED) {
          const qusArry: never[] = [];
          if (
            selectedItem?.questions?.length &&
            capitalizeFirstLetter(listItemDetails.tagName) === QUIZ
          ) {
            selectedItem?.questions?.map((qus: any) => {
              runFetchContentByPath({
                variables: { contentType: QUESTION, path: qus },
              })
                .then((res) => {
                  if (res?.data?.authoring_getCmsContentByPath) {
                    const qusObj = res?.data?.authoring_getCmsContentByPath as never;
                    qusArry.push(qusObj);
                  }
                })
                .catch(() => {
                  // console.log(JSON.stringify(err, null, 2));
                });
              return "";
            });
            const tempObj = {
              ...selectedItem,
              questions: qusArry,
              contentType: type,
            };
            dispatch(previewContent(tempObj));
            navigate(PREVIEW_PATH);
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === POLL) {
            dispatch(previewContent({ ...selectedItem, contentType: type }));
            navigate(PREVIEW_PATH);
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === "Article") {
            dispatch(
              previewArticle({
                ...selectedItem,
                page_lastmodifiedby: selectedItem.last_modifiedBy,
                developed_date: selectedItem.creationDate,
              }),
            );
            navigate("/article-preview");
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === EVENT) {
            const eventToPreview = {
              ...selectedItem,
              settings: selectedItem?.settingsProperties,
              PageTags: selectedItem?.tags,
              lastModifiedDate: selectedItem?.modificationDate,
              last_modification_date: selectedItem?.modificationDate,
              AnalyticsEnable: selectedItem?.analytics_enable,
            };
            dispatch(previewContent({ ...eventToPreview, contentType: type }));
            navigate(PREVIEW_PATH);
          } else {
            ShowToastError(t(PREVIEW_PATH));
          }
        }
      } catch (error: any) {
        ShowToastError(error?.graphQLErrors[0]?.message || t("api_error_toast"));
      }
    }
  };
  const duplicate = async (
    IsDuplicate,
    title: any,
    language: string | string[],
    listItemDetails: any,
  ) => {
    const selectedItem = await fetchContentDetails(listItemDetails);
    try {
      if (
        selectedItem &&
        Object.keys(selectedItem).length > 0 &&
        listItemDetails.tagName.toLowerCase() !== "vod"
      ) {
        const contentToSend = mapDuplicateContent(
          capitalizeFirstLetter(listItemDetails.tagName),
          title,
          IsDuplicate || false,
          selectedItem,
          username,
          i18n.language,
        );
        const selectedLanguage = LanguageList.filter((langObj) => language.includes(langObj.value));
        const promises = selectedLanguage.map(async (lang) => {
          return await createMutate({
            variables: {
              contenttype: capitalizeFirstLetter(listItemDetails.tagName),
              input: { ...contentToSend },
            },
            context: {
              headers: {
                language: lang.id,
                sitename: getSelectedSite(),
              },
            },
          });
        });

        const response = await Promise.all(promises);

        if (response && response.length > 0) {
          const searchResponse: any = await contentTypeAPIs.fetchSearchContent(
            capitalizeFirstLetter(listItemDetails.tagName),
            location,
            filter,
            startIndex,
            contentList,
            true,
          );
          dispatch(updateContentList(searchResponse));
          for (const lang of selectedLanguage) {
            ShowToastSuccess(
              `${t(capitalizeFirstLetter(listItemDetails.tagName))} ${t("duplicated_toast")} ${t(
                "for",
              )} ${lang.value}`,
            );
          }
        }
      } else {
        duplicateVod({ IsDuplicate, title, language, selectedItem });
      }
    } catch (error: any) {
      ShowToastError(
        error.graphQLErrors[0]
          ? `${error.graphQLErrors[0].message} ${t("for")} ` //${l.value}
          : t("api_error_toast"),
      );
    }
  };

  const duplicateToSite = async (IsDuplicate, title: any, listItemDetails: any, siteTitle: any) => {
    try {
      const selectedItem = await fetchContentDetails(listItemDetails);

      if (selectedItem && Object.keys(selectedItem).length > 0) {
        const contentToSend = mapDuplicateContent(
          capitalizeFirstLetter(listItemDetails.tagName),
          title,
          IsDuplicate || false,
          selectedItem,
          username,
          i18n.language,
        );
        // const selectedLanguage = LanguageList.filter((langObj) =>
        //   language.includes(langObj.value)
        // );
        // const response = [];
        //   for (const lang of selectedLanguage) {
        const result = await createMutate({
          variables: {
            contenttype: capitalizeFirstLetter(listItemDetails.tagName),
            input: { ...contentToSend },
          },
          context: {
            headers: {
              language: getCurrentLang(),
              sitename: siteTitle,
            },
          },
        });
        return result;
      }
    } catch (error: any) {
      ShowToastError(
        error.graphQLErrors[0]
          ? `${error.graphQLErrors[0].message} ${t("for")} ` //${l.value}
          : t("api_error_toast"),
      );
    }
  };

  return {
    unPublish,
    duplicate,
    preview,
    view,
    deleteContent,
    edit,
    editPage,
    fetchContentDetails,
    duplicateToSite,
  };
};

export default useContentListing;
