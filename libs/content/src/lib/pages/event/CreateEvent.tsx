import { Box, Divider } from "@mui/material";
import { addMinutes } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import Loader from "../../Common/Loader";
import { CreateHeader } from "../../components/CreateHeader/CreateHeader";
// import DamContentGallery from "../../components/Common/DamContentGallery/DamContentGallery";
import ContentPageScroll from "../../components/ContentPageScroll";
// import { previewContent } from "../../components/Common/contentTypes/store/ContentAction";
import { eventAPIS, useWorkflow } from "@platformx/authoring-apis";
import {
  AUTH_INFO,
  CommonPlateformXDialog,
  Loader,
  ShowToastError,
  ShowToastSuccess,
  capitalizeFirstLetter,
  useUserSession,
  workflowKeys,
} from "@platformx/utilities";
// import WorkflowHistory from "../../components/WorkflowHistory/WorkflowHistory";
// import { postRequest } from "../../services/config/request";
import { ContentType } from "@platformx/content";
import { useDispatch, useSelector } from "react-redux";
import { AnalyticsRef, EventInstance, EventWhole, SeoRef } from "./CreateEvent.types";
import icons, {
  BEFORE_UNLOAD,
  // CANCEL,
  CATEGORY_CONTENT,
  DRAFT,
  EVENT,
  // IMAGE_URL,
  PAGE_EXIST_POP_UP,
  PATH,
  POP_STATE,
  PUBLISHED,
  PUBLISH_POP_UP,
  SAVE_AS_DRAFT_POP_UP,
  SCROLL,
  SEO,
  // SOCIAL_SHARE,
  // SOCIAL_SHARE_IMG_URL,
  seo,
} from "./Utils/Constants";
import {
  DefEvent,
  EventData,
  SelectedImageData,
  analyticInputDefaultData,
  eventStartEndTimeValidation,
  getEventToSend,
  getModifiedField,
  getPreviewContentData,
  getTempObj,
  getUpdateEvent,
  isInViewport,
  onBackButtonEvent,
  seoInputDefaultData,
  unloadCallback,
  updateEventSettings,
  updateStructureData,
  validateUrl,
} from "./Utils/helper";
import EventAnalytics from "./components/EventAnalytics/EventAnalytics";
import EventChooseTags from "./components/EventChooseTags/EventChooseTags";
import EventImageAndThumbnail from "./components/EventImageAndThumbnail/EventImageAndThumbnail";
import EventSEO from "./components/EventSEO/EventSEO";
import EventScheduleDate from "./components/EventScheduleDate/EventScheduleDate";
import EventSocialShare from "./components/EventSocialShare/EventSocialShare";
import EventTimeAndLocation from "./components/EventTimeAndLocation/EventTimeAndLocation";
import EventTitleDescription from "./components/EventTitleDescription/EventTitleDescription";
// import { checkIfUnsavedChanges } from "./store/Actions";
import { RootState, previewContent } from "@platformx/authoring-state";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const { t, i18n } = useTranslation();
  const { currentContent } = useSelector((state: RootState) => state.content);
  // const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [workflow, setWorkflow] = useState({});
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  // const params = useParams();
  const createdUser = useRef(username);
  const analyticsRef = useRef<AnalyticsRef>(analyticInputDefaultData);
  const seoRef = useRef<SeoRef>(seoInputDefaultData);
  const [, setKey] = useState("");
  const quizPageUrl = new URL(window.location.href);
  const currentQuizData = useRef(
    quizPageUrl.searchParams.get("path") ? (quizPageUrl.searchParams.get("path") as string) : "",
  );
  const [scrollToView, setScrollToView] = useState("");
  const [showExitWarning, setShowExitWarning] = useState(false);
  const navigate = useNavigate();
  const [previewButton, setPreviewButton] = useState(true);
  // const [publishButton, setPublishButton] = useState(true);
  // const [saveButton, setSaveButton] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>("Images");
  const [parentToolTip, setParentToolTip] = useState("");
  const [eventInstance, setEventInstance] = useState<EventInstance | unknown>({});
  const [isLoading, setIsLoading] = useState(false);
  const [editedSD, setEditedSD] = useState({});

  const unsavedChanges = useRef<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const updateTempObj = useRef<unknown>({});
  const eventPageUrl = new URL(window.location.href);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [draftPageURL, setDraftPageURL] = useState<string>("");
  const currentEventData = useRef(
    eventPageUrl.searchParams.get(PATH) ? (eventPageUrl.searchParams.get(PATH) as string) : "",
  );
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [pageStatus, setPageStatus] = useState(DRAFT);
  const [onSavedModal, setOnSavedModal] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [selectedImage] = useState(SelectedImageData);
  const [eventState, setEventState] = useState(EventData);
  const [enableWorkflowHistory, setEnableWorkflowHistory] = useState<boolean>(false);
  const publishPopup = useRef(PUBLISH_POP_UP);
  const login_user_id = userInfo?.user_id;
  const updateField = (updatedPartialObj) => {
    updateTempObj.current = updatedPartialObj;
    const newTempData = JSON.parse(JSON.stringify(eventInstance));
    const modifiedEvent = getModifiedField(eventState, newTempData, updatedPartialObj);
    setEventInstance(modifiedEvent);
  };

  const eventWholeRef = useRef<EventWhole>(DefEvent);

  const updateCurrentInstance = () => {
    const pageURL = eventWholeRef.current?.title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
    const updatedObj = {
      page: pageURL,
      title: eventWholeRef.current?.title,
      short_title: eventWholeRef.current?.short_title,
      description: eventWholeRef.current?.description,
      short_description: eventWholeRef.current?.short_description,
      tags: eventWholeRef.current?.tags,
      current_page_url: `/${pageURL}`,
      settings: {
        ...updateEventSettings(eventWholeRef, eventState, AUTH_INFO, i18n),
      },
    };
    updateField(updatedObj);
  };

  const publishEvent = async (pageURL) => {
    const eventToSend = {
      page: pageURL,
    };
    try {
      // Don't remove the data, API call to publish the event
      await eventAPIS.publishContentType({
        contentType: EVENT,
        input: eventToSend,
      });
    } catch (error: any) {
      if (error.graphQLErrors[0]) {
        ShowToastError(error?.graphQLErrors[0].message);
      } else {
        ShowToastError(t("api_error_toast"));
      }
    } finally {
      setIsLoading(false);
    }
  };
  const [workflowStatus, setWorkflowStatus] = useState(true);
  const [showWorkflowSubmit, setShowWorkflowSubmit] = useState(false);
  const workflowSubmitRequest = async (workflowObj, status) => {
    const { success, workflow_status } = await workflowRequest(workflowObj, status);
    if (success) {
      workflow_status === workflowKeys.publish.toLowerCase() && status === workflowKeys.approve
        ? setShowPublishConfirm(true)
        : setShowWorkflowSubmit(true);
    }
  };
  const createEvent = async (
    pageState,
    IsDuplicate = false,
    isWorkflow = true,
    // props = {},
    // event_step = "",
  ) => {
    setIsLoading(true);
    const newTempData = JSON.parse(JSON.stringify(eventInstance));
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD }
        : updateStructureData(eventState, pageState);

    const eventToSend = getEventToSend(
      eventState,
      newTempData,
      updateTempObj,
      pageState,
      structureData,
      IsDuplicate,
      isFeatured,
      createdUser.current,
    );
    try {
      const data: any = await eventAPIS.createContentType({
        contenttype: EVENT,
        input: eventToSend,
      });
      unsavedChanges.current = false;
      // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
      if (data?.authoring_createContent?.message === "Successfully created!!!") {
        if (pageState !== PUBLISHED) {
          setIsLoading(false);
          if (data?.authoring_createContent?.isExist === true) {
            setOpenPageExistModal(true);
            setPageStatus(pageState);
            setWorkflowStatus(isWorkflow);
          } else {
            if (!isWorkflow) {
              ShowToastSuccess(`${t("event")} ${t("saved_toast")}`);
            }
            // setOnSavedModal(true);
            setIsDraft(false);
            const { createdBy, title, description } = eventToSend.CommonFields;
            const workflowObj = {
              createdBy,
              title,
              description,
              path: data?.authoring_createContent?.path,
              workflow_status: workflowKeys.draft,
              tag_name: capitalizeFirstLetter(ContentType.Event),
              last_modifiedBy: createdBy,
            };
            if (isWorkflow) {
              workflowSubmitRequest(workflowObj, workflowKeys.approve);
            }
            setWorkflow({ ...workflow, ...workflowObj });
          }
        } else {
          const pageUrl = data?.authoring_createContent?.path.substring(
            data?.authoring_createContent?.path.lastIndexOf("/") + 1,
          );
          eventWholeRef.current.page = pageUrl;
          setDraftPageURL(pageUrl);
          if (data?.authoring_createContent?.isExist === true) {
            setOpenPageExistModal(true);
            setPageStatus(pageState);
          } else {
            // ShowToastSuccess(`${t('event')} ${t('published_toast')}`);
            await publishEvent(pageUrl);
            setShowPublishConfirm(true);
          }
        }
      }
    } catch (error: any) {
      if (error?.graphQLErrors[0]) {
        ShowToastError(error.graphQLErrors[0].message);
      } else {
        ShowToastError(t("api_error_toast"));
      }
      setIsLoading(false);
    }
  };

  const updateEvent = async (pageState, isWorkflow = true, props = {}, event_step = "") => {
    setIsLoading(true);
    const newTempData = JSON.parse(JSON.stringify(eventInstance));
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD }
        : updateStructureData(eventState, pageState);

    const updateEventToSend = getUpdateEvent(
      eventState,
      newTempData,
      updateTempObj,
      pageState,
      structureData,
      username,
      currentEventData,
      draftPageURL,
      isFeatured,
    );
    try {
      // Don't remove the data, API call to update the event
      await eventAPIS.updateContentType({
        contenttype: EVENT,
        input: updateEventToSend,
      });

      unsavedChanges.current = false;
      if (pageState && pageState.toLowerCase() === DRAFT.toLowerCase()) {
        setIsLoading(false);
        if (!isWorkflow) {
          ShowToastSuccess(`${t("event")} ${t("updated_toast")}`);
        } else {
          workflowSubmitRequest(props, event_step);
        }
        // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        setShowExitWarning(false);
        setIsEdited(true);
      } else {
        // ShowToastSuccess(`${t("event")} ${t("published_toast")}`);
        await publishEvent(draftPageURL ? draftPageURL : currentEventData.current);
        setShowPublishConfirm(true);
      }
    } catch (error) {
      ShowToastError(t("api_error_toast"));
      setIsLoading(false);
    }
  };

  const pageExistCloseHandle = () => {
    unsavedChanges.current = true;
    setOpenPageExistModal(false);
    setIsLoading(false);
  };

  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    if (pageStatus.toLowerCase() === DRAFT.toLowerCase()) {
      createEvent(DRAFT, true, workflowStatus);
    } else if (pageStatus.toLowerCase() === PUBLISHED.toLowerCase()) {
      createEvent(PUBLISHED, true);
    }
  };

  const crossButtonHandle = () => {
    setShowExitWarning(false);
    setOnSavedModal(false);
    navigate(`?path=${eventWholeRef?.current?.page}`);
  };

  const saveEvent = (status = true, props = {}, event_step = "") => {
    // dispatch(previewContent({}));
    setShowExitWarning(false);
    updateCurrentInstance();
    const currentDateTime = addMinutes(new Date(), 15).toISOString();
    if (eventState?.title === "") {
      ShowToastError(`${t("title")} ${t("is_required")}`);
    } else if (eventStartEndTimeValidation(eventState)) {
      ShowToastError(t(`${eventStartEndTimeValidation(eventState)}`));
    } else if (!validateUrl(eventState?.webLink)) {
      ShowToastError(`${t("weblink_validate")}`);
    } else if (
      eventState?.is_schedule_publish &&
      (eventState?.schedule_publish_datetime === "" ||
        eventState?.schedule_publish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_publish")} ${t("time")} ${t("is_required")}`);
    } else if (
      eventState?.is_schedule_unpublish &&
      (eventState?.schedule_unpublish_datetime === "" ||
        eventState?.schedule_unpublish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_unpublish")} ${t("time")} ${t("is_required")}`);
    } else if (
      eventState?.schedule_publish_datetime &&
      eventState?.schedule_publish_datetime < currentDateTime
    ) {
      ShowToastError(`${t("ss_publish_time")}`);
    } else if (
      eventState?.schedule_unpublish_datetime &&
      eventState?.schedule_unpublish_datetime < eventState?.schedule_publish_datetime
    ) {
      ShowToastError(`${t("schedule_publish_unpublish_validate")}`);
    } else {
      if (!currentEventData.current && isDraft) {
        createEvent(DRAFT, false, status);
      } else {
        updateEvent(DRAFT, status, props, event_step);
      }
    }
  };

  const publish = () => {
    const {
      title,
      short_title: shortTitle,
      description,
      short_description: shortDescription,
      original_image,
      published_images,
      tags,
      address,
      postalCode,
    } = eventState;
    updateCurrentInstance();
    const currentDateTime = addMinutes(new Date(), 15).toISOString();
    if (title === "") {
      ShowToastError(`${t("title")} ${t("is_required")}`);
    } else if (shortTitle === "") {
      ShowToastError(`${t("short_title")} ${t("is_required")}`);
    } else if (description === "") {
      ShowToastError(`${t("description")} ${t("is_required")}`);
    } else if (shortDescription === "") {
      ShowToastError(`${t("short_description")} ${t("is_required")}`);
    } else if (Object.keys(original_image).length === 0 && published_images.length === 0) {
      ShowToastError(`${t("banner_image")} ${t("is_required")}`);
    } else if (address === "") {
      ShowToastError(`${t("event_address")} ${t("is_required")}`);
    } else if (postalCode === "") {
      ShowToastError(`${t("postal_code")} ${t("is_required")}`);
    } else if (tags?.length === 0) {
      ShowToastError(t("tag_error"));
    } else if (eventStartEndTimeValidation(eventState)) {
      ShowToastError(t(`${eventStartEndTimeValidation(eventState)}`));
    } else if (!validateUrl(eventState?.webLink)) {
      ShowToastError(`${t("weblink_validate")}`);
    } else if (
      eventState?.is_schedule_publish &&
      (eventState?.schedule_publish_datetime === "" ||
        eventState?.schedule_publish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_publish")} ${t("time")} ${t("is_required")}`);
    } else if (
      eventState?.is_schedule_unpublish &&
      (eventState?.schedule_unpublish_datetime === "" ||
        eventState?.schedule_unpublish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_unpublish")} ${t("time")} ${t("is_required")}`);
    } else if (
      eventState?.schedule_publish_datetime &&
      eventState?.schedule_publish_datetime < currentDateTime
    ) {
      ShowToastError(`${t("ss_publish_time")}`);
    } else if (
      eventState?.schedule_unpublish_datetime &&
      eventState?.schedule_unpublish_datetime < eventState?.schedule_publish_datetime
    ) {
      ShowToastError(`${t("schedule_publish_unpublish_validate")}`);
    } else {
      if (!currentEventData.current && isDraft) {
        createEvent(PUBLISHED, false, false);
      } else {
        updateEvent(PUBLISHED, false);
      }
    }
  };

  // const handleSelectedImage = async (image, keyName, id?: any) => {
  //   setSelectedImage(image);
  //   try {
  //     const payload = {
  //       bitstreamId: image.bitStreamId,
  //       visibility: "public",
  //     };
  //     // const response = await postRequest("api/v1/assets/image/no-crop", payload);
  //     // const relativeUrl = `${response?.original_image_relative_path}.${response?.ext}`;
  //     if (keyName === IMAGE_URL) {
  //       setEventState({
  //         ...eventState,
  //         imageUrl: image?.Thumbnail,
  //         // socialShareImgURL: relativeUrl,
  //       });
  //       eventWholeRef.current = {
  //         ...eventWholeRef.current,
  //         [keyName]: image?.Thumbnail,
  //         // [SOCIAL_SHARE_IMG_URL]: relativeUrl,
  //       };
  //     } else if (keyName === SOCIAL_SHARE) {
  //       setEventState({
  //         ...eventState,
  //         // socialShareImgURL: relativeUrl,
  //       });
  //       eventWholeRef.current = {
  //         ...eventWholeRef.current,
  //         // [SOCIAL_SHARE_IMG_URL]: relativeUrl,
  //       };
  //     }
  //     unsavedChanges.current = true;
  //   } catch (error) {
  //     if (keyName === IMAGE_URL) {
  //       setEventState({
  //         ...eventState,
  //         imageUrl: image?.Thumbnail,
  //         socialShareImgURL: "",
  //       });
  //       eventWholeRef.current = {
  //         ...eventWholeRef.current,
  //         [keyName]: image?.Thumbnail,
  //         [SOCIAL_SHARE_IMG_URL]: "",
  //       };
  //     } else if (keyName === SOCIAL_SHARE) {
  //       setEventState({
  //         ...eventState,
  //         socialShareImgURL: "",
  //       });
  //       eventWholeRef.current = {
  //         ...eventWholeRef.current,
  //         [SOCIAL_SHARE_IMG_URL]: "",
  //       };
  //     }
  //     unsavedChanges.current = true;
  //     console.log(error);
  //     keyName === SOCIAL_SHARE && ShowToastError(t("api_error_toast"));
  //   }
  // };

  // const toggleGallery = (toggleState, type) => {
  //   setGalleryState(toggleState);
  //   if (type == CANCEL) {
  //     return null;
  //   }
  // };

  const returnBack = () => {
    if (unsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      // dispatch(previewContent({}));
      navigate("/content/event");
    }
  };

  const scrollHandler = () => {
    if (isInViewport(seo, true)) {
      setParentToolTip(SEO);
    } else {
      const active = icons.find((i) => isInViewport(i.id, false));
      if (active && active.tooltip !== parentToolTip) {
        setParentToolTip(active.tooltip);
      }
    }
  };

  useEffect(() => {
    const dataHolder = document.getElementById("scrollableDiv");
    dataHolder?.addEventListener(SCROLL, scrollHandler);

    // if (Object.keys(eventInstance).length === 0 && !params.id) {
    //   const newEvent = getNewEvent(username);
    //   setEventInstance(newEvent);
    // }
    if (currentQuizData.current === "") {
      getWorkflowDetails(
        role,
        login_user_id,
        setWorkflow,
        capitalizeFirstLetter(ContentType.Event),
      );
    }
    return () => {
      window.removeEventListener(SCROLL, scrollHandler);
    };
  }, []);

  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      short_description: shortDesc,
      description,
      imageUrl,
      tags,
    } = eventState;
    if ([title, shortTitle, shortDesc, description, imageUrl].includes("") || tags.length === 0) {
      // setPublishButton(true);
    } else {
      // setPublishButton(false);
    }
  }, [eventState]);

  const handelPreview = () => {
    const tempObj = getPreviewContentData(
      eventState,
      eventWholeRef,
      createdUser.current,
      AUTH_INFO,
      i18n,
    );
    dispatch(previewContent(tempObj));
    navigate("/content/preview");
  };

  const eventAnalyticsHandle = (event) => {
    analyticsRef.current = event;
  };

  const seoEvenDataHandle = (event) => {
    seoRef.current = event;
  };

  const showGalleryHandle = (gType = "", keyName = "") => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setKey(keyName);
  };

  const closeButtonHandle = () => {
    unsavedChanges.current = false;
    // dispatch(previewContent({}));
    navigate("/content/event");
  };

  useEffect(() => {
    if (unsavedChanges.current === true) {
      window.history.pushState(null, "", window.location.pathname + window.location?.search);
      window.addEventListener(BEFORE_UNLOAD, (e) => unloadCallback(e, unsavedChanges.current));
      window.addEventListener(POP_STATE, (e) =>
        onBackButtonEvent(e, unsavedChanges.current, setShowExitWarning, closeButtonHandle),
      );
    }
    return () => {
      window.removeEventListener(BEFORE_UNLOAD, (e) => unloadCallback(e, unsavedChanges.current));
      window.removeEventListener(POP_STATE, (e) =>
        onBackButtonEvent(e, unsavedChanges.current, setShowExitWarning, closeButtonHandle),
      );
    };
  }, [unsavedChanges.current]);

  const getContentByPath = async () => {
    try {
      const data: any = await eventAPIS.fetchContent({
        contentType: EVENT,
        path: currentEventData.current,
      });

      setIsLoading(false);
      const contentObj = data?.authoring_getCmsContentByPath;
      const {
        title,
        short_title: shortTitle,
        short_description: shortDesc,
        description,
        tags,
        settingsProperties,
        banner_image: imageUrl,
        path,
        workflow_status,
        stages,
        tag_name,
        last_modifiedBy,
        createdBy,
        task_status,
        user_id,
        user_name,
        is_featured,
      } = contentObj;
      setIsFeatured(is_featured);
      createdUser.current = createdBy;
      const tempObj = getTempObj(data, contentObj, eventState);
      setWorkflow({
        path,
        workflow_status,
        stages,
        tag_name,
        last_modifiedBy,
        createdBy,
        role,
        title,
        enable: stages?.length > 0 ? true : false,
        login_user_id,
        task_status,
        task_user_id: user_id,
        task_user_name: user_name,
      });
      setEventState(tempObj);
      setEventInstance({
        ...tempObj,
        page_state: data?.authoring_getCmsContentByPath?.page_state,
      });
      eventWholeRef.current = {
        title: title,
        short_title: shortTitle,
        short_description: shortDesc,
        description: description,
        imageUrl: imageUrl,
        tags: tags,
        socialShareImgURL: settingsProperties?.socialog_image,
        short_titleSocialShare: settingsProperties?.socialog_title,
        short_descriptionSocialShare: settingsProperties?.socialog_description,
        tagsSocialShare: settingsProperties?.keywords,
      };
    } catch (err) {
      ShowToastError("Some thing went wrong");
    }
  };

  useEffect(() => {
    if (Object.keys(currentContent).length > 0) {
      eventWholeRef.current = currentContent?.eventWholeRef;
      // setSaveButton(false);
      setPreviewButton(false);
      setEventState(currentContent?.eventState);
    } else if (currentEventData.current && unsavedChanges.current !== true) {
      setIsLoading(true);
      // setSaveButton(false);
      setPreviewButton(false);
      getContentByPath();
    }
  }, [currentContent]);
  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      description,
      short_description: shortDescription,
      address,
      postalCode,
      original_image,
      published_images,
    } = eventState;
    if (
      title === "" ||
      shortTitle === "" ||
      shortDescription === "" ||
      description === "" ||
      address === "" ||
      postalCode === "" ||
      Object.keys(original_image).length === 0 ||
      published_images.length === 0
    ) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [eventState]);

  useEffect(() => {
    // const handleResize = () => {
    //   const { innerHeight } = window;
    //   const ifKeyboardOpen = window.innerHeight < innerHeight;
    //   // setIsKeyboardOpen(ifKeyboardOpen);
    // };
    // const handleScroll = () => {
    //   const { innerHeight } = window;
    //   const ifKeyboardOpen = window.innerHeight < innerHeight;
    //   // setIsKeyboardOpen(ifKeyboardOpen);
    // };
    // window.addEventListener("resize", handleResize);
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);
  const styles = `.sticky-header { position: sticky; top: 0; background-color: #fff; z-index:1} 
  .sticky-header.keyboard-open { position: relative; }`;
  return (
    <>
      <style> {styles} </style>
      {isLoading && <Loader />}
      <Box
        sx={{
          backgroundColor: "#FFF",
        }}>
        {galleryState && (
          // <Gallery
          //   handleImageSelected={handleSelectedImage}
          //   toggleGallery={toggleGallery}
          //   galleryMode={galleryType.current}
          //   keyName={key}
          //   id={answerId}
          // />
          // <DamContentGallery
          //   handleImageSelected={handleSelectedImage}
          //   toggleGallery={toggleGallery}
          //   assetType={galleryType.current === "Images" ? "Image" : "Video"}
          //   keyName={key}
          //   id={answerId}
          // />
          <>gallery</>
        )}
      </Box>
      <Box>
        {/* {isLoading && <Loader />} */}
        <Box>
          <Box>
            <CreateHeader
              // className={isKeyboardOpen ? "sticky-header keyboard-open" : "sticky-header"}
              hasPreviewButton={previewButton}
              showPreview={true}
              handelPreview={handelPreview}
              createText={
                currentQuizData.current
                  ? `${t("edit")} ${t("event")}`
                  : `${t("create")} ${t("event")}`
              }
              // returnBack={returnBack}
              // publishButton={publishButton}
              // saveButton={saveButton}
              // saveorPublish={saveEvent}
              publishText={t("publish")}
              saveText={t("save_as_draft")}
              previewText={t("preview")}
              toolTipText={t("preview_tooltip")}
              saveVariant='secondaryButton'
              // publish={publish}
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Event}
              workflow={workflow}
              setEnableWorkflowHistory={setEnableWorkflowHistory}
              setIsFeatured={setIsFeatured}
              isFeatured={isFeatured}
              handleReturn={returnBack}
              handleSaveOrPublish={saveEvent}
              handlePublish={publish}
            />
            <Divider></Divider>
          </Box>

          <Box
            sx={{
              position: "relative",
              height: {
                sm: "calc(100vh - 125px)",
                xs: "calc(100vh - 45px)",
              },
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            id='scrollableDiv'>
            {!galleryState && !enableWorkflowHistory && (
              <Box
                sx={{
                  position: "fixed",
                  top: "25%",
                  right: { sm: "5px", xs: 0 },
                  zIndex: 1000,
                }}>
                <ContentPageScroll
                  icons={icons}
                  scrollToView={scrollToView}
                  parentToolTip={parentToolTip}
                />
              </Box>
            )}
            {enableWorkflowHistory ? (
              // <WorkflowHistory
              //   workflow={workflow}
              //   setEnableWorkflowHistory={setEnableWorkflowHistory}
              // />
              <>workflow history</>
            ) : (
              <>
                <EventImageAndThumbnail
                  state={eventState}
                  setState={setEventState}
                  eventWholeRef={eventWholeRef}
                  unsavedChanges={unsavedChanges}
                />

                <EventTitleDescription
                  setSaveButton={() => {}}
                  setPreviewButton={setPreviewButton}
                  eventWholeRef={eventWholeRef}
                  state={eventState}
                  setState={setEventState}
                  unsavedChanges={unsavedChanges}
                  setPublishButton={() => {}}
                />

                <EventTimeAndLocation
                  state={eventState}
                  setState={setEventState}
                  unsavedChanges={unsavedChanges}
                />

                <EventScheduleDate
                  state={eventState}
                  setState={setEventState}
                  unsavedChanges={unsavedChanges}
                />

                <EventChooseTags
                  state={eventState}
                  setState={setEventState}
                  eventWholeRef={eventWholeRef}
                  content={currentContent}
                  unsavedChanges={unsavedChanges}
                  isEdit={currentEventData.current ? true : false}
                  setScrollToView={setScrollToView}
                  socialShareExpanded={false}
                />
                <EventSocialShare
                  state={eventState}
                  setState={setEventState}
                  eventWholeRef={eventWholeRef}
                  unsavedChanges={unsavedChanges}
                  showGalleryHandle={showGalleryHandle}
                  selectedImage={selectedImage.Thumbnail}
                />
                <EventAnalytics
                  state={eventState}
                  setState={setEventState}
                  eventAnalyticsHandle={eventAnalyticsHandle}
                  unsavedChanges={unsavedChanges}
                />
                <EventSEO
                  state={eventState}
                  setState={setEventState}
                  eventInstance={eventInstance}
                  seoEvenDataHandle={seoEvenDataHandle}
                  updateStructureData={updateStructureData}
                  unsavedChanges={unsavedChanges}
                  setEditedSD={setEditedSD}
                  isEdited={isEdited}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>

      {showExitWarning && (
        <CommonPlateformXDialog
          isDialogOpen={showExitWarning}
          title={t("save_warn_title")}
          subTitle={t("save_warn_subtitle")}
          closeButtonText={t("stay_here")}
          confirmButtonText={t("take_me_out")}
          closeButtonHandle={() => {
            setShowExitWarning(false);
          }}
          confirmButtonHandle={closeButtonHandle}
          modalType='unsavedChanges'
        />
      )}
      <CommonPlateformXDialog
        isDialogOpen={onSavedModal}
        title={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftTitle)}
        subTitle={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftDescription)}
        closeButtonText={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftCloseText)}
        confirmButtonText={t(SAVE_AS_DRAFT_POP_UP.saveAsDraftConfirmText)}
        confirmButtonHandle={() => navigate("/content/event")}
        closeButtonHandle={crossButtonHandle}
        modalType='draft'
      />

      <CommonPlateformXDialog
        isDialogOpen={showPublishConfirm || showWorkflowSubmit}
        title={t(publishPopup.current.publishTitle)}
        subTitle={
          showPublishConfirm
            ? `${t("your")} ${t("event")} ${t(publishPopup.current.publishDescription)}`
            : t("requested_action")
        }
        confirmButtonText={t(publishPopup.current.publishConfirmText)}
        confirmButtonHandle={() => navigate("/content/event")}
        modalType='publish'
      />
      {openPageExistModal && (
        <CommonPlateformXDialog
          isDialogOpen={openPageExistModal}
          title={t(PAGE_EXIST_POP_UP.saveAsDraftTitle)}
          subTitle={t(PAGE_EXIST_POP_UP.saveAsDraftDescription)}
          closeButtonText={t(PAGE_EXIST_POP_UP.saveAsDraftCloseText)}
          confirmButtonText={t(PAGE_EXIST_POP_UP.saveAsDraftConfirmText)}
          confirmButtonHandle={pageExistYesButtonHandle}
          closeButtonHandle={pageExistCloseHandle}
          crossButtonHandle={pageExistCloseHandle}
          modalType=''
        />
      )}
    </>
  );
};
export default React.memo(CreateEvent);
