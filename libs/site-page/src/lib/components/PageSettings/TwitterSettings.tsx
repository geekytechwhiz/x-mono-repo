import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { RootState, updatePageSettings } from "@platformx/authoring-state";
import { ShowToastSuccess, ThemeConstants, siteLevelSchema } from "@platformx/utilities";
import { XImageRender } from "@platformx/x-image-render";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../PrelemSettings/PrelemSettings.styles";
import {
  descriptionLength,
  largePreviewDescriptionLength,
  nameLength,
  previewNameLength,
  smallPreviewDescriptionLength,
  smallPreviewNameLength,
} from "../utils/constants";
import { PageTwitterInformation } from "../utils/editTypes";
import "./PageSettings.css";

const TwitterSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state);
  const pageInfo = { ...page?.pageSettings };
  const {
    SocialOgTwitterTitle,
    SocialOgTwitterDescription,
    SocialOgTwitterImage,
    SocialOgTwitterURL,
    SocialTwitterCardSize,
    PageName,
    PageDescription,
    PageURL,
  } = pageInfo;
  const data = {
    SocialOgTwitterTitle:
      SocialOgTwitterTitle !== undefined
        ? SocialOgTwitterTitle
        : PageName === undefined
        ? ""
        : `${PageName} | ${siteLevelSchema.siteName}`,
    SocialOgTwitterDescription:
      SocialOgTwitterDescription !== undefined
        ? SocialOgTwitterDescription
        : PageDescription === undefined
        ? ""
        : PageDescription,
    SocialOgTwitterImage: SocialOgTwitterImage !== undefined ? SocialOgTwitterImage : "",
    SocialOgTwitterURL:
      SocialOgTwitterURL !== undefined ? SocialOgTwitterURL : PageURL === undefined ? "" : PageURL,
    SocialTwitterCardSize:
      SocialTwitterCardSize !== undefined ? SocialTwitterCardSize : "summary_large_image",
  };
  const initialTwitter = useRef(data);
  const [twitterInfo, setTwitterInfo] = useState<PageTwitterInformation>(initialTwitter.current);
  const [expanded, setExpanded] = React.useState<string | false>("page-info");
  const twitterNameLength = nameLength;
  const twitterDescriptionLength = descriptionLength;
  const twitterLargePreviewNameLength = previewNameLength;
  const twitterLargePreviewDescriptionLength = largePreviewDescriptionLength;
  const twitterSmallPreviewNameLength = smallPreviewNameLength;
  const twitterSmallPreviewDescriptionLength = smallPreviewDescriptionLength;
  const classes = useStyles(twitterInfo.SocialTwitterCardSize)();

  useEffect(() => {
    if (page?.pageSettings) {
      initialTwitter.current = {
        ...initialTwitter.current,
        ...page.pageSettings,
      };
      setTwitterInfo(initialTwitter.current);
    }
  }, [page?.pageSettings]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    setTwitterInfo({ ...twitterInfo, [fieldType]: event.target.value });
  };

  const saveTwitterInfo = () => {
    dispatch(updatePageSettings({ pageInfo: twitterInfo }));
    ShowToastSuccess(`${t("twitter_settings_info_toast")} ${t("saved_toast")}`);
  };

  const updateField = (d) => {
    setTwitterInfo({ ...twitterInfo, SocialOgTwitterImage: d.relativeUrl });
  };

  return (
    <Accordion
      expanded={expanded === "twitter-setings"}
      onChange={handleChange("twitter-setings")}
      sx={{
        boxShadow: "none",
        minHeight: 0,
        "&.Mui-expanded": {
          margin: "0px",
          minHeight: 0,
        },
        "& .Platform-x-AccordionSummary-root": {
          padding: 0,
          margin: "0 !important",
          minHeight: "0 !important",
        },
      }}>
      <AccordionSummary
        sx={{
          "&.mui-expanded": {
            minHeight: 0,
            margin: "0",
          },
          "& .Platform-x-AccordionSummary-content": {
            margin: "0 !important",
          },
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />}
        aria-controls='twitter-setings-content'
        id='twitter-setings-header'>
        <Typography className='labelbox' variant='p4bold'>
          {t("page_twitter_title")}
        </Typography>
      </AccordionSummary>
      <Box className='rowBox'>
        {twitterInfo.SocialTwitterCardSize === "summary_large_image" ? (
          <Box sx={{ border: "1px solid #EFF0F6", borderRadius: "5px" }}>
            <XImageRender
              callBack={updateField}
              editData={{
                relativeUrl: twitterInfo.SocialOgTwitterImage,
              }}
              isCrop={false}
            />
            {/* {twitterInfo.SocialOgTwitterImage === "" ? (
              <Box className={classes.uploadImageBox} onClick={onUploadClick}>
                <Box className={classes.blackRoundIcon}>
                  <img src={ArrowUpwardIcon} alt='ArrowUpwardIcon' />
                </Box>
                <Typography className='switchbox' variant='h5medium'>
                  {t("page_choose_image")}
                </Typography>
              </Box>
            ) : (
              <Box className={classes.imageBox} sx={{ marginBottom: 0 }}>
                <img
                  src={twitterInfo.SocialOgTwitterImage}
                  width='100%'
                  style={{ objectFit: "cover", borderRadius: "5px 5px 0 0" }}
                  alt=''
                />
                <Box className={classes.imageBoxInner}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ cursor: "pointer" }} onClick={onUploadClick}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          width: "25px",
                          height: "25px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                        }}>
                        <CachedIcon sx={{ color: "#626060" }} />
                      </Box>
                      <Typography
                        className='labelbox'
                        variant='p4regular'
                        mt={1}
                        sx={{
                          color: ThemeConstants.WHITE_COLOR,
                          marginBottom: "0 !important",
                        }}>
                        {t("replace")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )} */}
            <Box className='rowBox' sx={{ padding: "5px 10px", margin: "0 !important" }}>
              <Typography className='labelbox' variant='p4regular'>
                {twitterInfo.SocialOgTwitterURL}
              </Typography>
              <Typography className='labelbox' variant='p4regular'>
                {twitterInfo.SocialOgTwitterTitle.substring(0, twitterLargePreviewNameLength)}
                {twitterInfo.SocialOgTwitterTitle.length > twitterLargePreviewNameLength && (
                  <span>...</span>
                )}
              </Typography>
              <Typography className='labelbox' variant='p4regular'>
                {twitterInfo.SocialOgTwitterDescription.substring(
                  0,
                  twitterLargePreviewDescriptionLength,
                )}
                {twitterInfo.SocialOgTwitterDescription.length >
                  twitterLargePreviewDescriptionLength && <span>...</span>}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box mt={2} className={classes.TwiterInfoImageBox}>
            {/* {twitterInfo.SocialOgTwitterImage && (
              <Box className={classes.imageBoxInner}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ cursor: "pointer" }} onClick={onUploadClick}>
                    <Box
                      sx={{
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        width: "25px",
                        height: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto",
                      }}>
                      <CachedIcon sx={{ color: "#626060" }} />
                    </Box>
                    <Typography
                      className='labelbox'
                      variant='p4regular'
                      mt={1}
                      sx={{
                        color: ThemeConstants.WHITE_COLOR,
                        marginBottom: "0 !important",
                      }}>
                      {t("replace")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )} */}
            <Box className={classes.TwiterInfoBox}>
              <XImageRender
                callBack={updateField}
                editData={{
                  relativeUrl: twitterInfo.SocialOgTwitterImage,
                }}
                isCrop={false}
              />
              {/* {twitterInfo.SocialOgTwitterImage === "" ? (
                <Box
                  className={classes.uploadImageBox}
                  sx={{ width: "100%" }}
                  onClick={onUploadClick}>
                  <Box className={classes.blackRoundIcon}>
                    <img src={ArrowUpwardIcon} alt='ArrowUpwardIcon' />
                  </Box>
                  <Typography className='switchbox' variant='h6medium'>
                    {t("page_choose_image")}
                  </Typography>
                </Box>
              ) : (
                <img
                  src={twitterInfo.SocialOgTwitterImage}
                  alt='twitter file'
                  width='100%'
                  style={{ objectFit: "cover", borderRadius: "5px 0 0 5px" }}
                />
              )} */}
            </Box>
            <Box p={1} className={classes.imageTitle}>
              <Typography className='labelbox' variant='p4regular'>
                {twitterInfo.SocialOgTwitterTitle.substring(0, twitterSmallPreviewNameLength)}
                {twitterInfo.SocialOgTwitterTitle.length > twitterSmallPreviewNameLength && (
                  <span>...</span>
                )}
              </Typography>
              <Typography className='labelbox' variant='p4regular'>
                {twitterInfo.SocialOgTwitterDescription.substring(
                  0,
                  twitterSmallPreviewDescriptionLength,
                )}
                {twitterInfo.SocialOgTwitterDescription.length >
                  twitterSmallPreviewDescriptionLength && <span>...</span>}
              </Typography>
              <Typography className='labelbox' variant='p4regular'>
                {twitterInfo.SocialOgTwitterURL}
              </Typography>
            </Box>
          </Box>
        )}
        <Box className='rowBox'>
          <Typography className='labelbox' variant='p4regular'>
            {t("page_twitter_size")}
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={twitterInfo.SocialTwitterCardSize}
              onChange={(e) => handleDataChange(e, "SocialTwitterCardSize")}>
              <FormControlLabel
                value='summary'
                control={<Radio />}
                label={t("small")}
                sx={{
                  ".Platform-x-FormControlLabel-label": {
                    fontSize: {
                      xs: ThemeConstants.FONTSIZE_SM,
                      xl: ThemeConstants.FONTSIZE_DEFAULT,
                    },
                    textTransform: "capitalize",
                  },
                }}
              />
              <FormControlLabel
                value='summary_large_image'
                control={<Radio />}
                label={t("large")}
                sx={{
                  ".Platform-x-FormControlLabel-label": {
                    fontSize: {
                      xs: ThemeConstants.FONTSIZE_SM,
                      xl: ThemeConstants.FONTSIZE_DEFAULT,
                    },
                    textTransform: "capitalize",
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className='rowBox'>
          <Typography className='labelbox' variant='p4regular'>
            {t("page_twitter_ogtitle")}
          </Typography>
          <TextField
            multiline
            value={twitterInfo.SocialOgTwitterTitle}
            onChange={(e) => handleDataChange(e, "SocialOgTwitterTitle")}
            variant='outlined'
            size='small'
            placeholder={t("page_search_title_placeholder")}
            inputProps={{ maxLength: twitterNameLength }}
          />
        </Box>
        <Box className='rowBox'>
          <Typography className='labelbox' variant='p4regular'>
            {t("page_twitter_ogdescription")}
          </Typography>
          <TextField
            multiline
            value={twitterInfo.SocialOgTwitterDescription}
            onChange={(e) => handleDataChange(e, "SocialOgTwitterDescription")}
            variant='outlined'
            size='small'
            placeholder={t("page_info_about_placeholder")}
            inputProps={{ maxLength: twitterDescriptionLength }}
          />
        </Box>
        <Box className='rowBox'>
          <Typography className='labelbox' variant='p4regular'>
            {t("page_twitter_url")}
          </Typography>
          <TextField
            multiline
            value={twitterInfo.SocialOgTwitterImage}
            onChange={(e) => handleDataChange(e, "SocialOgTwitterImage")}
            variant='outlined'
            size='small'
            placeholder={t("page_seo_url_placeholder")}
            inputProps={{ readOnly: true }}
          />
        </Box>
        <Box className='rowBox'>
          <Button
            variant='contained'
            disabled={initialTwitter.current === twitterInfo}
            sx={{ width: "100%" }}
            onClick={saveTwitterInfo}>
            {t("done")}
          </Button>
        </Box>
      </Box>
    </Accordion>
  );
};
export default TwitterSettings;
