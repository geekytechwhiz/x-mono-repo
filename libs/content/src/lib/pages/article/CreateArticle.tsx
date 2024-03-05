/* eslint-disable require-atomic-updates */
import { Box } from "@mui/material";
import { articleApi, commentsApi, useComment, useWorkflow } from "@platformx/authoring-apis";
import { RootState, handleDialog, previewContent } from "@platformx/authoring-state";
import {
  AUTH_INFO,
  Loader,
  ShowToastError,
  ShowToastSuccess,
  ThemeConstants,
  WarningIcon,
  capitalizeFirstLetter,
  getCurrentLang,
  i18next,
  nullToObject,
  successGif,
  useUserSession,
  workflowKeys,
} from "@platformx/utilities";
import { DamContentGallery, usePostImageCrop } from "@platformx/x-image-render";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY_CONTENT, ContentType, DRAFT, PUBLISHED } from "../../utils/Constants";
import { onBackButtonEvent, unloadCallback } from "../../utils/Helper";
import { useStyles } from "./CreateArticle.styles";
import {
  ArticleInitialState,
  articleInitialObj,
  handleTagOnChange,
  requestToSendArticle,
  resetImageSelected,
  updateImageData,
  updateStructureData,
  validateDetails,
} from "./Utils/helperFunction";
import { ArticleDetails } from "./components/ArticleDetails/ArticleDetails";
import PublishModal from "./components/PublishModal/PublishModal";
import TopBar from "./components/TopBar/TopBar";

