import { ExpandMore } from "@mui/icons-material";
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { RootState, updatePageSettings } from "@platformx/authoring-state";
import { ShowToastSuccess, siteLevelSchema, usePlatformAnalytics } from "@platformx/utilities";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../BackButton/BackButton";
import { PageSocialShareInformation } from "../utils/editTypes";
import "./PageSettings.css";
import TwitterSettings from "./TwitterSettings";
import { XImageRender } from "@platformx/x-image-render";
import {
  socialShareNameLength,
  socialShareDescriptionLength,
  socialSharePreviewNameLength,
  socialSharePreviewDescriptionLength,
} from "../utils/prelemTypes";

interface socialShareinsting {
  setPageId?: any;
}
const SocialShare = ({ setPageId }: socialShareinsting) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state);
  const pageInfo = { ...page?.pageSettings };
  const {
    SocialOgTitle,
    SocialOgDescription,
    SocialOgSiteName,
    SocialOgType,
    SocialOgURL,
    SocialOgLocale,
    SocialOgImage,
    PageName,
    PageDescription,
    PageURL,
  } = pageInfo;
  const data = {
    SocialOgTitle:
      SocialOgTitle !== undefined
        ? SocialOgTitle
        : PageName === undefined
          ? ""
          : `${PageName} | ${siteLevelSchema.siteName}`,
    SocialOgDescription:
      SocialOgDescription !== undefined
        ? SocialOgDescription
        : PageDescription === undefined
          ? ""
          : PageDescription,
    SocialOgSiteName:
      SocialOgSiteName !== undefined
        ? SocialOgSiteName
        : PageName === undefined
          ? ""
          : `${PageName} | ${siteLevelSchema.siteName}`,
    SocialOgType: SocialOgType !== undefined ? SocialOgType : t("Website"),
    SocialOgURL: SocialOgURL !== undefined ? SocialOgURL : PageURL === undefined ? "" : PageURL,
    SocialOgLocale: SocialOgLocale !== undefined ? SocialOgLocale : t("en_US"),
    SocialOgImage: SocialOgImage !== undefined ? SocialOgImage : "",
  };
  const initialSocialShare = useRef<PageSocialShareInformation>(data);
  const [socialShareInfo, setSocialShareInfo] = useState<PageSocialShareInformation>(
    initialSocialShare.current,
  );
  const ogTypes = [t("website"), t("article")];
  const ogLocale = [t("page_en_us"), t("page_en_gb"), t("page_en_fr")];

  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    setSocialShareInfo({ ...socialShareInfo, [fieldType]: event.target.value.trim() });
  };
  const [handleImpression] = usePlatformAnalytics();
  const saveSocialShare = () => {
    dispatch(updatePageSettings({ pageInfo: socialShareInfo }));
    const pageDataObj = {
      eventType: "SocialShare PageSetting Saved",
      socialShareSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
    ShowToastSuccess(`${t("social_share_info_toast")} ${t("saved_toast")}`);
  };

  const updateField = (d) => {
    setSocialShareInfo({ ...socialShareInfo, SocialOgImage: d.relativeUrl });
  };

  return (
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title='Social Share' />
      <Box className='rowBox' sx={{ border: "1px solid #EFF0F6", borderRadius: "5px" }}>
        <XImageRender
          callBack={updateField}
          editData={{
            relativeUrl: socialShareInfo.SocialOgImage,
          }}
          isCrop={false}
        />
        <Box className='rowBox' sx={{ padding: "5px 10px", margin: "0 !important" }}>
          <Typography className='labelbox' variant='p4regular'>
            {socialShareInfo.SocialOgURL ? socialShareInfo.SocialOgURL : ""}
          </Typography>
          <Typography className='labelbox' variant='p4regular'>
            {socialShareInfo.SocialOgTitle.substring(0, socialSharePreviewNameLength)}
            {socialShareInfo.SocialOgTitle.length > socialSharePreviewNameLength && (
              <span>...</span>
            )}
          </Typography>
          <Typography className='labelbox' variant='p4regular'>
            {socialShareInfo.SocialOgDescription.substring(0, socialSharePreviewDescriptionLength)}
            {socialShareInfo.SocialOgDescription.length > socialSharePreviewDescriptionLength && (
              <span>...</span>
            )}
          </Typography>
        </Box>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_seo_title")}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgTitle}
          onChange={(e) => handleDataChange(e, "SocialOgTitle")}
          size='small'
          variant='outlined'
          placeholder={t("page_search_title_placeholder")}
          inputProps={{ maxLength: socialShareNameLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_seo_description")}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgDescription}
          onChange={(e) => handleDataChange(e, "SocialOgDescription")}
          size='small'
          variant='outlined'
          placeholder={t("page_info_about_placeholder")}
          inputProps={{ maxLength: socialShareDescriptionLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_seo_url")}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgImage}
          onChange={(e) => handleDataChange(e, "SocialOgImage")}
          size='small'
          variant='outlined'
          placeholder={t("page_seo_url_placeholder")}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <Box className='rowBox'>
        <TwitterSettings />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_ogsite")}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgSiteName}
          onChange={(e) => handleDataChange(e, "SocialOgSiteName")}
          size='small'
          variant='outlined'
          placeholder={t("page_info_about_placeholder")}
          inputProps={{ maxLength: socialShareNameLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_ogtype")}
        </Typography>
        <FormControl size='small' variant='outlined' sx={{ width: "100%" }}>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={socialShareInfo.SocialOgType}
            size='small'
            variant='outlined'
            onChange={(e) => handleDataChange(e, "SocialOgType")}
            IconComponent={() => <ExpandMore />}>
            {ogTypes.map((item, index) => {
              return (
                <MenuItem
                  value={item}
                  key={index}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 0, 0, 0.16)",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.16)",
                    },
                  }}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_ogurl")}
        </Typography>
        <TextField
          multiline
          value={socialShareInfo.SocialOgURL}
          onChange={(e) => handleDataChange(e, "SocialOgURL")}
          variant='outlined'
          size='small'
          placeholder={t("page_ogurl_placeholder")}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_oglocal")}
        </Typography>
        <FormControl size='small' variant='outlined' sx={{ width: "100%" }}>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            size='small'
            variant='outlined'
            value={socialShareInfo.SocialOgLocale}
            onChange={(e) => handleDataChange(e, "SocialOgLocale")}
            IconComponent={() => <ExpandMore />}>
            {ogLocale.map((item, index) => {
              return (
                <MenuItem
                  value={item}
                  key={index}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 0, 0, 0.16)",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.16)",
                    },
                  }}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={initialSocialShare.current === socialShareInfo}
          sx={{ width: "100%" }}
          onClick={saveSocialShare}>
          {t("done")}
        </Button>
      </Box>
    </Box>
  );
};
export default SocialShare;
