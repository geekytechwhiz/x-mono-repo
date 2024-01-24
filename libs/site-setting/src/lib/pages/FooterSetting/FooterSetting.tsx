import AddIcon from "@mui/icons-material/Add";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//import Loader from "../../../Common/Loader";
//import { ReactComponent as PictureIcon } from "../../../assets/PictureIcon.svg";
//import { ReactComponent as VectorIconSvg } from "../../../assets/svg/VectorIcon.svg";
//import DamContentGallery from "../../../components/Common/DamContentGallery/DamContentGallery";
//import MultiSelect from "../../../components/Common/MultiSelect/MultiSelect";
//import TitleSubTitle from "../../../components/Common/TitleSubTitle";
//import PlateformXDialog from "../../../components/Modal";
//import { showToastError } from "../../../components/toastNotification/toastNotificationReactTostify";
//import useUserSession from "../../../hooks/useUserSession/useUserSession";

import {
  MultiSelect,
  TitleSubTitle,
  ShowToastSuccess,
  ShowToastError,
  TextBox,
  useUserSession,
  PlateformXDialog,
  CommonBoxWithNumber,
  Loader,
  PictureIcon,
  VectorIconSvg,
} from "@platformx/utilities";

import { CreateHeader } from "@platformx/content";
import {
  fetchFooterSetting,
  publishFooterSetting,
  updateSiteSetting,
} from "@platformx/authoring-apis";

// import { postRequest } from "../../../services/config/request";
import {
  AddLinkSkeleton,
  ContactUsSkeleton,
  CopyRightSkeleton,
  MediaHandleSkeleton,
  NewsLetterSkeleton,
  SiteLogoSkeleton,
} from "../../components/CookieSettingConstant";
// import SiteSettingAddImage from "../SiteSettingAddImage/SiteSettingAddImage";
import { useFooterSettingStyle } from "./FooterSetting.style";
//import { CreateHeader } from "../../../components/Common/CreateHeader";
import { Divider } from "@mui/material";
// import QuizPageScroll from "../../../components/Quiz/QuizPageScroll";
// import { fetchContentByPath } from "../../../services/contentTypes/contentTypes.api";
// import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import iconImages from "./FooterConstansts";
import { XImageRender } from "@platformx/x-image-render";
import ContentPageScroll from "libs/content/src/lib/components/ContentPageScroll";