export const CreateArticle = () => {
  const { currentContent } = useSelector((state: RootState) => state.content);
  const { postRequest } = usePostImageCrop();
  const classes = useStyles();
  const [onHover, setOnHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<any>({});
  const [tagData, setTagData] = useState<any>({});
  const [isFeatured, setIsFeatured] = useState(false);
  const [tagArr, setTagArr] = useState<any>([]);
  const tagArrRef = useRef({ tags: [] });
  const [socialOgTags, setSocialOgTags] = useState({ tagsSocialShare: [] });
  const [articleInstance, setArticleInstance] = useState<any>(ArticleInitialState);
  const [getSession] = useUserSession();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [checkDesc, setCheckDesc] = useState("");
  const compareInstance = useRef({});
  const { t } = useTranslation();
  const [previewButton, setPreviewButton] = useState(true);
  const { userInfo, role } = getSession();
  const params = useParams();
  const articlePageUrl = new URL(window.location.href);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>("Images");
  const [operationType, setOperationType] = useState<string>("");
  const [showMediaOption, setShowMediaOption] = useState(true);
  const [isClickedPublish, setIsClickedPublish] = useState(false);
  const count = useRef(0);
  const unsavedChanges = useRef<boolean>(false);
  const [timerState, setTimerState] = useState(
    localStorage.getItem("articleTimerState") ? true : false,
  );
  const [lastmodifiedDate, setLastmodifiedDate] = useState(new Date().toISOString());
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const pathRef = useRef();
  const currentArticleData = useRef(
    articlePageUrl.searchParams.get("path")
      ? (articlePageUrl.searchParams.get("path") as string)
      : "",
  );
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const login_user_id = userInfo?.user_id;
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: "",
    Title: "",
    Description: "",
    bitStreamId: "",
  });
  const [workflow, setWorkflow] = useState({});
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const [isArticleCrop, setIsArticleCrop] = useState(0);
  const [enableWorkflowHistory, setEnableWorkflowHistory] = useState<boolean>(false);
  const { comments } = useComment();
  const [isReload, setIsReload] = useState(false);

  const imageCropHandle = () => {
    setIsArticleCrop(() => isArticleCrop + 1);
  };

  const toggleGallery = (toggleState, type, keyName) => {
    setGalleryState(toggleState);
    setShowMediaOption(true);
    keyName !== "social_img" && isClickedPublish && handleClickOpen();
  };

  const showGallery = (gType, keyName = "") => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setShowMediaOption(false);
    setKey(keyName);
  };

  const onUploadClick = (type, action) => {
    showGallery(type);
    count.current = 0;
    setOperationType(action);
  };

  useEffect(() => {
    if (Object.keys(articleInstance).length === 0 && !params.id) {
      const newArticle = articleInitialObj(username);
      setArticleInstance(newArticle);
      compareInstance.current = newArticle;
    }
    if (currentArticleData.current === "") {
      getWorkflowDetails(role, login_user_id, setWorkflow, capitalizeFirstLetter("article"));
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(!open);
    setIsClickedPublish(!isClickedPublish);
  };
  const handleClose = () => {
    setOpen(false);
    // setIsClickedPublish(false);
  };

  const getTags = async () => {
    try {
      const res: any = await articleApi.getTags({
        start: 0,
        rows: 1000,
      });
      if (res?.authoring_getTagsList) {
        setTagData(res?.authoring_getTagsList);
      }
    } catch (err: any) {
      // console.log(JSON.stringify(err, null, 2));
    }
  };

  const handleTags = (event) => {
    handleTagOnChange(event, tagArr, setTagArr, tagArrRef, socialOgTags, setSocialOgTags);
  };

  const requestToSend = (pageState, pageUrl, IsDuplicate) => {
    const createArticleRequest = requestToSendArticle(
      pageState,
      pageUrl,
      IsDuplicate,
      articleInstance,
      tagArrRef,
      socialOgTags,
      updateStructureDataArticle,
      username,
      isFeatured,
    );
    return createArticleRequest;
  };
  //create comment
  const createComment = () => {
    const currentLanguage = getCurrentLang();
    const createCommentRequest = {
      document_path: `/content/documents/hclplatformx/${currentLanguage}/article/${currentArticleData.current}`,
      status: false,
      document_type: "Article",
      created_by: username, //articleInstance.CommonFields.createdBy,
      last_modified_by: username,
      reviewer_comments: [comments],
    };

    return commentsApi.createOrUpdateComment({
      input: createCommentRequest,
    });
  };
  const createArticle = (pageState, pageUrl, IsDuplicate = false) => {
    const createArticleRequest = requestToSend(pageState, pageUrl, IsDuplicate);
    return articleApi.createArticle({
      contentType: "Article",
      input: createArticleRequest,
    });
  };
  const updateArticle = (pageState, pageUrl, IsDuplicate = false) => {
    const updateArticleRequest = requestToSend(pageState, pageUrl, IsDuplicate);
    return articleApi.updateArticle({
      contentType: "Article",
      input: updateArticleRequest,
    });
  };
  const publishArticle = (pageUrl) => {
    const publishedRequest = {
      page: pageUrl,
    };
    return articleApi.publishArticle({
      contentType: "Article",
      input: publishedRequest,
    });
  };
  const articleDetails = () => {
    return articleApi.fetchArticleDetails({
      contentType: "Article",
      path: currentArticleData.current,
    });
  };
  const getArticleData = async () => {
    setIsLoading(true);
    try {
      const detailsRes: any = await articleDetails();
      setIsLoading(false);
      if (detailsRes?.authoring_getCmsContentByPath !== null) {
        const articleObj = detailsRes?.authoring_getCmsContentByPath;
        const {
          title,
          description,
          banner,
          published_images,
          original_image,
          tags,
          settingsProperties,
          sub_title,
          structure_data,
          createdBy,
          lastModifiedBy,
          seo_enable,
          analytics_enable,
          path,
          workflow_status,
          stages,
          tag_name,
          last_modifiedBy,
          page,
          task_status,
          user_id,
          user_name,
          is_featured,
        } = articleObj;
        setIsFeatured(is_featured);
        const instance = {
          ...articleInstance,
          CommonFields: {
            ...articleInstance.CommonFields,
            title,
            description,
            tags,
            settings: settingsProperties,
            structure_data: structure_data,
            createdBy,
            seo_enable,
            analytics_enable,
            lastModifiedBy,
          },
          ObjectFields: {
            ...articleInstance.ObjectFields,
            banner,
            published_images,
            original_image,
            sub_title,
          },
        };
        setWorkflow({
          title,
          description,
          path,
          workflow_status,
          stages,
          tag_name,
          last_modifiedBy,
          createdBy,
          role,
          page,
          enable: stages?.length > 0 ? true : false,
          login_user_id,
          task_status,
          task_user_id: user_id,
          task_user_name: user_name,
        });
        setArticleInstance({ ...instance });
        compareInstance.current = { ...instance };
        setSocialOgTags({
          ...socialOgTags,
          tagsSocialShare: settingsProperties.keywords,
        });
        setContent({
          ...content,
          Url: banner,
          Title: sub_title,
          bitStreamId: original_image.bitStreamId,
        });
        setCheckDesc(description);
        tagArrRef.current = {
          ...tagArrRef.current,
          tags: tags,
        };
        setTagArr(tags);
      }
    } catch (err: any) {
      setIsLoading(false);
      ShowToastError(
        err.graphQLErrors.length > 0 ? err.graphQLErrors[0].message : t("api_error_toast"),
      );
    }
  };

  useEffect(() => {
    setIsReload(!isReload);
    getTags();
    if (timerState) {
      localStorage.setItem("articleTimerState", "true");
    }
  }, [comments, timerState]);

  useEffect(() => {
    if (Object.keys(currentContent)?.length > 0) {
      const {
        title,
        description,
        banner,
        published_images,
        original_image,
        tags,
        settings,
        sub_title,
        structure_data,
        createdBy,
        article_settings,
        seo_enable,
        analytics_enable,
        creationDate,
      } = currentContent;
      setCheckDesc(description);
      const instance = {
        ...articleInstance,
        CommonFields: {
          ...articleInstance.CommonFields,
          title,
          description,
          tags,
          settings,
          structure_data,
          createdBy,
          seo_enable,
          analytics_enable,
          creationDate,
        },
        ObjectFields: {
          ...articleInstance.ObjectFields,
          banner,
          published_images,
          original_image,
          sub_title,
        },
      };
      setArticleInstance({ ...instance });
      compareInstance.current = { ...instance };
      setSocialOgTags({
        ...socialOgTags,
        tagsSocialShare: article_settings.keywords,
      });
      setContent({
        ...content,
        Url: banner, //original_image.Thumbnail,
        Title: sub_title,
        bitStreamId: original_image.bitStreamId,
      });

      tagArrRef.current = {
        ...tagArrRef.current,
        tags: tags,
      };
      setTagArr(tags);
      // setTagArr(content?.currentContent?.tagsSocialShare);
    } else if (currentArticleData.current) {
      getArticleData();
    }
  }, []);
  const validateArticleDetails = (isPublish = false) => {
    return validateDetails(articleInstance, tagArrRef, isPublish);
  };
  const navigateTo = () => {
    unsavedChanges.current = false;
    navigate("/content/article");
    //clearComment();
    // dispatch(previewContent({}));
  };
  const enableDialog = (type = "") => {
    const dialogContent = {
      imageIcon: successGif,
      isOpen: true,
      title: t("congratulations"),
      subTitle: type === workflowKeys.approve ? t("article_publish_popoup") : t("requested_action"),
      rightButtonText: t("go_to_listing"),
      handleCallback: navigateTo,
    };
    dispatch(handleDialog(dialogContent));
  };
  const exitWarnDialog = (type) => {
    const dialogContent = {
      imageIcon: WarningIcon,
      isOpen: true,
      title: t("save_warn_title"),
      subTitle: t("save_warn_subtitle"),
      leftButtonText: t("Stay Here"),
      rightButtonText: t("take_me_out"),
      handleCallback: navigateTo,
    };
    dispatch(handleDialog(dialogContent));
  };
  const onSave = async (isWorkflow = true, props = {}, event_step = "") => {
    if (!validateArticleDetails()) {
      setIsLoading(true);
      setOpen(false);
      try {
        const articleCommonFields = articleInstance?.CommonFields || {};
        const { title } = articleCommonFields;
        const pageURL =
          !isDraft || currentArticleData.current
            ? pathRef.current || currentArticleData.current
            : title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();

        if (currentArticleData.current || !isDraft) {
          const detailsRes: any = await updateArticle(DRAFT, pageURL);
          if (detailsRes.authoring_updateContent.message === "Successfully updated!!!") {
            if (!isWorkflow) {
              ShowToastSuccess(`${t("article")} ${t("updated_toast")}`);
              getArticleData();
            } else {
              const { workflow_status, success } = await workflowRequest(props, event_step);
              if (success) {
                workflow_status === workflowKeys.publish.toLowerCase() && enableDialog(event_step);
              }
            }
            pathRef.current = detailsRes.authoring_updateContent?.path.substring(
              detailsRes.authoring_updateContent?.path.lastIndexOf("/") + 1,
            );
            setIsLoading(false);
            setTimerState(true);

            setLastmodifiedDate(new Date().toISOString());

            unsavedChanges.current = false;
          } else {
            ShowToastSuccess(detailsRes.authoring_updateContent.message);
          }
        } else {
          const detailsRes: any = await createArticle(DRAFT, pageURL);
          if (detailsRes.authoring_createContent.message === "Successfully created!!!") {
            if (!isWorkflow) {
              ShowToastSuccess(`${t("article")} ${t("saved_toast")}`);
            }
            // setOnSavedModal(true);
            setIsDraft(false);
            setTimerState(true);
            setLastmodifiedDate(new Date().toISOString());
            pathRef.current = detailsRes.authoring_createContent?.path.substring(
              detailsRes.authoring_createContent?.path.lastIndexOf("/") + 1,
            );
            // eslint-disable-next-line no-shadow
            const { createdBy, title, description } = articleInstance.CommonFields;
            const workflowObj = {
              createdBy,
              title,
              description,
              path: detailsRes.authoring_createContent?.path,
              workflow_status: workflowKeys.draft,
              tag_name: capitalizeFirstLetter(ContentType.Article),
              last_modifiedBy: createdBy,
            };
            if (isWorkflow) {
              const { success } = await workflowRequest(workflowObj, workflowKeys.approve);
              if (success) {
                enableDialog();
              }
            }
            setWorkflow({ ...workflow, ...workflowObj });
            setIsLoading(false);
            unsavedChanges.current = false;
          } else {
            ShowToastSuccess(detailsRes.authoring_createContent.message);
          }
        }
      } catch (err: any) {
        setIsLoading(false);
        setTimerState(false);
        setLastmodifiedDate("");

        ShowToastError(
          err.graphQLErrors.length > 0 ? err.graphQLErrors[0].message : t("api_error_toast"),
        );
      }
    }
  };
  const onPublish = async () => {
    if (!validateArticleDetails(true)) {
      try {
        setIsLoading(true);
        setOpen(false);
        const articleCommonFields = articleInstance?.CommonFields || {};
        const { title } = articleCommonFields;
        const pageURL =
          currentArticleData.current || !isDraft
            ? currentArticleData.current || pathRef.current
            : title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
        const detailsRes: any =
          currentArticleData.current || !isDraft
            ? await updateArticle(PUBLISHED, pageURL)
            : await createArticle(PUBLISHED, pageURL);
        const updatedPagePath =
          currentArticleData.current || !isDraft
            ? detailsRes.authoring_updateContent.path
            : detailsRes.authoring_createContent.path;
        if (
          currentArticleData.current || !isDraft
            ? detailsRes.authoring_updateContent.message === "Successfully updated!!!"
            : detailsRes.authoring_createContent.message === "Successfully created!!!"
        ) {
          try {
            //call Publish api for article
            const response: any = await publishArticle(
              updatedPagePath.substring(updatedPagePath.lastIndexOf("/") + 1),
            );
            if (response.authoring_publishContent.message === "Article published successfully") {
              enableDialog(workflowKeys.approve);
              setIsLoading(false);
              setTimerState(true);
              setLastmodifiedDate(new Date().toISOString());
            } else {
              ShowToastSuccess(response.authoring_publishContent.message);
            }
          } catch (err: any) {
            setTimerState(false);
            setLastmodifiedDate("");

            ShowToastError(
              err.graphQLErrors.length > 0 ? err.graphQLErrors[0].message : t("api_error_toast"),
            );
          }
        } else {
          ShowToastSuccess(
            currentArticleData.current
              ? detailsRes.authoring_updateContent.message
              : detailsRes.authoring_createContent.message,
          );
        }
      } catch (err: any) {
        ShowToastError(
          err.graphQLErrors.length > 0 ? err.graphQLErrors[0].message : t("api_error_toast"),
        );
      }
    }
  };
  const resetSelectedImage = () => {
    resetImageSelected(setContent, setSelectedImage);
  };
  const updateImageField = (obj) => {
    updateImageData(obj, content, setArticleInstance, articleInstance, selectedImage);
  };
  const handelPreview = () => {
    const { title, creationDate: developed_date } = articleInstance.CommonFields;
    const pageUrl = currentArticleData.current
      ? currentArticleData.current
      : title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
    const article_settings = {
      socialog_url: `${AUTH_INFO.publishUri + i18next.language}/article/${pageUrl}`,
      keywords: socialOgTags.tagsSocialShare,
    };
    const current_page_url = `/${pageUrl}`;
    const banner = content?.Url;
    const sub_title = content?.Title;
    const { tags } = tagArrRef.current;
    const articlePreview = {
      ...articleInstance.CommonFields,
      ...articleInstance.ObjectFields,
      // title,
      // description,
      tags,
      page_lastmodifiedby: username,
      developed_date,
      banner,
      current_page_url,
      article_settings,
      sub_title,
    };

    dispatch(previewContent(articlePreview));

    navigate("/article-preview");
  };
  const updateStructureDataArticle = () => {
    const contentData = articleInstance?.CommonFields || {};
    const { title } = contentData;
    const pageURL = currentArticleData.current
      ? currentArticleData.current
      : title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
    const articleObjectFields = articleInstance?.ObjectFields || {};
    const { banner } = articleObjectFields || {};
    const tags = JSON.parse(JSON.stringify(tagArrRef.current));
    return updateStructureData(contentData, banner, tags.tags, pageURL);
  };

  useEffect(() => {
    if (JSON.stringify(articleInstance) === JSON.stringify(compareInstance.current)) {
      unsavedChanges.current = false;
    } else {
      unsavedChanges.current = true;
    }
    const { title } = articleInstance?.CommonFields || {};
    const { banner } = articleInstance?.ObjectFields || {};

    if (title === "" || banner === "" || checkDesc === "") {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [articleInstance, checkDesc]);

  const returnBack = () => {
    if (unsavedChanges.current) {
      exitWarnDialog(true);
    } else {
      navigate("/content/article");
    }
  };
  const handleCallback = (data) => {
    if (data) {
      const { ext, original_image_relative_path = "" } = nullToObject(data);
      const relativeUrl = `${original_image_relative_path}.${ext}`;
      setArticleInstance({
        ...articleInstance,
        CommonFields: {
          ...articleInstance.CommonFields,
          settings: {
            ...articleInstance.CommonFields.settings,
            socialog_image: relativeUrl,
          },
        },
      });
    }
  };

  const handleSelectedImage = async (image, keyName) => {
    if (keyName === "social_img") {
      setShow(true);
      const payload = {
        bitstreamId: image.bitStreamId,
        visibility: "public",
      };
      await postRequest("api/v1/assets/image/no-crop", payload, handleCallback);
    } else {
      setSelectedImage(image);
      setContent({
        Url: image.Thumbnail,
        Title: image.Title,
        Description: image.Description,
        bitStreamId: image.bitStreamId,
      });
      setShowMediaOption(true);
    }
  };

  useEffect(() => {
    if (unsavedChanges.current === true) {
      // eslint-disable-next-line no-restricted-globals
      window.history.pushState(null, "", window.location.pathname + location?.search);
      window.addEventListener("beforeunload", (e) => unloadCallback(e, unsavedChanges.current));
      window.addEventListener("popstate", (e) =>
        onBackButtonEvent(e, unsavedChanges.current, exitWarnDialog, navigateTo),
      );
    }
    return () => {
      window.removeEventListener("beforeunload", (e) => unloadCallback(e, unsavedChanges.current));
      window.removeEventListener("popstate", (e) =>
        onBackButtonEvent(e, unsavedChanges.current, exitWarnDialog, navigateTo),
      );
    };
  }, [unsavedChanges.current, articleInstance]);

  return (
    <Box
      className={classes.containerStyle}
      onClick={() => setOnHover(false)}
      sx={{
        overflowY: galleryState ? "hidden" : "scroll",
      }}>
      {isLoading && <Loader />}
      <Box
        sx={{
          backgroundColor: ThemeConstants.WHITE_COLOR,
        }}>
        {galleryState && (
          <DamContentGallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            assetType={galleryType.current === "Images" ? "Image" : "Video"}
            keyName={key}
            isCrop={false}
            dialogOpen={galleryState}
          />
        )}
      </Box>
      <TopBar
        returnBack={returnBack}
        createText={t("publish")}
        handleClickOpen={handleClickOpen}
        onSave={onSave}
        handelPreview={handelPreview}
        state={articleInstance}
        setState={setArticleInstance}
        socialOgTags={socialOgTags}
        setSocialOgTags={setSocialOgTags}
        showGallery={showGallery}
        setOperationType={setOperationType}
        show={show}
        setShow={setShow}
        updateStructureDataArticle={updateStructureDataArticle}
        previewButton={previewButton}
        toolTipText={t("preview_tooltip")}
        category={CATEGORY_CONTENT}
        subCategory={ContentType.Article}
        createComment={createComment}
        workflow={workflow}
        timerState={timerState}
        lastmodifiedDate={lastmodifiedDate}
        setEnableWorkflowHistory={setEnableWorkflowHistory}
        setIsFeatured={setIsFeatured}
        isFeatured={isFeatured}
      />
      {enableWorkflowHistory ? (
        // <WorkflowHistory workflow={workflow} setEnableWorkflowHistory={setEnableWorkflowHistory} />
        <>WorkflowHistory</>
      ) : (
        <ArticleDetails
          returnBack={returnBack}
          onHover={onHover}
          setOnHover={setOnHover}
          content={content}
          setContent={setContent}
          state={articleInstance}
          setState={setArticleInstance}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          onUploadClick={onUploadClick}
          showMediaOption={showMediaOption}
          setShowMediaOption={setShowMediaOption}
          operationType={operationType}
          resetSelectedImage={resetSelectedImage}
          updateImageField={updateImageField}
          setIsClickedPublish={setIsClickedPublish}
          count={count}
          imageCropHandle={imageCropHandle}
          isArticleCrop={isArticleCrop}
          id={params.id}
          setCheckDesc={setCheckDesc}
          workflow={workflow}
        />
      )}
      <PublishModal
        open={open}
        handleClose={handleClose}
        content={content}
        tagData={tagData}
        selectedTag={tagArr}
        handleTagOnChange={handleTags}
        onPublish={onPublish}
        onUploadClick={onUploadClick}
        selectedImage={selectedImage}
        state={articleInstance}
        operationType={operationType}
        resetSelectedImage={resetSelectedImage}
        updateImageField={updateImageField}
        isUploadArticle
        count={count}
        imageCropHandle={imageCropHandle}
        category={CATEGORY_CONTENT}
        subCategory={ContentType.Article}
        workflow={workflow}
        handleClickOpen={handleClickOpen}
        onSave={onSave}
        createComment={createComment}
      />
    </Box>
  );
};
