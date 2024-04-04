import { useMutation } from "@apollo/client";
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
  makeCreateContentPath,
  useUserSession,
} from "@platformx/utilities";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams } from "react-router-dom";
import contentTypeAPIs, {
  createContentType,
  deleteContentType,
  publishContentType,
} from "../../services/contentTypes/contentTypes.api";
import { LanguageList } from "../../utils/constants";
import useVod from "../useVod/useVod";
import { CONTENT_CONSTANTS } from "./Uitls/Constants";
import { mapDeleteContent, mapDuplicateContent, mapUnPublishContent } from "./mapper";

const {
  LANG,
  DRAFT,
  VOD,
  EVENT,
  POLL,
  PUBLISHED,
  QUESTION,
  QUIZ,
  UNPUBLISHED,
  PREVIEW_PATH,
  ARTICLE,
} = CONTENT_CONSTANTS;
const useContentActions = (filter = "ALL") => {
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
    } else if (listItemDetails.tagName.toLowerCase() === "sitepage") {
      window.open(`${getSubDomain()}/${i18n.language}${listItemDetails?.currentPageUrl}`);
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
    const navigateTo = makeCreateContentPath(listItemDetails.tagName?.toLowerCase());
    navigate(`${navigateTo}?path=${listItemDetails.page}`, {
      state: listItemDetails.tagName?.toLowerCase(),
    });
  };

  const editPage = (listItemDetails: { path: any }) => {
    localStorage.setItem("path", listItemDetails.path.toString());
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
          if (
            selectedItem?.questions?.length &&
            capitalizeFirstLetter(listItemDetails.tagName) === QUIZ
          ) {
            const questionPromise = selectedItem?.questions?.map(async (qus: any) => {
              const question = await fetchContentDetails({ tagName: QUESTION, page: qus });
              if (question?.background_content) {
                return question;
              }
            });
            Promise.all(questionPromise).then(function (results) {
              dispatch(previewContent({ ...selectedItem, contentType: type, questions: results }));
              navigate(PREVIEW_PATH);
            });
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === POLL) {
            dispatch(previewContent({ ...selectedItem, contentType: type }));
            navigate(PREVIEW_PATH);
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === ARTICLE) {
            dispatch(
              previewContent({
                ...selectedItem,
                page_lastmodifiedby: selectedItem.last_modifiedBy,
                developed_date: selectedItem.creationDate,
                contentType: ARTICLE,
              }),
            );
            navigate(PREVIEW_PATH);
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
          } else if (capitalizeFirstLetter(listItemDetails.tagName) === VOD) {
            dispatch(
              previewContent({
                ...selectedItem,
                page_lastmodifiedby: selectedItem.last_modifiedBy,
                developed_date: selectedItem.creationDate,
                contentType: type,
              }),
            );
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

export default useContentActions;
