import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, PlateformXDialogSuccess } from "../../../../../utilities/src";
import {
  fetchHeaderSetting,
  publishHeaderSetting,
  updateHeaderSetting,
} from "@platformx/authoring-apis";
import { useHeaderSettingStyle } from "./HeaderSetting.style";
import {
  CommonBoxWithNumber,
  useUserSession,
  Sitelogoupdateicon,
  FaviconupdateIcon,
  SearchnupdateIcon,
  LanguageupdateIcon,
  CtaupdateIcon,
  TextBox,
  MultiSelect,
  TitleSubTitle,
} from "@platformx/utilities";
import {
  HeaderCtaSkeleton,
  HeaderFaviconSkeleton,
  HeaderLanguageSkeleton,
  HeaderLogoSkeleton,
  HeaderSearchSkeleton,
} from "../../components/CookieSettingConstant";
import { XImageRender } from "@platformx/x-image-render";
import { CreateHeader, ContentPageScroll } from "@platformx/content";

const iconImages = [
  {
    id: "headerlogo",
    iconName: Sitelogoupdateicon,
    tooltip: "header_logo",
  },
  {
    id: "headerfavicon",
    iconName: FaviconupdateIcon,
    tooltip: "header_favicon",
  },
  {
    id: "search",
    iconName: SearchnupdateIcon,
    tooltip: "search",
  },
  {
    id: "language",
    iconName: LanguageupdateIcon,
    tooltip: "language",
  },
  {
    id: "ctatitleurl",
    iconName: CtaupdateIcon,
    tooltip: "cta_url",
  },
];

