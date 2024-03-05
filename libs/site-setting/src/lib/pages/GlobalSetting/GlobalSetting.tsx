import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchGlobalSetting,
  publishGlobalSetting,
  updateGlobalSetting,
} from "@platformx/authoring-apis";
import { CreateHeader } from "@platformx/content";
import GlobalHeaderbreadscum from "../../components/GlobalHeaderbreadscum";
import { useGlobalSettingStyle } from "./GlobalSetting.style";
import {
  CommonBoxWithNumber,
  ShowToastError,
  useUserSession,
  GlobalImageIcon,
  GlobalVideoIcon,
  GlobalMiscIcon,
  PlateformXDialogSuccess,
} from "@platformx/utilities";
import { Loader } from "../../../../../utilities/src";
import ContentPageScroll from "libs/content/src/lib/components/ContentPageScroll";
import PlateformXStoryDialog from "./StoryTagsmodal";
import PlateformXStoryContentDialog from "./StorytagsContentmodal";

const iconImages = [
  {
    id: "images",
    iconName: GlobalImageIcon,
    tooltip: "images",
  },
  {
    id: "videos",
    iconName: GlobalVideoIcon,
    tooltip: "videos",
  },
  {
    id: "miscellanious",
    iconName: GlobalMiscIcon,
    tooltip: "miscellanious",
  },
];

