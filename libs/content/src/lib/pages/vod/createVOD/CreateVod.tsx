import { useLazyQuery, useMutation } from "@apollo/client";
import "./createVod.css";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useStyles } from "./createVod.styles";
import { DspaceObject } from "./createVod.types";
import TagListing from "../Components/TagListing";
import icons, { DEF_VOD } from "./Utils/constats";
import { useDispatch, useSelector } from "react-redux";
import { ContentType } from "../../../enums/ContentType";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import ContentPageScroll from "../../../components/ContentPageScroll";
import { RootState, previewContent } from "@platformx/authoring-state";
import { HeadButton } from "../Components/CreateHeaderButtons/HeadButton";
import { DamContentGallery, XImageRender } from "@platformx/x-image-render";
import { ChooseVideoTray } from "./components/chooseVideoTray/ChooseVideoTray";
import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  createVodInstance,
  isPublishVodHandle,
  removeVODDuplicateTag,
  updateStructureData,
  updateVodSettings,
} from "./Utils/helper";
import {
  create_vod,
  update_vod,
  publish_vod,
  useWorkflow,
  fetchVodById,
  FETCH_TAG_LIST_QUERY,
} from "@platformx/authoring-apis";
import {
  TextBox,
  useAccess,
  workflowKeys,
  AutoTextArea,
  TitleSubTitle,
  useUserSession,
  ShowToastError,
  MarkedFeatured,
  PlateformXDialog,
  ShowToastSuccess,
  CATEGORY_CONTENT,
  CommonBoxWithNumber,
  capitalizeFirstLetter,
  PlateformXDialogSuccess,
} from "@platformx/utilities";