export const HeaderSetting = () => {
  const [languageList, setlanguageList] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [galleryState] = useState<boolean>(false);
  // const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [srollToView, setsrollToView] = useState<any>();
  const [languageOptionList, setlanguageOptionList] = useState([]);
  const [parentToolTip, setParentToolTip] = useState("");

  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  const scrollDebounceRef = useRef<any>(null);
  const originalRes = useRef<any>(null);
  const languagelistref = useRef<any>([]);
  const [form, setForm] = useState<any>({
    header_logo: "",
    header_favicon: "",
    search: "",
    cta_title: "",
    cta_url: "",
    vendor_language: "",
  });
  // const [isNotificationToast, setIsNotificationToast] =
  //   useState<boolean>(false);
  // const toastMessage = useRef(null);
  // const onCloseSaveHandler = () => {
  //   setIsNotificationToast(false);
  // };
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const navigate = useNavigate();

  const crossButtonHandle = () => {
    setShowPublishConfirm(false);
  };
  // const crossButtonHandle={() => {
  //   setShowPublishConfirm(false);
  // }}
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const handleTextChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const fetchHeaderSettingData = async () => {
    const { authoring_getSitedetails = {} } = await fetchHeaderSetting({
      page: "header-item",
    });
    delete authoring_getSitedetails.__typename;
    originalRes.current = authoring_getSitedetails;
    setsrollToView("");
    const {
      header_logo = "",
      header_favicon = "",
      search,
      cta_title = "",
      cta_url = "",
      language = "",
      language_list = [],
    } = authoring_getSitedetails;
    languagelistref.current = language_list;
    setForm({
      header_logo: header_logo || "",
      header_favicon: header_favicon || "",
      search: search,
      cta_title: cta_title || "",
      cta_url: cta_url || "",
    });
    const x = language_list.reduce((acc, obj) => {
      return { ...acc, [obj.lang_code]: obj.lang };
    }, {});
    setlanguageOptionList(language_list.map((languag) => languag.lang));
    setlanguageList(language.split("|").map((lang) => x[lang]));
  };

  const getLanguage = () => {
    const getList = languagelistref.current.reduce((acc, obj) => {
      return { ...acc, [obj.lang]: obj.lang_code };
    }, {});
    const languageField = languageList.map((lang) => getList[lang]);
    return languageField.join("|");
  };
  const publisheaderSetting = () => {
    const input = {
      input: {
        page: "header-item",
        status: "publish",
        is_schedule: false,
        schedule_date_time: "",
      },
    };
    publishHeaderSetting(input)
      .then(() => {
        //toastMessage.current = 'publish_settings_success';
        //setIsNotificationToast(true);
        setShowPublishConfirm(true);
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };
  const onSaveClick = () => {
    setIsLoading(true);
    const requestParam = {
      input: {
        CommonFields: {
          page: "header-item",
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: "",
        },
        ObjectFields: {
          ...form,
          vendor_language: getLanguage(),
        },
      },
    };
    updateHeaderSetting(requestParam)
      .then(() => {
        setIsLoading(false);
        //toastMessage.current = 'header_settings_success';
        publisheaderSetting();
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };

  // const updateField = (updatedPartialObj) => {
  // };

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

  const updateHeaderlogo = (data) => {
    setForm((preForm) => ({ ...preForm, header_logo: data.relativeUrl }));
  };
  const updateFavicon = (data) => {
    setForm((preForm) => ({ ...preForm, header_favicon: data.relativeUrl }));
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
        setParentToolTip("ctalink");
      }
    }, 100);
    scrollDebounceRef.current = timeOutId;
  };

  useEffect(() => {
    fetchHeaderSettingData();
    const dataHolder = document.getElementById("scrollableDiv");
    dataHolder?.addEventListener("scroll", scrollHandler);
    dataHolder?.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const classes = useHeaderSettingStyle();

  return (
    <>
      {!galleryState && (
        <>
          <CreateHeader
            createText={"header Setting"}
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
              <Box id='headerlogo'>
                {isLoading && <Loader />}

                <CommonBoxWithNumber
                  number='01'
                  title={t("header_logo")}
                  subTitle={t("subhead")}
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={`${t("event_image_tilte")}*`}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>
                      <Box sx={{ marginTop: "15px" }}>
                        <XImageRender
                          callBack={updateHeaderlogo}
                          editData={{
                            relativeUrl: form.header_logo,
                          }}
                          isCrop={false}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className={classes.rightForm}>
                      <Box>
                        <Box className={classes.skeletonTitle}>
                          {t("logo_will_look_like_this_on_header")}
                        </Box>
                        {HeaderLogoSkeleton(1)}
                      </Box>
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>
              <Box id='headerfavicon'>
                <CommonBoxWithNumber
                  number='02'
                  title={t("header_favicon")}
                  subTitle={t("subhead")}
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={`${t("event_image_tilte")}*`}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>
                      <Box className={classes.faviconbox}>
                        <Box className={classes.faviconbox2}>
                          <XImageRender
                            callBack={updateFavicon}
                            editData={{
                              relativeUrl: form.header_favicon,
                            }}
                            isCrop={false}
                          />
                        </Box>
                        <Box className={classes.skeletonTitle}>
                          Image Size must be 16x16px, Max 200KB JPG & PNG are allowed only
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className={classes.rightForm}>
                      <Box>
                        <Box className={classes.skeletonTitle}>
                          {t("logo_will_look_like_this_on_header_sub")}
                        </Box>
                        {HeaderFaviconSkeleton(1)}
                      </Box>
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>
              <Box id='search'>
                <CommonBoxWithNumber
                  number='03'
                  title={t("search")}
                  subTitle={t("subhead")}
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={t("search_bar")}
                          subTitle={t("header_subtitle_search")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                        <FormControl>
                          <RadioGroup
                            value={form.search}
                            onChange={(e) => setForm({ ...form, search: e.target.value })}>
                            <FormControlLabel
                              value='true'
                              control={<Radio />}
                              label={t("yes_i_required_this")}
                            />
                            <FormControlLabel
                              value='false'
                              control={<Radio />}
                              label={t("i_dont_need_this")}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Box className={classes.skeletonTitle}>
                        {t("search_will_look_like_this_on_footer")}
                      </Box>
                      {HeaderSearchSkeleton(1)}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>
              <Box id='language'>
                <CommonBoxWithNumber
                  number='04'
                  title={t("language")}
                  subTitle={t("subhead")}
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <MultiSelect
                        title={t("choose_language")}
                        list={languageOptionList}
                        defaultAmountOfItem={10}
                        mobileAmountOfItem={5}
                        onPickerChange={(e, name) => {
                          setlanguageList((preState) =>
                            preState.includes(name)
                              ? preState.filter((s) => s !== name)
                              : [...preState, name],
                          );
                        }}
                        value={languageList}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Box className={classes.skeletonTitle}>
                        {t("language_will_be_added_here")}
                      </Box>
                      {HeaderLanguageSkeleton(1)}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>
              <Box id='ctatitleurl'>
                <CommonBoxWithNumber
                  number='05'
                  title={t("cta_url")}
                  subTitle={t("subhead")}
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={t("cta_title")}
                          subTitle={t("this_will_be_the_title")}
                          titleVariant='h5medium'
                          subTitleVariant='h6regular'
                        />
                      </Box>
                      <Grid item xs={11} sm={11} md={11} lg={11} sx={{ marginTop: "10px" }}>
                        <Box marginTop={2}>
                          <TextBox
                            name='cta_title'
                            state={form.cta_title}
                            maxCharLength={60}
                            placeHolder={t("write_your_text_here")}
                            handleChange={(event) => {
                              handleTextChange(event);
                            }}
                          />
                        </Box>
                      </Grid>
                      <Box marginTop={2}>
                        <TitleSubTitle
                          title={t("add_url")}
                          subTitle={t("this_will_be_the_url")}
                          titleVariant='h5medium'
                          subTitleVariant='h6regular'
                        />
                      </Box>
                      <Grid item xs={1} sm={1} md={1} lg={1} sx={{ marginTop: "10px" }}></Grid>
                      <Grid item xs={11} sm={11} md={11} lg={11} sx={{ marginTop: "20px" }}>
                        <Box marginTop={2}>
                          <TextBox
                            name='cta_url'
                            state={form.cta_url}
                            maxCharLength={60}
                            placeHolder={t("paste_your_destination_link_here")}
                            handleChange={(event) => {
                              handleTextChange(event);
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Box className={classes.skeletonTitle}>{t("links_will_be_added_here")}</Box>
                      {HeaderCtaSkeleton(1)}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {/* {galleryState && (
        <DamContentGallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          assetType={galleryType.current === "Images" ? "Image" : "Video"}
          keyName={key}
        />
      )} */}

      {showPublishConfirm && (
        <PlateformXDialogSuccess
          isDialogOpen={showPublishConfirm}
          title={t("congratulations")}
          subTitle={`${t("header")}${"  "}${t("update_settings_success")}`}
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