export const GlobalSetting = () => {
  const [form, setForm] = useState<any>({
    header_bg_colour: "",
    header_text_colour: "",
    footer_bg_colour: "",
    footer_text_colour: "",
    font_selection: "",
    primary_colour: "",
    secondary_colour: "",
    image: [],
    video: [],
    misc: [],
    createdBy: "",
    lastModifiedBy: "",
    site_assigned_content_types: [],
    site_assigned_tags: [],
  });
  const tags = Array.isArray(form?.site_assigned_tags)
    ? form?.site_assigned_tags?.map((obj) => obj.name)
    : [];

  const imagesRef = useRef<HTMLElement>(null);
  // const videosRef = useRef<HTMLElement>(null);
  // const miscellaneousRef = useRef<HTMLElement>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const scrollDebounceRef = useRef<any>(null);
  const [srollToView] = useState<any>();
  const [parentToolTip, setParentToolTip] = useState("");
  const [tagValue, setTagValue] = useState(false);
  const [contentValue, setContentValue] = useState(false);

  const [getSession] = useUserSession();
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = getSession();
  const navigate = useNavigate();

  const crossButtonHandle = () => {
    setShowPublishConfirm(false);
  };

  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  const fetchGlobalSettingData = async () => {
    //  setsrollToView('')
    try {
      const { authoring_getSitedetails = {} } = await fetchGlobalSetting({
        page: "global-item",
      });
      const { site_assigned_content_types = [], site_assigned_tags = [] } =
        authoring_getSitedetails;

      setForm((prev) => ({
        ...prev,
        ...authoring_getSitedetails,
        site_assigned_content_types,
        site_assigned_tags,
      }));
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    }
  };

  const isInViewport = (element) => {
    const mainElement = document.querySelector(`#${element}`);
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect();
      return (
        rect.top <= window.pageYOffset + window.innerHeight &&
        rect.left <= window.pageXOffset + window.innerWidth &&
        rect.top >= window.pageYOffset &&
        rect.left >= window.pageXOffset
      );
    }
    return false;
  };
  const scrollHandler = () => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }
    const timeOutId = setTimeout(() => {
      const container = document.getElementById("scrollableDiv");
      const active = iconImages.find((i) => isInViewport(i.id));
      if (active && active.tooltip !== parentToolTip) {
        setParentToolTip(active.tooltip);
      }
      if (
        container &&
        Math.abs(container?.scrollHeight - container?.clientHeight - container?.scrollTop) < 1
      ) {
        setParentToolTip("mediahandle");
      }
    }, 100);
    scrollDebounceRef.current = timeOutId;
  };
  useEffect(() => {
    fetchGlobalSettingData();
    const dataHolder = document.getElementById("scrollableDiv");
    dataHolder?.addEventListener("scroll", scrollHandler);
    dataHolder?.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const publisglobalSetting = () => {
    const input = {
      input: {
        page: "global-item",
        status: "publish",
        is_schedule: false,
        schedule_date_time: "",
      },
    };
    // localStorage.setItem(
    //   'imageUuid',
    //   form?.image?.[0].ScopeId?.split('|')?.pop(),
    // )
    // localStorage.setItem(
    //   'videoUuid',
    //   form?.video?.[0].ScopeId?.split('|')?.pop(),
    // )
    publishGlobalSetting(input)
      .then(() => {
        setShowPublishConfirm(true);
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };

  const handleContentType = (val) => {
    setForm((prev) => ({ ...prev, site_assigned_content_types: val }));
  };

  const handleTag = (val) => {
    const newTag = val.map((value: any) => ({ name: value }));
    setForm((prev) => ({ ...prev, site_assigned_tags: newTag }));
  };

  const onSaveClick = () => {
    setIsLoading(true);
    const requestParam = {
      input: {
        CommonFields: {
          page: "global-item",
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: "",
        },
        ObjectFields: {
          header_bg_colour: form.header_bg_colour,
          header_text_colour: form.header_text_colour,
          footer_bg_colour: form.footer_bg_colour,
          footer_text_colour: form.footer_text_colour,
          font_selection: form.font_selection,
          primary_colour: form.primary_colour,
          secondary_colour: form.secondary_colour,
          image: form.image,
          video: form.video,
          misc: form.misc,
          site_assigned_content_types: form.site_assigned_content_types || [],
          site_assigned_tags: form.site_assigned_tags || [],
        },
      },
    };
    updateGlobalSetting(requestParam)
      .then(() => {
        setIsLoading(false);
        publisglobalSetting();
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };
  const classes = useGlobalSettingStyle();
  return (
    <>
      <CreateHeader
        createText={t("global_setting")}
        handleReturn={() => {
          navigate("/dashboard");
        }}
        isQuiz
        hasPublishButton={true}
        hasPreviewButton={false}
        hasSaveButton={false}
        saveText={t("update")}
        handelPreview={() => {
          /* your function code */
        }}
        handlePublish={onSaveClick}
        handleSaveOrPublish={onSaveClick}
        previewText='Preview'
        showPreview={false}
        toolTipText='Unable to preview please add required details'
        saveVariant='contained'
        category={"content"}
        subCategory={"quiz"}
        isFeatured={false}
      />
      <Divider />
      <Box className={classes.globalnewcontain}>
        <ContentPageScroll
          icons={iconImages}
          parentToolTip={parentToolTip}
          srollToView={srollToView}
        />
      </Box>

      <Box className={classes.pageContainer} id='scrollableDiv'>
        <Box className={classes.contentContainer}>
          <Box id='images' ref={imagesRef}>
            {isLoading && <Loader />}

            <CommonBoxWithNumber
              number='01'
              title={t("Assets Picker Images")}
              subTitle={t("subhead")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'>
              <Typography variant='h5medium' className={classes.containertypo}>
                Images
              </Typography>
              {form.image && (
                <Grid container>
                  <Grid item xs={12}>
                    <Box className={classes.globalContainer}>
                      <Box className={classes.btnboxnew}>
                        <Box className={classes.globalimg}>
                          <img src={GlobalImageIcon} alt='Globalimageicon' />
                        </Box>
                        <Box className={classes.globalbread}>
                          <GlobalHeaderbreadscum value={form.image} />
                        </Box>
                      </Box>
                      <Box>
                        <Button className={classes.btnbox} variant='outlined' disabled>
                          {t("view")}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
              <Typography className={classes.containertypo}>Videos</Typography>
              {form.video && (
                <Grid container>
                  <Grid item xs={12}>
                    <Box className={classes.globalContainer}>
                      <Box className={classes.btnboxnew}>
                        <Box sx={{ padding: "14px" }} className={classes.globalimg}>
                          <img src={GlobalVideoIcon} alt='Globalimageicon' />
                        </Box>
                        <Box className={classes.globalbread}>
                          <GlobalHeaderbreadscum value={form.video} />
                        </Box>
                      </Box>
                      <Box>
                        <Button className={classes.btnbox} variant='outlined' disabled>
                          {t("view")}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
              <Typography className={classes.containertypo}>Miscellaneous</Typography>
              {form.misc && (
                <Grid container>
                  <Grid item xs={12}>
                    <Box className={classes.globalContainer}>
                      <Box className={classes.btnboxnew}>
                        <Box className={classes.globalimg}>
                          <img src={GlobalMiscIcon} alt='Globalimageicon' />
                        </Box>
                        <Box className={classes.globalbread}>
                          <GlobalHeaderbreadscum value={form.misc} />
                        </Box>
                      </Box>
                      <Box>
                        <Button className={classes.btnbox} variant='outlined' disabled>
                          {t("view")}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </CommonBoxWithNumber>
            <CommonBoxWithNumber
              number='02'
              title={t("My Story Tags")}
              subTitle={t("subhead")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'>
              <Typography variant='h5medium' className={classes.containertypo}>
                My Story Tags
              </Typography>

              <Grid container>
                <Grid item xs={12}>
                  <Box className={classes.globalContainer}>
                    <Box className={classes.btnboxnew}>
                      <Box className={classes.globalimg}>
                        <img src={GlobalImageIcon} alt='Globalimageicon' />
                      </Box>
                      <Box className={classes.globalbread}>
                        <Typography>You have selected {tags.join()}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => {
                          setTagValue(true);
                        }}
                        className={classes.btnbox}
                        variant='outlined'>
                        {t("Edit")}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant='h5medium' className={classes.containertypo}>
                My Story Contant Type
              </Typography>

              <Grid container>
                <Grid item xs={12}>
                  <Box className={classes.globalContainer}>
                    <Box className={classes.btnboxnew}>
                      <Box sx={{ padding: "14px" }} className={classes.globalimg}>
                        <img src={GlobalVideoIcon} alt='Globalimageicon' />
                      </Box>
                      <Box className={classes.globalbread}>
                        <Typography>
                          You have selected{" "}
                          {Array.isArray(form.site_assigned_content_types)
                            ? form.site_assigned_content_types.join()
                            : ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => {
                          setContentValue(true);
                        }}
                        className={classes.btnbox}
                        variant='outlined'>
                        {t("Edit")}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
        </Box>
      </Box>
      {tagValue && (
        <PlateformXStoryDialog
          isDialogOpen={tagValue}
          closeButtonHandle={() => setTagValue(false)}
          onDone={handleTag}
          tags={tags}
        />
      )}
      {contentValue && (
        <PlateformXStoryContentDialog
          isDialogOpen={contentValue}
          closeButtonHandle={() => setContentValue(false)}
          onDone={handleContentType}
          site_assigned_content_types={form.site_assigned_content_types}
        />
      )}

      {showPublishConfirm && (
        <PlateformXDialogSuccess
          isDialogOpen={showPublishConfirm}
          title={t("congratulations")}
          subTitle={`${t("global_setting")}${"  "}${t("updated_toast")}`}
          confirmButtonText={t("go_to_dashboard")}
          confirmButtonHandle={() => navigate("/dashboard")}
          modalType='publish'
          crossButtonHandle={crossButtonHandle}
          closeButtonHandle={crossButtonHandle}
          closeIcon={<CreateRoundedIcon />}
        />
      )}
    </>
  );
};
