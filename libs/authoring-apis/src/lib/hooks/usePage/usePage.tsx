/* eslint-disable no-debugger */
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ContentState,
  RootState,
  updateContent,
  updateContentList,
  updatePageSettings,
} from "@platformx/authoring-state";
import {
  AUTH_INFO,
  LanguageList,
  ShowToastError,
  ShowToastSuccess,
  capitalizeFirstLetter,
  formatChildrenForPageDuplicate,
  getSelectedSite,
  getSubDomain,
  setDefaultPageSettings,
  usePlatformAnalytics,
  useUserSession,
} from "@platformx/utilities";
import { addMinutes } from "date-fns";
import { SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { PageQueries } from "../../graphQL/queries/pageQueries";
import { FETCH_PRELEM_VALIDATION } from "../../graphQL/queries/prelemQueries";
import contentTypeAPIs from "../../services/contentTypes/contentTypes.api";
import { fetchPageModel } from "../../services/page/page.api";
import { fetchContent, getCurrentLang } from "../../utils/helper";
import { consolidatePageModel } from "./mapper";

const PageModelInstanceDefault = {
  Page: "",
  SiteName: "",
  Title: "",
  ParentPageURL: "/",
  CurrentPageURL: "/",
  DevelopedBy: "",
  DevelopedDate: "",
  IsEdit: false,
  SeoEnable: true,
  AnalyticsEnable: true,
  RobotTxt: false,
  SiteMap: false,
  Children: null,
  Analytics: "",
  Others: "",
  StructureData: "",
  PageSettings: {},
  Page_LastModificationDate: "",
};

const usePage = (filter = "ALL") => {
  const location = useLocation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const { t, i18n } = useTranslation();
  const { page, content } = useSelector((state: RootState) => state);
  const [runFetchPageModel] = useLazyQuery(PageQueries.FETCH_PAGE_MODEL_DRAFT);
  const [runFetchValidationQuery] = useLazyQuery(FETCH_PRELEM_VALIDATION);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const useremail = userInfo.username;
  const { contentList, startIndex } = useSelector((state: ContentState) => state);
  const [handleImpression] = usePlatformAnalytics();
  const [mutate] = useMutation(PageQueries.CREATE_PAGE_MODEL, {
    context: {
      headers: {
        language: localStorage.getItem("lang"),
        sitename: getSelectedSite(),
      },
    },
  });
  const [mutateUnpublish] = useMutation(PageQueries.UNPUBLISH_PAGE);
  const [mutateDelete] = useMutation(PageQueries.DELETE_PAGE);
  const [directDelete, setDirectDelete] = useState<boolean>(false);
  // const [rescheduleDto, setRescheduledDto] = useState({});
  const [currentPublishTime, setCurrentPublishTime] = useState("");
  const [currentUnpublishTime, setCurrentUnpublishTime] = useState("");
  const [mutatePublishSchedule] = useMutation(PageQueries.RESCHEDULE_PUBLISH);
  const [mutateUnpublishSchedule] = useMutation(PageQueries.RESCHEDULE_UNPUBLISH);
  // const [cancelTriggerType, setCancelTriggerType] = useState("");
  const [selectedPageData, setPageData] = useState<any>({});
  const [mutateCancelPublishSchedule] = useMutation(PageQueries.CANCEL_PUBLISH);
  const [mutateCancelUnpublishSchedule] = useMutation(PageQueries.CANCEL_UNPUBLISH);
  // const [isCancelTrigger, setIsCancelTrigger] = useState(false);
  const navigate = useNavigate();
  const [mutatePublish] = useMutation(PageQueries.PUBLISH_PAGE_MODEL);
  localStorage.setItem("lang", getCurrentLang());
  const dispatch = useDispatch();
  // operations
  const cardClickHandle = useCallback(
    (
      parameter: string,
      status: string,
      pathForSelectedPage: string,
      actionType?: string,
      deviceType?: string,
      editOption?: string,
      searchCatURL?: string,
      searchTermURL?: string,
      sortByURL?: string,
    ) => {
      // const publishPageURL = `${process.env.NX_PUBLISH_URI + i18n.language
      //   }/${parameter}`;
      const publishPageURL = `${getSubDomain()}/${i18n.language}/${parameter}`;
      if (status?.toLowerCase() === "draft" || status?.toLowerCase() === "unpublished") {
        fetchPageModel(
          dispatch,
          runFetchPageModel,
          runFetchValidationQuery,
          pathForSelectedPage,
          navigate,
          actionType,
          deviceType,
          editOption,
          searchCatURL,
          searchTermURL,
          sortByURL,
        );
      } else {
        window.open(publishPageURL);
      }
    },
    [],
  );

  /**edit page click handle here*/
  const editPage = (selectedPage: any) => {
    cardClickHandle(
      selectedPage.page || "",
      "draft",
      selectedPage.path || "",
      selectedPage.status === "draft" &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? "preview"
        : "",
      selectedPage.status === "draft" &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? "window"
        : "",
      selectedPage.status === "draft" &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? "no"
        : "",
      "",
      "",
      "",
    );
  };

  /**view page click handle here */
  const viewPage = (selectedPage: any) => {
    cardClickHandle(
      selectedPage.page || "",
      selectedPage.status === "published" ? "published" : "draft",
      selectedPage.path || "",
      "preview",
      "window",
      selectedPage.status === "draft" &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? "no"
        : "yes",
      "",
      "",
      "",
    );
  };

  /**preview page click handle here */
  const previewPage = (selectedPage: any) => {
    cardClickHandle(
      selectedPage.page || "",
      selectedPage.status === "published" ? "published" : "draft",
      selectedPage.path || "",
      "preview",
      "window",
      selectedPage.status === "draft" &&
        (selectedPage.scheduledPublishTriggerDateTime ||
          selectedPage.scheduledUnPublishTriggerDateTime)
        ? "no"
        : "yes",
      "",
      "",
      "",
    );
  };

  /**handle duplicate page popup data */
  const handleDuplicatePopup = (duplicate: any, pageSelected: { path: any; status: any }) => {
    if (duplicate) {
      fetchPageModel(
        dispatch,
        runFetchPageModel,
        runFetchValidationQuery,
        pageSelected.path,
        null,
        pageSelected.status,
      );
    }
  };

  /**create page */
  const createPageModel = (newPageModel: any, isDuplicate?: any, code?: any) => {
    mutate({
      variables: { input: newPageModel },
      context: {
        headers: {
          language: localStorage.getItem("lang"),
          sitename: getSelectedSite(),
        },
      },
    })
      .then(async (resp) => {
        localStorage.removeItem("lang");
        if (code) {
          ShowToastSuccess(`${t("page")} ${t("created_toast")} ${t("for")} ${code}`);
        } else {
          ShowToastSuccess(`${t("page")} ${t("created_toast")}`);
        }
        localStorage.setItem("path", resp?.data?.authoring_createPage?.path);
        const pageDataObj = {
          eventType: "Successful Page Creation",
          pageCreated: true,
          created_page_title: newPageModel.Page,
          createdBy: newPageModel.DevelopedBy,
        };
        handleImpression(pageDataObj.eventType, pageDataObj);
        if (isDuplicate) {
          dispatch(updateContent(await fetchContent("Sitepage", location, filter, content, true)));
        } else {
          navigate(
            {
              pathname: "/edit-page",
              search: `?${createSearchParams({
                page: resp?.data?.authoring_createPage?.path.toString(),
              })}`,
            },
            { state: "new" },
          );
        }
      })
      .catch((error) => {
        if (code) {
          ShowToastError(`${error.graphQLErrors[0].message} ${t("for")} ${code}`);
        } else {
          ShowToastError(error.graphQLErrors[0].message);
        }
      });
  };

  const createPageByName = async (pageName: any, pageUrl: any) => {
    const newPageModel = JSON.parse(JSON.stringify(PageModelInstanceDefault));
    newPageModel.Page = pageUrl;
    newPageModel.Title = pageName;
    newPageModel.DevelopedBy = username;
    newPageModel.Page_LastModifiedBy = username;
    newPageModel.Page_LastModificationDate = new Date();
    newPageModel.DevelopedDate = new Date().toISOString();
    //newPageModel.Page_LastModificationDate = new Date().toISOString();
    newPageModel.CurrentPageURL = `/${pageUrl}`;
    newPageModel.PageSettings = { PageName: pageName };
    newPageModel.SiteName = useremail;
    createPageModel(newPageModel, false);
    dispatch(
      updatePageSettings(
        setDefaultPageSettings(
          pageName,
          undefined,
          undefined,
          `${AUTH_INFO.publishUri + i18n.language}/${pageUrl}`,
        ),
      ),
    );
    //dispatch(updateSaveWarning(false));
    dispatch(updateContent(await fetchContent("Sitepage", location, filter, content, true)));
  };

  /**duplicate page */
  const duplicatePage = (isDuplicate, pageName, pageUrl, language) => {
    if (pageName.trim().length > 0) {
      if (isDuplicate) {
        const copyPageModel = JSON.parse(JSON.stringify(page?.pageModel));
        const newPageModel = formatChildrenForPageDuplicate(
          copyPageModel,
          pageName,
          pageUrl,
          username,
        );
        //eslint-disable-next-line array-callback-return
        language.map((lang) => {
          // eslint-disable-next-line array-callback-return
          LanguageList().map((l: any) => {
            if (l.label === lang) {
              localStorage.setItem("lang", l.id);
              createPageModel(newPageModel, isDuplicate, l.label);
            }
          });
        });
      } else {
        createPageByName(pageName, pageUrl);
      }
    }
  };

  /**handle delete popup data */
  // const handleDeleteData = (pageSelected: {
  //   status: string;
  //   scheduledUnPublishTriggerDateTime: null;
  //   page: any;
  //   currentPageUrl: any;
  //   parentPageUrl: any;
  //   scheduledPublishTriggerDateTime: null;
  // }) => {
  //   setPageData(pageSelected);
  //   if (pageSelected.status === "published") {
  //     setDirectDelete(true);
  //     if (pageSelected?.scheduledUnPublishTriggerDateTime != null) {
  //       // const requestDto = {
  //       //   page: pageSelected.page,
  //       //   currentpageurl: pageSelected.currentPageUrl,
  //       //   parentpageurl: pageSelected.parentPageUrl,
  //       // };
  //       // setRescheduledDto(requestDto);
  //       //setCancelTriggerType("2");
  //     }
  //   }
  //   if (pageSelected.status === "draft" && pageSelected.scheduledPublishTriggerDateTime != null) {
  //     setDirectDelete(true);
  //     // const requestDto = {
  //     //   page: pageSelected.page,
  //     //   currentpageurl: pageSelected.currentPageUrl,
  //     //   parentpageurl: pageSelected.parentPageUrl,
  //     // };
  //     // setRescheduledDto(requestDto);
  //     // setCancelTriggerType("1");
  //   }
  // };

  /**remove page */
  const handleRemove = (itemsdata: { page: any; currentPageUrl: any; parentPageUrl: any }) => {
    mutateDelete({
      variables: {
        page: itemsdata.page,
        currentpageurl: itemsdata.currentPageUrl,
        parentpageurl: itemsdata.parentPageUrl,
      },
    })
      .then(async () => {
        // handleDeleteData;
        ShowToastSuccess(`${t("page")} ${t("deleted_toast")}`);
        // dispatch(
        //   await fetchContent(
        //     state.content.contentType,
        //     location,
        //     filter,
        //     state,
        //     true
        //   )
        // );
        const searchResponse = await contentTypeAPIs.fetchSearchContent(
          capitalizeFirstLetter("sitepage"),
          location,
          filter,
          startIndex,
          contentList,
          true,
        );
        dispatch(updateContentList(searchResponse));
        setDirectDelete(false);
      })
      .catch(() => {
        ShowToastError(t("api_error_toast"));
      });
  };

  /**unpublish page */
  const unPublishPage = (selectedPageDataProp: any) => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    mutateUnpublish({
      variables: {
        page: selectedPageDataProp.page,
        currentpageurl: selectedPageDataProp.currentPageUrl,
        parentpageurl: selectedPageDataProp.parentPageUrl,
        timeZone: timeZone,
      },
    })
      .then(async () => {
        if (selectedPageDataProp.status !== "draft") {
          const searchResponse = await contentTypeAPIs.fetchSearchContent(
            capitalizeFirstLetter("sitepage"),
            location,
            filter,
            startIndex,
            contentList,
            true,
          );
          dispatch(updateContentList(searchResponse));
          ShowToastSuccess(t("unpublish_toast"));
        }
        if (directDelete) {
          handleRemove(selectedPageData);
        }
      })
      .catch(() => {
        ShowToastError(t("api_error_toast"));
      });
  };

  /**handle page delete conditions */
  const handlePageDelete = (selectedPage) => {
    const requestDto = {
      page: selectedPage.page,
      currentpageurl: selectedPage.currentPageUrl,
      parentpageurl: selectedPage.parentPageUrl,
    };
    if (selectedPage?.status === "published") {
      if (selectedPage?.scheduledUnPublishTriggerDateTime != null) {
        cancelPublishUnpublishTrigger("2", requestDto, selectedPage);
      } else {
        unPublishPage(selectedPage);
      }
    } else {
      if (selectedPage?.scheduledPublishTriggerDateTime != null) {
        cancelPublishUnpublishTrigger("1", requestDto, selectedPage);
      } else {
        handleRemove(selectedPage);
      }
    }
  };

  /**handle reschedule popup */
  const handleReschedulePopup = useCallback(
    (
      type: any,
      itemsdata: {
        path: string;
        page: any;
        currentPageUrl: any;
        parentPageUrl: any;
        scheduledUnPublishTriggerDateTime: SetStateAction<string>;
        scheduledPublishTriggerDateTime: SetStateAction<string>;
      },
    ) => {
      const arr = itemsdata.path?.split("/");
      // const folder = arr[5];
      // const pathnm = `${arr[6]}/${arr[7]}`;
      // const folder = arr[6];
      // const pathnm = arr[10];
      const [folder, pathnm] = arr;
      runFetchPageModel({
        variables: { folder: folder, path: pathnm },
      })
        .then(() => {
          // dispatch(
          //   setPageModelStoreAfterFetch(
          //     dispatch,
          //     resp.data.authoring_getCmsItemByPath,
          //     runFetchValidationQuery
          //   )
          // );
        })
        .catch(() => {
          // console.log(JSON.stringify(err, null, 2));
        });
      // const requestDto = {
      //   page: itemsdata.page,
      //   currentpageurl: itemsdata.currentPageUrl,
      //   parentpageurl: itemsdata.parentPageUrl,
      // };
      // setRescheduledDto(requestDto);
      setCurrentUnpublishTime(itemsdata.scheduledUnPublishTriggerDateTime);
      setCurrentPublishTime(itemsdata.scheduledPublishTriggerDateTime);
    },
    [],
  );

  /**reschedule publish page */
  const reschedulePublishPage = (publishTime: string | number | Date, rescheduleDto: any) => {
    const currentDateTime = addMinutes(new Date(), 5);
    const enteredPublishTime = new Date(publishTime);
    const validPublishTime =
      currentUnpublishTime != null ? addMinutes(new Date(currentUnpublishTime), 10) : null;
    if (
      validPublishTime != null &&
      new Date(currentUnpublishTime) < addMinutes(enteredPublishTime, 10)
    ) {
      ShowToastError(`${t("page")} ${t("scheduled_publish_time")}`);
    } else {
      if (enteredPublishTime > currentDateTime) {
        mutatePublishSchedule({
          variables: {
            requestdto: rescheduleDto,
            scheduleTime: publishTime?.toString(),
          },
        })
          .then(async () => {
            // dispatch(
            //   await fetchContent(
            //     state.content.contentType,
            //     location,
            //     filter,
            //     state,
            //     true
            //   )
            // );
            const searchResponse = await contentTypeAPIs.fetchSearchContent(
              capitalizeFirstLetter("sitepage"),
              location,
              filter,
              startIndex,
              contentList,
              true,
            );
            dispatch(updateContentList(searchResponse));
            ShowToastSuccess(`${t("page")} ${t("publish")} ${t("rescheduled_success_toast")}`);
          })
          .catch(() => {
            ShowToastError(t("api_error_toast"));
          });
      } else {
        ShowToastError(`${t("page")} ${t("publish_time_toast")}`);
      }
    }
  };

  const publishPage = () => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const newModel = consolidatePageModel(
      page.pageInfo?.pageModel,
      page.pageInfo?.prelemMetaArray,
      page.pageInfo?.pageSettings,
      username,
    );
    const requestdto = {
      page: page.pageInfo?.pageModel.Page,
      parentpageurl: "/",
      currentpageurl: page.pageInfo?.pageModel.CurrentPageURL,
    };
    mutatePublish({
      variables: {
        input: requestdto,
        pageModelRequest: newModel,
        timeZone: timeZone,
      },
    })
      .then(() => {
        // dispatch(
        //   await fetchContent(
        //     state.content.contentType,
        //     location,
        //     filter,
        //     state,
        //     true
        //   )
        // );
        // ShowToastSuccess(`${t('page')} ${t('pubished_success_toast')}`);
        const pageDataObj = {
          eventType: "Page Published",
          pagePublished: true,
        };
        handleImpression(pageDataObj.eventType, pageDataObj);
      })
      .catch(() => {
        ShowToastError(`${t("page")} ${t("published_error_toast")}`);
      });
  };

  /**reschedule unpublish page */
  const rescheduleUnPublishPage = (
    unpublishTime: string | number | Date,
    rescheduleDto: any,
    listItemDetails: { status: string },
  ) => {
    const currentDateTime = addMinutes(new Date(), 5);
    const enteredUnpublishTime = new Date(unpublishTime);
    const validPublishTime =
      currentPublishTime !== "" ? addMinutes(new Date(currentPublishTime), 10) : null;
    if (validPublishTime != null && validPublishTime > enteredUnpublishTime) {
      ShowToastError(`${t("page")} ${t("publish_vs_unpublish_toast")}`);
    } else {
      if (enteredUnpublishTime > currentDateTime) {
        listItemDetails?.status.toLowerCase() === "published" && publishPage();
        mutateUnpublishSchedule({
          variables: {
            requestdto: rescheduleDto,
            scheduleTime: unpublishTime,
          },
        })
          .then(async () => {
            // dispatch(
            //   await fetchContent(
            //     state.content.contentType,
            //     location,
            //     filter,
            //     state,
            //     true
            //   )
            // );
            const searchResponse = await contentTypeAPIs.fetchSearchContent(
              capitalizeFirstLetter("sitepage"),
              location,
              filter,
              startIndex,
              contentList,
              true,
            );
            dispatch(updateContentList(searchResponse));
            ShowToastSuccess(`${t("page")} ${t("unpublish")} ${t("rescheduled_success_toast")}`);
          })
          .catch(() => {
            ShowToastError(t("api_error_toast"));
          });
      } else {
        ShowToastError(`${t("page")} ${t("unpublish_time_toast")}`);
      }
    }
  };

  /**handle cancel publish/unpublish popup */
  const handleCancelTriggerPopup = (
    itemsdata: {
      path: string;
      page: any;
      currentPageUrl: any;
      parentPageUrl: any;
    },
    // triggerType: SetStateAction<string>,
  ) => {
    const arr = itemsdata.path?.split("/");
    // const folder = arr[5];
    // const pathnm = `${arr[6]}/${arr[7]}`;
    // const folder = arr[6];
    // const pathnm = arr[10];
    const [folder, pathnm] = arr;
    runFetchPageModel({
      variables: { folder: folder, path: pathnm },
    })
      .then(() => {
        // dispatch(
        //   setPageModelStoreAfterFetch(
        //     dispatch,
        //     resp.data.authoring_getCmsItemByPath,
        //     runFetchValidationQuery
        //   )
        // );
      })
      .catch(() => {
        // console.log(JSON.stringify(err, null, 2));
      });
    // const requestDto = {
    //   page: itemsdata.page,
    //   currentpageurl: itemsdata.currentPageUrl,
    //   parentpageurl: itemsdata.parentPageUrl,
    // };
    // setRescheduledDto(requestDto);
    // setCancelTriggerType(triggerType);
    setPageData(itemsdata);
  };

  /**cancel publish/unpublish page */
  const cancelPublishUnpublishTrigger = (
    triggerType: string,
    requestDto: { page: any; currentpageurl: any; parentpageurl: any },
    listItemDetails: { scheduledUnPublishTriggerDateTime: null; status: string },
  ) => {
    if (triggerType === "1") {
      mutateCancelPublishSchedule({
        variables: { requestdto: requestDto },
      })
        .then(() => {
          // dispatch(
          //   await fetchContent(
          //     state.content.contentType,
          //     location,
          //     filter,
          //     state,
          //     true
          //   )
          // );
          ShowToastSuccess(`${t("page")} ${t("publish")} ${t("schedule_cancel_toast")}`);
          if (
            (directDelete &&
              listItemDetails &&
              listItemDetails?.scheduledUnPublishTriggerDateTime == null) ||
            undefined
          ) {
            // handleRemove(listItemDetails);
          }
        })
        .catch(() => {
          ShowToastError(t("api_error_toast"));
        });
    }
    if (
      (triggerType === "1" &&
        listItemDetails &&
        listItemDetails?.scheduledUnPublishTriggerDateTime) ||
      triggerType === "2"
    ) {
      listItemDetails?.status.toLowerCase() === "published" && publishPage();
      mutateCancelUnpublishSchedule({
        variables: { requestdto: requestDto },
      })
        .then(() => {
          // dispatch(
          //   await fetchContent(
          //     state.content.contentType,
          //     location,
          //     filter,
          //     state,
          //     true
          //   )
          // );
          ShowToastSuccess(`${t("page")} ${t("unpublish")} ${t("schedule_cancel_toast")}`);
          if (directDelete) {
            if (listItemDetails?.status !== "published") {
              //  handleRemove(listItemDetails);
            } else {
              unPublishPage(listItemDetails);
            }
          }
          // setIsCancelTrigger(false);
        })
        .catch(() => {
          ShowToastError(t("api_error_toast"));
        });
    }
  };

  return {
    editPage,
    viewPage,
    previewPage,
    handleDuplicatePopup,
    duplicatePage,
    unPublishPage,
    handleReschedulePopup,
    reschedulePublishPage,
    rescheduleUnPublishPage,
    handleCancelTriggerPopup,
    cancelPublishUnpublishTrigger,
    //handleDeleteData,
    handlePageDelete,
  };
};

export default usePage;