export const CreateVod = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { canAccessAction } = useAccess();
  const navigate = useNavigate();
  const params = useParams();
  const updateTempObj = useRef<any>({});
  const { currentContent } = useSelector((state: RootState) => state.content);
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();
  const login_user_id = userInfo?.user_id;
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const vodPageUrl = new URL(window.location.href);
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const galleryType = useRef<string>("Video");
  const disableSave = useRef<boolean>(false);
  // const [workflowStatus, setWorkflowStatus] = useState(true);
  const [, setShowWorkflowSubmit] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [stateManage, setStateManage] = useState<any>({});
  const [draftPageURL, setDraftPageURL] = useState<string>("");
  const [runFetchVodById] = useLazyQuery(fetchVodById);
  const [parentToolTip] = useState("");
  // const [scrollToView, setScrollToView] = useState("");
  const [runFetchTagList] = useLazyQuery(FETCH_TAG_LIST_QUERY);
  const [mutatePublish] = useMutation(publish_vod);
  const currentVodData = useRef(
    vodPageUrl.searchParams.get("path") ? (vodPageUrl.searchParams.get("path") as string) : "",
  );
  const [createVodMutate] = useMutation(create_vod);
  const [updateVodMutate] = useMutation(update_vod);
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [tagData, setTagData] = useState<any>({});
  const [selectedTag, setSelectedTag] = useState<any>([]);
  const [vodInstance, setVodInstance] = useState<any>({});
  const [workflow, setWorkflow] = useState({});
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const unsavedChanges = useRef<boolean>(currentContent.isUnsavedVod);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const vodRef = useRef<any>(currentContent ? currentContent : DEF_VOD);
  const tagRef = useRef<any>([]);
  const [isDraftDisabled, setDraftDisabled] = useState<boolean>(true);

  const workflowSubmitRequest = async (workflowObj, status) => {
    const { success, workflow_status } = await workflowRequest(workflowObj, status);
    if (success) {
      workflow_status === workflowKeys.publish.toLowerCase() && status === workflowKeys.approve
        ? setShowPublishConfirm(true)
        : setShowWorkflowSubmit(true);
    }
  };

  const updateField = (updatedPartialObj, callPreview = false) => {
    updateTempObj.current = updatedPartialObj;
    const modifiedVod = {
      ...JSON.parse(JSON.stringify(vodInstance)),
      ...updatedPartialObj,
      lastModifiedDate: new Date(),
    };
    setVodInstance(modifiedVod);
    if (callPreview) {
      dispatch(previewContent({ ...modifiedVod, contentType: "Vod" }));
      navigate("/content/preview");
    }
  };

  /**
   * thumbnail update
   */
  const updateImageField = (updatedPartialObj) => {
    setStateManage({ ...stateManage, Thumbnail: updatedPartialObj?.selected_img?.Thumbnail });
    vodRef.current.Thumbnail = updatedPartialObj?.selected_img?.Thumbnail;
    // updateTempObj.current = updatedPartialObj;
    const modifiedVod = {
      ...JSON.parse(JSON.stringify(vodInstance)),
      Thumbnail: updatedPartialObj?.selected_img?.Thumbnail,
      lastModifiedDate: new Date(),
    };
    setVodInstance(modifiedVod);
  };

  const updateCurrentInstance = (pageURL, callPreview = false) => {
    const videoTags = vodRef?.current?.Tags ? vodRef?.current?.Tags : tagRef.current;
    const updatedObj = {
      Page: pageURL ? pageURL : vodRef?.current?.Page,
      Title: vodRef?.current?.Title,
      Description: vodRef?.current?.Description,
      Thumbnail: vodRef?.current?.Thumbnail,
      DsapceVideoUrl: vodRef?.current?.DsapceVideoUrl,
      Tags: removeVODDuplicateTag(videoTags),
      CurrentPageURL: `/${pageURL}`,
      PageSettings: {
        ...updateVodSettings(vodRef, currentVodData, i18n.language),
      },
      is_featured: isFeatured,
    };
    updateField(updatedObj, callPreview);
  };

  const handelPreview = () => {
    if (!currentVodData.current) {
      updateCurrentInstance(
        vodRef?.current?.Title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase(),
        true,
      );
    } else {
      updateCurrentInstance(currentVodData.current, true);
    }
  };

  const exitWithoutSave = () => {
    setShowExitWarning(false);
    setIsEdited(false);
    navigate("/content/vod");
  };

  const createVod = (pageState, pageExist, isWorkflow = true) => {
    const structureData = updateStructureData(vodRef);
    const vodToSend = {
      ...JSON.parse(JSON.stringify(vodInstance)),
      ...updateTempObj.current,
      Page_State: pageState,
      IsConfirm: pageExist,
      StructureData: JSON.stringify(structureData),
      is_featured: isFeatured,
    };
    delete vodToSend?.contentType;
    createVodMutate({
      variables: {
        input: { ...vodToSend, lastModifiedDate: new Date() },
      },
    })
      .then((resp) => {
        if (resp?.data?.authoring_createVod?.isExist) {
          setOpenPageExistModal(true);
        } else {
          const { Page_CreatedBy, Title, Description } = vodToSend;
          const workflowObj = {
            createdBy: Page_CreatedBy,
            title: Title,
            description: Description,
            path: resp?.data?.authoring_createVod?.path,
            workflow_status: workflowKeys.draft,
            tag_name: capitalizeFirstLetter(ContentType.Vod),
            last_modifiedBy: Page_CreatedBy,
          };
          setWorkflow({ ...workflow, ...workflowObj });
          unsavedChanges.current = false;
          setOpenPageExistModal(false);
          setIsDraft(false);
          ShowToastSuccess(`${t("vod")} ${t("created_toast")}`);
          const pageUrl = resp?.data?.authoring_createVod?.path.substring(
            resp?.data?.authoring_createVod?.path.lastIndexOf("/") + 1,
          );
          vodRef.current.Page = pageUrl;
          setDraftPageURL(pageUrl);
        }
      })
      .catch((error) => {
        if (error?.graphQLErrors[0]) {
          ShowToastError(error?.graphQLErrors[0]?.message);
        } else {
          ShowToastError(t("api_error_toast"));
        }
      });
  };

  const updateVOD = (isWorkflow) => {
    const structureData = updateStructureData(vodRef);
    const updateVodToSend = {
      ...updateTempObj.current,
      ...JSON.parse(JSON.stringify(vodInstance)),
      StructureData: JSON.stringify(structureData),
      CurrentPageURL: `/${currentVodData.current}`,
      Page: draftPageURL ? draftPageURL : currentVodData.current,
      is_featured: isFeatured,
    };
    delete updateVodToSend.__typename;
    delete updateVodToSend.selected_img;
    delete updateVodToSend.relativeUrl;
    updateVodMutate({
      variables: {
        input: updateVodToSend,
      },
    })
      .then((resp) => {
        const { Page_CreatedBy, Title, Description } = updateVodToSend;
        const workflowObj = {
          createdBy: Page_CreatedBy,
          title: Title,
          description: Description,
          path: resp?.data?.authoring_updateVod?.path,
          workflow_status: workflowKeys.draft,
          tag_name: capitalizeFirstLetter(ContentType.Vod),
          last_modifiedBy: Page_CreatedBy,
        };
        setWorkflow({ ...workflow, ...workflowObj });
        if (isWorkflow) {
          workflowSubmitRequest(workflowObj, workflowKeys.approve);
        }
        ShowToastSuccess(`${t("vod")} ${t("updated_toast")}`);
        unsavedChanges.current = false;
        // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        setShowExitWarning(false);
        setIsEdited(false);
      })
      .catch((error) => {
        ShowToastError(t("api_error_toast"));
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(error, null, 2));
      });
  };

  const saveVod = (status = false) => {
    if (showExitWarning) {
      setShowExitWarning(false);
      setIsEdited(false);
    }
    if (!currentVodData.current && isDraft) {
      const pageURL = vodRef?.current?.Title?.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
      updateCurrentInstance(pageURL);
      createVod("DRAFT", false);
    } else {
      updateVOD(status);
    }
  };

  const publishButtonHandel = () => {
    const pageURL = vodRef?.current?.Title
      ? vodRef?.current?.Title?.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()
      : "";
    const videoTags = vodRef?.current?.Tags ? vodRef?.current?.Tags : tagRef.current;

    const updatedObj = {
      Page: pageURL,
      Title: vodRef?.current?.Title,
      Description: vodRef?.current?.Description,
      Thumbnail: vodRef?.current?.Thumbnail,
      DsapceVideoUrl: vodRef?.current?.DsapceVideoUrl,
      Tags: removeVODDuplicateTag(videoTags),
      CurrentPageURL: `/${pageURL}`,
      PageSettings: {
        ...updateVodSettings(vodRef, currentVodData, i18n.language),
      },
    };
    updateField(updatedObj);
    if (showExitWarning) {
      setShowExitWarning(false);
      setIsEdited(false);
    }
    const structureData = updateStructureData(vodRef);
    const vodToSend = {
      ...JSON.parse(JSON.stringify(vodInstance)),
      ...updateTempObj.current,
      Page_State: "draft",
      Page_PublishedBy: username,
      Page: draftPageURL ? draftPageURL : currentVodData.current ? currentVodData.current : pageURL,
      CurrentPageURL: `/${
        draftPageURL ? draftPageURL : currentVodData.current ? currentVodData.current : pageURL
      }`,
      StructureData: JSON.stringify(structureData),
      is_featured: isFeatured,
    };
    vodInstance.Page_State = "draft";
    const { __typename, relativeUrl, contentType, ...restOpt } = vodToSend;
    const requestdto = {
      page: draftPageURL ? draftPageURL : currentVodData.current ? currentVodData.current : pageURL,
      parentpageurl: "/",
      currentpageurl: `/${
        draftPageURL ? draftPageURL : currentVodData.current ? currentVodData.current : pageURL
      }`,
    };
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    mutatePublish({
      variables: {
        input: requestdto,
        vodRequest: restOpt,
        timeZone: timeZone,
      },
    })
      .then(() => {
        ShowToastSuccess(`${t("vod")} ${t("published_toast")}`);
        unsavedChanges.current = false;
        setShowPublishConfirm(true);
      })
      .catch(() => {
        ShowToastError(t("api_error_toast"));
      });
  };

  //Functions to handle Page Exist modal
  const pageExistNoButtonHandle = () => {
    setOpenPageExistModal(false);
  };

  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    createVod("DRAFT", true);
  };

  const [errors, setErrors] = useState<DspaceObject>({
    DsapceVideoUrl: "",
    Thumbnail: "",
    Title: "",
    Description: "",
    Tags: "",
  });

  const updateThumbnailPicture = (imageObj: any = {}) => {
    const newObj = {
      Thumbnail: imageObj?.Thumbnail,
    };
    setStateManage(newObj);
  };

  const handleSelectedImage = (image) => {
    vodRef.current = { ...vodRef.current, Thumbnail: image?.Thumbnail };
    updateThumbnailPicture(image); //thumbImage update
    unsavedChanges.current = true;
    setIsEdited(true);
  };

  /**
   * update video
   * @param video object
   */
  const handleSelectedVideo = (video) => {
    vodRef.current = {
      ...vodRef.current,
      DsapceVideoUrl: video?.Url,
      Thumbnail: video?.Thumbnail,
      Title: video?.Title,
      Description: video?.Description,
    };
    updateThumbnailPicture(video); //thumbImage update
    unsavedChanges.current = true;
    setIsEdited(true);
    disableSave.current = true;
    setDraftDisabled(false);
  };

  const toggleGallery = (toggleState) => {
    setGalleryState(toggleState);
  };

  const showGallery = (gType) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
  };

  const handleTagOnChange = (event) => {
    let tagsArray: any = vodRef?.current?.Tags ? [...vodRef?.current?.Tags] : [...tagRef.current];

    if (event.target.checked) {
      tagsArray = [...tagsArray, event?.target?.value];
      if (tagsArray?.length > 100) {
        ShowToastError("You cannot select more than 100 tags.");
        return false;
      }
    } else {
      tagsArray.splice(tagsArray.indexOf(event.target.value), 1);
    }
    if (
      // (vod?.currentVod?.Title)
      currentContent?.Title
    ) {
      disableSave.current = false;
    } else {
      disableSave.current = true;
    }
    tagRef.current = tagsArray;
    vodRef.current = { ...vodRef.current, Tags: removeVODDuplicateTag(tagsArray) };
    const tagArrTemp = { ...vodRef.current };
    delete tagArrTemp.Description;
    setSelectedTag(tagsArray);
    setVodInstance({ ...vodInstance, Tags: removeVODDuplicateTag(tagsArray) });
    unsavedChanges.current = true;
    setIsEdited(true);
  };

  const handleChange = (event) => {
    const { name } = event.target;
    vodRef.current = { ...vodRef.current, [name]: event?.target?.value };
    unsavedChanges.current = true;
    setIsEdited(true);
    if (event.target.value !== "") setErrors({ ...errors, [name]: "" });
    const clone = { ...errors };
    if (name === "DsapceVideoUrl" && vodRef?.current?.DsapceVideoUrl !== event?.target?.value) {
      clone.DsapceVideoUrl = "";
    }
    if (name === "Thumbnail" && vodRef?.current?.Thumbnail === event?.target?.value) {
      clone.Thumbnail = "";
    }
    if (name === "Title" && vodRef?.current?.Title === event?.target?.value) {
      clone.Title = "";
    }
    if (event.target.value !== "") {
      clone[name] = "";
    }
    setErrors(clone);
  };

  const backToVodList = () => {
    if (unsavedChanges.current === true) {
      if (
        // vod?.currentVod?.Title
        currentContent?.currentVod?.Title
      ) {
        disableSave.current = false;
      } else {
        disableSave.current = true;
      }
      setShowExitWarning(true);
    } else navigate("/content/vod");
  };

  const unloadCallback = (event) => {
    event.preventDefault();
    if (unsavedChanges.current === true) {
      event.returnValue = "";
      return "";
    } else {
      navigate("/content/vod");
    }
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (unsavedChanges.current) {
      backToVodList();
    } else {
      // eslint-disable-next-line no-restricted-globals
      window.history.pushState(null, "", window.location.pathname + location?.search);
      backToVodList();
    }
  };

  const pageExistCrossButtonHandle = () => {
    setOpenPageExistModal(false);
    // eslint-disable-next-line no-restricted-globals
    window.history.pushState(null, "", window.location.pathname + location?.search);
    window.addEventListener("popstate", onBackButtonEvent);
  };

  const onUploadClick = (type) => {
    showGallery(type);
  };

  useEffect(() => {
    if (Object.keys(vodInstance).length === 0 && !params.id) {
      setVodInstance(createVodInstance(username));
    }
    if (currentVodData.current === "") {
      getWorkflowDetails(role, login_user_id, setWorkflow, capitalizeFirstLetter(ContentType.Vod));
    }
  }, []);

  useEffect(() => {
    if (isEdited) {
      // eslint-disable-next-line no-restricted-globals
      window.history.pushState(null, "", window.location.pathname + location?.search);
    }
    window.addEventListener("beforeunload", unloadCallback);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [isEdited]);

  const tagListComponent = React.useMemo(
    () =>
      tagData &&
      tagData.length > 0 &&
      tagData.map((categories, index) => {
        return (
          <TagListing
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            categories={categories}
            updateTagField={handleTagOnChange}
            selectedTags={vodInstance?.Tags}
          />
        );
      }),
    [tagData, selectedTag, vodInstance?.Tags],
  );

  useEffect(() => {
    if (
      (Object.keys(
        // vod?.currentVod
        currentContent,
      ).length > 0 &&
        params.id) ||
      Object.keys(
        // vod?.currentVod
        currentContent,
      ).length
    ) {
      // setVodInstance(vod?.currentVod);
      setVodInstance(currentContent);
    } else if (params.id) {
      runFetchVodById({
        variables: { folder: "vodcontent", path: currentVodData.current },
      })
        .then((resp) => {
          if (resp?.data?.authoring_getCmsVodByPath) {
            const vodObj = resp?.data?.authoring_getCmsVodByPath;
            const tempdata = { ...vodObj };
            delete tempdata.__typename;
            setVodInstance(tempdata);
          }
        })
        .catch((err) => {
          console.error("runFetchErr ", err, JSON.stringify(err, null, 2));
        });
    }
  }, [
    // vod
    currentContent,
    params.id,
  ]);

  useEffect(() => {
    if (currentVodData.current && unsavedChanges.current !== true) {
      runFetchVodById({
        variables: { folder: "vodcontent", path: currentVodData.current },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsVodByPath) {
            vodRef.current = {
              // ...vodRef.current,
              Page: res?.data?.authoring_getCmsVodByPath?.Page || "",
              DsapceVideoUrl: res?.data?.authoring_getCmsVodByPath?.DsapceVideoUrl,
              Thumbnail: res?.data?.authoring_getCmsVodByPath?.Thumbnail,
              Title: res?.data?.authoring_getCmsVodByPath?.Title,
              Description: res?.data?.authoring_getCmsVodByPath?.Description,
              Tags: removeVODDuplicateTag(res?.data?.authoring_getCmsVodByPath?.Tags),
              is_featured: isFeatured,
            };
            updateThumbnailPicture(res?.data?.authoring_getCmsVodByPath); //update
            // setStateManage({Thumbnail:})
            updateField(res?.data?.authoring_getCmsVodByPath);
            updateTempObj.current = res?.data?.authoring_getCmsVodByPath;
            delete updateTempObj.current.__typename;

            const {
              path,
              workflow_status,
              stages,
              tag_name,
              last_modifiedBy,
              createdBy,
              title,
              task_status,
              user_id,
              user_name,
              is_featured,
            } = res.data.authoring_getCmsVodByPath;
            setIsFeatured(is_featured);

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
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(err, null, 2));
        });
    }
    if (Object.keys(tagData).length === 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            setTagData(res?.data?.authoring_getTagsList);
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(err, null, 2));
        });
    }
  }, []);

  useEffect(() => {
    if (!currentVodData.current && tagData?.length > 0) {
      handleTagOnChange({
        target: {
          checked: true,
          value: "Video Card",
        },
      });
    }
  }, [tagData?.length > 0]);

  useEffect(() => {
    const tagArrTemp = { ...vodRef.current };
    delete tagArrTemp.Description;
    if (vodRef?.current?.Title) {
      setDraftDisabled(false);
    } else {
      setDraftDisabled(true);
    }
  }, [vodRef.current, errors]);
  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box>
        <Box>
          {/* Top Section start */}
          <Grid container className={classes.createHeader}>
            <Grid item xs={2} md={5} em={4} sm={12} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant='text'
                startIcon={<ArrowBack />}
                sx={{
                  minWidth: "0px",
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                onClick={backToVodList}>
                {!noWeb && (
                  <Typography variant='h4bold'>
                    {currentVodData.current ? `${t("edit")} ${t("vod")}` : t("create_vod")}
                  </Typography>
                )}
              </Button>
            </Grid>
            <Grid
              item
              xs={10}
              md={7}
              em={8}
              sm={12}
              display='flex'
              justifyContent='flex-end'
              alignItems='flex-end'>
              <MarkedFeatured setIsFeatured={setIsFeatured} isFeatured={isFeatured} />
              <HeadButton
                variant='secondaryButton'
                // icon={VisibilityRoundedIcon}
                onclickHandler={handelPreview}
                canAccess={true}
                isDisabled={isDraftDisabled}
                text={t("preview")}
                iconType={"preview"}
              />
              <Box sx={{ margin: { xs: "0 5px", md: "0 10px" } }}>
                <HeadButton
                  variant='secondaryButton'
                  // icon={SaveAsRoundedIcon}
                  onclickHandler={saveVod}
                  canAccess={canAccessAction(CATEGORY_CONTENT, ContentType.Vod, "Create")}
                  isDisabled={isDraftDisabled}
                  text={t("save_as_draft")}
                  iconType={"save"}
                />
              </Box>
              {/* publish button */}
              <HeadButton
                variant='primaryButton'
                // icon={TelegramIcon}
                onclickHandler={publishButtonHandel}
                // canAccess={true}
                canAccess={canAccessAction(CATEGORY_CONTENT, ContentType.Vod, "publish")}
                isDisabled={isPublishVodHandle(vodRef.current)}
                text={t("publish")}
                iconType={"publish"}
              />
              {/* <SubmitButton
                category={CATEGORY_CONTENT}
                subCategory={ContentType.Vod}
                workflow={workflow}
                handlePublish={publishButtonHandel}
                handleSave={saveVod}
                createComment={() => {}}
                prelemEditState={isPublishDisabled}
              /> */}
            </Grid>
          </Grid>
          {/* Top Section End */}
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
          }}>
          <Box
            sx={{
              position: "fixed",
              top: "25%",
              right: { sm: "5px", xs: 0 },
              zIndex: 1000,
            }}>
            <ContentPageScroll
              icons={icons}
              parentToolTip={parentToolTip}
              srollToView={undefined} // srollToView={srollToView}
            />
          </Box>
          {/* Video Start */}
          <Box id='VideoAndThumbnail' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='01'
              title={t("video_subtitle")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t("subhead")}>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiledLast'>
                  <TitleSubTitle
                    title={t("video_title")}
                    subTitle={t("video_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiledLast'>
                  <ChooseVideoTray
                    ifVideoUrl={vodRef.current?.DsapceVideoUrl}
                    onUploadClick={onUploadClick}
                  />
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
          {/* Video End */}
          {/* Thumbnail start */}
          <Box id='ImageAndThumbnail' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='02'
              title={t("choose_the_image")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t("subhead")}>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiledLast'>
                  <TitleSubTitle
                    title={t("vod_thumbnail_title")}
                    subTitle={t("vod_thumbnail_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiledLast'>
                  <XImageRender
                    callBack={updateImageField}
                    editData={{
                      relativeUrl: stateManage.Thumbnail || vodRef.current?.Thumbnail,
                    }}
                    isCrop={false}
                  />
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
          {/* Thumbnail End */}

          {/* Title Desc start */}
          <Box id='titleDescription' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='03'
              title={t("title_head")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t("subhead")}>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                  <TitleSubTitle
                    title={t("vod_title")}
                    subTitle={t("vod_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                  <TextBox
                    name='Title'
                    placeHolder={t("vod_title_placeholder")}
                    handleChange={handleChange}
                    maxCharLength={120}
                    state={vodRef?.current?.Title || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiledLast'>
                  <TitleSubTitle
                    title={t("vod_desciption")}
                    subTitle={t("vod_subdes")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiledLast'>
                  <AutoTextArea
                    name={t("description")}
                    placeHolder={t("vod_desciption_placeholder")}
                    handleChange={handleChange}
                    maxCharLength={1000}
                    state={vodRef?.current?.Description || ""}
                  />
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>

          {/* Title Desc End */}
          {/* Tag Start */}
          <Box id='tags' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='04'
              title={t("choose_tags")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t("subhead")}>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiledLast'>
                  <TitleSubTitle
                    title={t("tags")}
                    subTitle={t("choose_your_tags")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiledLast'>
                  {tagListComponent}
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
          {/* Tag End */}
        </Box>
      </Box>

      {/* video update */}
      {galleryState && (
        <DamContentGallery
          assetType={"Video"}
          dialogOpen={galleryState}
          toggleGallery={toggleGallery}
          handleImageSelected={handleSelectedImage}
          handleSelectedVideo={handleSelectedVideo}
        />
      )}

      {/* after publish dialog will show */}
      {showPublishConfirm && (
        <PlateformXDialogSuccess
          isDialogOpen={showPublishConfirm}
          title={t("congratulations")}
          subTitle={t("publish_process_vod")}
          confirmButtonText={t("go_to_listing")}
          confirmButtonHandle={() => navigate("/content/vod")}
          closeButtonHandle={() => navigate("/content/vod")}
          modalType='publish'
        />
      )}

      {showExitWarning && (
        <PlateformXDialog
          disableConfirmButton={isDraftDisabled}
          isDialogOpen={showExitWarning}
          title={t("save_warn_title")}
          subTitle={t("save_warn_subtitle")}
          closeButtonText={t("take_me_out")}
          confirmButtonText={t("done")}
          closeButtonHandle={exitWithoutSave}
          confirmButtonHandle={saveVod}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
      )}

      {openPageExistModal && (
        <PlateformXDialog
          isDialogOpen={openPageExistModal}
          title={`${t("vod")} ${t("duplicate_exists")}`}
          subTitle={t("conformation")}
          closeButtonText={t("no")}
          confirmButtonText={t("yes")}
          closeButtonHandle={pageExistNoButtonHandle}
          confirmButtonHandle={pageExistYesButtonHandle}
          crossButtonHandle={pageExistCrossButtonHandle}
          modalType=''
        />
      )}
    </>
  );
};