export const FooterSetting = () => {
  const [mediaList, setMediaList] = useState<any>([]);
  const [operationType, setOperationType] = useState<any>("");
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [key, setKey] = useState("");
  const galleryType = useRef<string>("Images");
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [parentToolTip, setParentToolTip] = useState("");
  const [srollToView, setsrollToView] = useState<any>();
  const [mediaOptionList, setMediaOptionList] = useState<[]>([]);
  const scrollDebounceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const originalRes = useRef<any>(null);
  const [form, setForm] = useState<any>({
    site_logo: "",
    about_us_text: "",
    title_text: "",
    address: "",
    email_address: "",
    contact_number: "",
    footer_link: [],
    copyright_text: "",
    news_letter_title: "",
    news_letter_description: "",
  });
  const [isNotificationToast, setIsNotificationToast] = useState<boolean>(false);
  // const [runFetchContentByPath, { loading }] = useLazyQuery(fetchContentByPath);
  const toastMessage = useRef<any>(null);
  const crossButtonHandle = () => {
    setIsNotificationToast(false);
  };
  const navigate = useNavigate();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();

  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  const handleTextChange = (event, fieldName) => {
    setForm({ ...form, [fieldName]: event.target.value });
  };
  const fetchFooterSettingData = async () => {
    const { authoring_getFooterSettings = {} } = await fetchFooterSetting({
      pagePath: "footer-item",
    });
    delete authoring_getFooterSettings.__typename;
    originalRes.current = authoring_getFooterSettings;
    setsrollToView("");
    const {
      site_logo = "",
      about_us_text = "",
      title_text = "",
      address = "",
      email_address = "",
      contact_number = "",
      link = [],
      copyright_text = "",
      news_letter_title = "",
      news_letter_description = "",
      mediahandle = [],
    } = authoring_getFooterSettings;
    setForm({
      site_logo: site_logo || "",
      about_us_text: about_us_text || "",
      title_text: title_text || "",
      address: address || "",
      email_address: email_address || "",
      contact_number: contact_number || "",
      copyright_text: copyright_text || "",
      news_letter_title: news_letter_title || "",
      news_letter_description: news_letter_description || "",
      footer_link: link,
    });
    setMediaOptionList(mediahandle.map((media) => media.media_name));
    setMediaList(mediahandle.filter((media) => media.isSelected).map((media) => media.media_name));
  };
  const publishfooterSetting = () => {
    const input = {
      input: {
        page: "footer-item",
        status: "publish",
        is_schedule: false,
        schedule_date_time: "",
      },
    };
    publishFooterSetting(input)
      .then((response) => {
        setIsLoading(false);
        toastMessage.current = "footer_settings_success";
        setIsNotificationToast(true);
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };
  const onSaveClick = () => {
    const newData = form?.footer_link?.filter((item) => {
      return item.link_name === "" || item.link_url === "";
    });
    if (newData.length >= 1) {
      ShowToastError(t("api_error_ntoast"));
    } else {
      setIsLoading(true);
      const requestParam = {
        input: {
          CommonFields: {
            page: "footer-item",
            createdby: username,
            lastmodifiedby: username,
            lastmodifieddate: "",
          },
          ObjectFields: {
            ...form,
            media_handle: mediaList.map((mediaName) => ({
              enable: true,
              media_name: mediaName,
            })),
            // last_modified_by: originalRes.current.lastmodifiedby,
            // last_modification_date: originalRes.current.lastmodificationdate,
          },
        },
      };
      updateSiteSetting(requestParam)
        .then(() => {
          publishfooterSetting();
        })
        .catch((err) => {
          setIsLoading(false);
          throw err;
        });
    }
  };

  const onUploadClick = (type) => {
    showGallery("Images", "imagevideoURL");
    setOperationType(type);
  };
  const updateField = (updatedPartialObj) => {
    console.info("final data", updatedPartialObj);
    const modifiedData = {
      // ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
    };
    console.info("modified data", modifiedData);
    // setState(modifiedData);
  };

  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    setGalleryState(true);
    setKey(keyName);
  };

  const handleSelectedImage = async (image, keyName) => {
    try {
      const payload = {
        bitstreamId: image.bitStreamId,
        visibility: "public",
      };
      // const response = await postRequest("api/v1/assets/image/no-crop", payload);

      // const relativeUrl = response?.original_image_relative_path + "." + response?.ext;
      // setForm((preForm) => ({ ...preForm, site_logo: relativeUrl }));
    } catch (error) {
      // console.log(error);
      ShowToastError(t("api_error_toast"));
    }
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
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
    fetchFooterSettingData();
    const dataHolder = document.getElementById("scrollableDiv");
    dataHolder?.addEventListener("scroll", scrollHandler);
    dataHolder?.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const handleLinkInputChange = (link, fieldName) => {
    return (event) => {
      link[fieldName] = event.target.value;
      setForm({ ...form });
    };
  };
  const [newForms, setNewForm] = useState([]);
  const onDeleteOption = (index) => {
    if (form.footer_link.length <= 1) {
    } else {
      const linkData = form.footer_link;
      // console.log(linkData);
      form.footer_link = linkData.filter((item, ind) => ind != index);
      setForm({ ...form });
    }
  };

  const onLinkDrop = (event, index) => {
    const dropIndex = +event.dataTransfer.getData("text");
    const cloneFormLink = [...form.footer_link];
    const droppedLink = { ...cloneFormLink[dropIndex] };
    const currentLink = { ...cloneFormLink[index] };
    cloneFormLink.splice(dropIndex, 1, currentLink);
    cloneFormLink.splice(index, 1, droppedLink);
    setForm({ ...form, footer_link: cloneFormLink });
  };
  const classes = useFooterSettingStyle();

  return (
    <>
      {!galleryState && (
        <>
     <CreateHeader
            createText={t("Footer_Setting")}
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
          <Divider></Divider>
          <Box className={classes.globalnewcontain}>
            <ContentPageScroll
              icons={iconImages}
              parentToolTip={parentToolTip}
              srollToView={srollToView}
            />
          </Box>

          <Box className={classes.pageContainer} id='scrollableDiv'>
            <Box className={classes.contentContainer}>
              <Box id='sitelogo'>
                {isLoading && <Loader />}
                <CommonBoxWithNumber
                  number='01'
                  title={t("site_logo")}
                  subTitle={t("subhead")}
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={`${t("event_image_tilte")}*`}
                          subTitle={t("choose_the_image")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>
                      <Box sx={{ marginTop: "15px" }}>
                        {/* <SiteSettingAddImage
                          url={
                            process.env.REACT_APP_GCP_URL +
                            "/" +
                            process.env.REACT_APP_BUCKET_NAME +
                            "/" +
                            form.site_logo
                          }
                          updateField={updateField}
                          type='Images'
                          operationType={operationType}
                          onUploadClick={onUploadClick}
                        /> */}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className={classes.rightForm}>
                      <Box>
                        <Typography className={classes.skeletonTitle}>
                          {t("logo_will_look_like_this_on_footer_site")}
                        </Typography>
                        {SiteLogoSkeleton(1)}
                      </Box>
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>

              <Box id='aboutus'>
                <CommonBoxWithNumber
                  number='02'
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'
                  title={t("about_us")}
                  subTitle={t("subhead")}
                  panelStyle={{ marginTop: "30px" }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.aboutUsLeft}>
                      <TitleSubTitle
                        title={t("about_us_text")}
                        subTitle={t("this_will_be_the_about_us_text")}
                        titleVariant='h6medium'
                        subTitleVariant='h7regular'
                      />
                      <Box marginTop={2}>
                        <TextBox
                          name='about_us_text'
                          handleChange={(event) => handleTextChange(event, "about_us_text")}
                          state={form.about_us_text}
                          maxCharLength={120}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Box>
                        <Typography className={classes.skeletonTitle}>
                          {t("logo_will_look_like_this_on_footer_sub")}
                        </Typography>
                        {SiteLogoSkeleton(2)}
                      </Box>
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>

              <Box id='contactus'>
                <CommonBoxWithNumber
                  number='03'
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'
                  title={t("contact_us")}
                  subTitle={t("subhead")}
                  panelStyle={{ marginTop: "30px" }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={t("Title_text")}
                          subTitle={t("this_will_be_the_title_text")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                        <TextBox
                          name='title_text'
                          state={form.title_text}
                          handleChange={(event) => handleTextChange(event, "title_text")}
                          maxCharLength={120}
                        />
                      </Box>

                      <Box marginTop={3}>
                        <TitleSubTitle
                          title={t("sitesetting_bg_title")}
                          subTitle={t("sitesetting_sub_title")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>

                      <Box className={classes.pictureiconinner} marginTop={2}>
                        <Box className={classes.pictureIconContainer}>
                       <img src={PictureIcon} alt="PictureIcon" />
                        </Box>
                        <Box className={classes.aboutUsTextBox}>
                          <TextBox
                            name='address'
                            placeHolder={t("sitesetting_add")}
                            state={form.address}
                            maxCharLength={120}
                            handleChange={(event) => {
                              handleTextChange(event, "address");
                            }}
                          />
                        </Box>
                      </Box>

                      <Box marginTop={3}>
                        <TitleSubTitle
                          title={t("email_address")}
                          subTitle={t("this_will_be_the_email_address_text")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>

                      <Box className={classes.pictureiconinner} marginTop={2}>
                        <Box className={classes.pictureIconContainer}>
                          <img src={PictureIcon} alt="PictureIcon" />
                        </Box>
                        <Box className={classes.aboutUsTextBox}>
                          <TextBox
                            name='email_address'
                            placeHolder={t("enter_your_email_address_here")}
                            state={form.email_address}
                            maxCharLength={120}
                            handleChange={(event) => {
                              handleTextChange(event, "email_address");
                            }}
                          />
                        </Box>
                      </Box>

                      <Box marginTop={3}>
                        <TitleSubTitle
                          title={t("contact_number")}
                          subTitle={t("this_will_be_the_contact_number_text")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>
                      <Box className={classes.pictureiconinner} marginTop={2}>
                        <Box className={classes.pictureIconContainer}>
                        <img src={PictureIcon} alt="PictureIcon" />
                        </Box>
                        <Box className={classes.aboutUsTextBox}>
                          <TextBox
                            name='contact_number'
                            placeHolder={t("enter_your_contact_number")}
                            state={form.contact_number}
                            maxCharLength={120}
                            handleChange={(event) => {
                              handleTextChange(event, "contact_number");
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Typography className={classes.skeletonTitle}>
                        {t("contact_us_will_look_like_this_on_footer")}
                      </Typography>
                      {ContactUsSkeleton}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>

              <Box id='addlink'>
                <CommonBoxWithNumber
                  number='04'
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'
                  title={t("add_link")}
                  subTitle={t("subhead")}
                  panelStyle={{ marginTop: "30px" }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={t("add_link_and_URL")}
                          subTitle={t("enter_link")}
                          titleVariant='h3medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>

                      <Box marginTop={2}>
                        {form.footer_link.map((link, index) => (
                          <Grid
                            container
                            key={`link_${index + 1}`}
                            draggable
                            onDragStart={(event) => {
                              event.dataTransfer.setData("text", `${index}`);
                            }}
                            onDrop={(event) => {
                              onLinkDrop(event, index);
                            }}
                            onDragOver={(event) => {
                              event.preventDefault();
                            }}>
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              md={1}
                              lg={1}
                              sx={{
                                marginTop: index > 0 ? "20px" : "0",
                              }}
                              className={classes.dragIconContainer}>
                              <img src={VectorIconSvg} alt="" />
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              sm={10}
                              md={10}
                              lg={10}
                              sx={{ marginTop: index > 0 ? "20px" : "0" }}>
                              <TextBox
                                name='enter_link_url'
                                placeHolder={t("enter_link_url")}
                                maxCharLength={120}
                                state={link.link_url}
                                error={link.link_url === "" ? "red" : ""}
                                handleChange={handleLinkInputChange(link, "link_url")}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              md={1}
                              lg={1}
                              sx={{
                                marginTop: index > 0 ? "20px" : "0",
                              }}>
                              <DeleteIcon
                                onClick={() => onDeleteOption(index)}
                                className={classes.deleteicon}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              md={1}
                              lg={1}
                              sx={{ marginTop: "20px" }}></Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10} sx={{ marginTop: "20px" }}>
                              <TextBox
                                name='linkname1'
                                placeHolder={t("linkname")}
                                maxCharLength={120}
                                state={link.link_name}
                                error={link.link_name === "" ? "red" : ""}
                                handleChange={handleLinkInputChange(link, "link_name")}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                      <Grid container className={classes.newLinkContainer}>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.addNewBtnBox}>
                          <Box
                            onClick={() => {
                              setForm({
                                ...form,
                                footer_link: [...form.footer_link, { link_url: "", link_name: "" }],
                              });
                            }}
                            component='span'
                            sx={{ cursor: "pointer" }}>
                            <AddIcon className={classes.addicon} />
                            {t("add_new_link")}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Typography className={classes.skeletonTitle}>
                        {t("links_will_be_added_here")}
                      </Typography>
                      {AddLinkSkeleton}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>

              <Box id='copyrighttext'>
                <CommonBoxWithNumber
                  number='05'
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'
                  title={t("sitesetting_copyright")}
                  subTitle={t("subhead")}
                  panelStyle={{ marginTop: "30px" }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.copyRightLeft}>
                      <Box>
                        <TitleSubTitle
                          title={t("sitesetting_copyright")}
                          subTitle={t("sitesetting_copyright_sub")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>
                      <Box marginTop={2}>
                        <TextBox
                          name='copyright_text'
                          state={form.copyright_text}
                          maxCharLength={120}
                          handleChange={(event) => {
                            handleTextChange(event, "copyright_text");
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Typography className={classes.skeletonTitle}>
                        {t("copyright_text_will_be_updated_here")}
                      </Typography>
                      {CopyRightSkeleton}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>

              <Box id='newsletter'>
                <CommonBoxWithNumber
                  number='06'
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'
                  title={t("sitesetting_news_title")}
                  subTitle={t("sitesetting_copy_subhead")}
                  panelStyle={{ marginTop: "30px" }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <Box>
                        <TitleSubTitle
                          title={t("Title_text")}
                          subTitle={t("this_will_be_the_title_text")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>
                      <Box marginTop={2}>
                        <TextBox
                          name='news_letter_title'
                          placeHolder={t("write_your_text_here")}
                          maxCharLength={120}
                          state={form.news_letter_title}
                          handleChange={(event) => {
                            handleTextChange(event, "news_letter_title");
                          }}
                        />
                      </Box>
                      <Box marginTop={3}>
                        <TitleSubTitle
                          title={t("news_Letter_description")}
                          subTitle={t("this_will_be_the_description")}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Box>
                      <Box marginTop={2}>
                        <TextBox
                          name='news_letter_description'
                          placeHolder={t("vod_desciption_placeholder")}
                          state={form.news_letter_description}
                          maxCharLength={120}
                          handleChange={(event) => {
                            handleTextChange(event, "news_letter_description");
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Typography className={classes.skeletonTitle}>
                        {t("newsletter_title_will_be_updated_here")}
                      </Typography>
                      {NewsLetterSkeleton}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>

              <Box id='mediahandle'>
                <CommonBoxWithNumber
                  number='07'
                  titleVarient='p3semibold'
                  subTitleVarient='p4regular'
                  title={t("media_handle")}
                  subTitle={t("subhead")}
                  panelStyle={{ marginTop: "30px" }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                      <MultiSelect
                        title={t("sitesetting_select_media_title")}
                        list={mediaOptionList}
                        defaultAmountOfItem={10}
                        mobileAmountOfItem={5}
                        onPickerChange={(e, name) => {
                          setMediaList((preState) =>
                            preState.includes(name)
                              ? preState.filter((s) => s !== name)
                              : [...preState, name],
                          );
                        }}
                        value={mediaList}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightForm}>
                      <Typography className={classes.skeletonTitle}>
                        {t("media_handle_will_be_updated_here")}
                      </Typography>
                      {MediaHandleSkeleton}
                    </Grid>
                  </Grid>
                </CommonBoxWithNumber>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {/* {galleryState && (
        <Gallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          galleryMode={galleryType.current}
          keyName={key}
        />
        <DamContentGallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          assetType={galleryType.current === "Images" ? "Image" : "Video"}
          keyName={key}
        />
      )} */}
      {/* {isNotificationToast &&
        <PlateformXSnackbar
          isDefaultOpen={isNotificationToast}
          message={t(toastMessage.current)}
          messageType='success'
          onCloseButtonClick={onCloseSaveHandler}
        />} */}
      {isNotificationToast && (
        <PlateformXDialog
          isDialogOpen={isNotificationToast}
          title={t("congratulations")}
          subTitle={`${t("footer_settings_success")}`}
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
