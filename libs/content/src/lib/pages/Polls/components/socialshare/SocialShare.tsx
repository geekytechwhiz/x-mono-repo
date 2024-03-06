import { Grid } from "@mui/material";
import { Box } from "@mui/system";
// import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AutoCompleteText,
  AutoTextArea,
  CommonBoxWithNumber,
  TextBox,
  TitleSubTitle,
} from "@platformx/utilities";
import { XImageRender } from "@platformx/x-image-render";

import { useCustomStyle } from "../../Poll.style";

const SocialShare = ({ state, setState, pollRef, unsavedChanges }) => {
  const { t } = useTranslation();
  // const [socialShareInfo, setSocialShareInfo] = useState({
  //   url: "",
  //   title: "",
  //   description: "",
  //   tags: [],
  // });
  const handleChange = (event) => {
    unsavedChanges.current = true;
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    pollRef.current = {
      ...pollRef.current,
      [event.target.name]: event.target.value,
    };
  };
  const updateField = (data) => {
    setState({ ...state, socialShareImgURL: data.relativeUrl });
    pollRef.current = {
      ...pollRef.current,
      socialShareImgURL: data.relativeUrl,
    };
    unsavedChanges.current = true;
  };
  const classes = useCustomStyle();
  return (
    <Box id='socialShare' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='07'
        title={t("social_share")}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t("subhead")}>
        <Grid container>
          <Grid item xs={12} sm={5} md={5} className='leftFiled'>
            <TitleSubTitle
              title={t("choose_image")}
              subTitle={t("page_choose_image")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiled'>
            {/* <AddImage
              url={relativeImageURL(state.socialShareImgURL)}
              onUploadClick={onUploadClick}
              handleChange={handleChange}
              type='Images'
            /> */}
            <XImageRender
              callBack={updateField}
              editData={{
                relativeUrl: state.socialShareImgURL,
              }}
              isCrop={false}
            />
          </Grid>

          <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
            <TitleSubTitle
              title={t("poll_ss_title")}
              subTitle={t("quiz_ss_subtitle")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} className='textFiled'>
            <TextBox
              name='titleSocialShare'
              placeHolder={t("quiz_title_placeholder")}
              handleChange={handleChange}
              maxCharLength={120}
              state={state.titleSocialShare}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} className='leftFiled'>
            <TitleSubTitle
              title={t("poll_ss_description")}
              subTitle={t("quiz_ss_subdescription")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiled'>
            <AutoTextArea
              name='descriptionSocialShare'
              placeHolder={t("quiz_description_placeholder")}
              handleChange={handleChange}
              maxCharLength={400}
              state={state.descriptionSocialShare}
            />
          </Grid>

          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t("quiz_tags_title")}
              subTitle={t("quiz_tags_subtitle")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
            <AutoCompleteText socialShareInfo={state} setSocialShareInfo={setState} />
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default SocialShare;
