import { Box } from "@mui/material";
import { AutoCompleteText, AutoTextArea, TextBox, TitleSubTitle } from "@platformx/utilities";
import { XImageRender } from "@platformx/x-image-render";
import { useTranslation } from "react-i18next";
import { useStyles } from "./SocialShare.styles";

function SocialShare({
  state,
  setState,
  socialOgTags,
  setSocialOgTags,
  showGallery,
  setOperationType,
  setShow,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleOnBlur = (event) => {
    setState(
      {
        ...state,
        CommonFields: {
          ...state.CommonFields,
          settings: {
            ...state.CommonFields.settings,
            [event.target.name]: event.target.value,
          },
        },
      } || {},
    );
  };

  const uploadSocialImage = (data) => {
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        settings: {
          ...state.CommonFields.settings,
          socialog_image: `${data?.original_image?.original_image_relative_path}.${data?.original_image?.ext}`,
        },
      },
    });
  };

  return (
    <>
      <Box className={classes.container}>
        <TitleSubTitle
          title={t("choose_image")}
          subTitle={t("choose_your_image")}
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Box>
      <XImageRender
        callBack={uploadSocialImage}
        data={{
          original_image: state?.ObjectFields?.original_image,
          published_images: state?.ObjectFields?.published_images,
        }}
      />
      <Box className={classes.container}>
        <TitleSubTitle
          title={t("article_seo_title")}
          subTitle={t("quiz_ss_subtitle")}
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Box>
      <TextBox
        name='socialog_title'
        placeHolder={t("quiz_title_placeholder")}
        handleOnBlur={handleOnBlur}
        maxCharLength={120}
        state={state?.CommonFields?.settings?.socialog_title || ""}
      />
      <Box className={classes.container}>
        <TitleSubTitle
          title={t("article_seo_about")}
          subTitle={t("quiz_ss_subdescription")}
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Box>
      <AutoTextArea
        name='socialog_description'
        placeHolder={t("quiz_description_placeholder")}
        handleOnBlur={handleOnBlur}
        maxCharLength={400}
        state={state?.CommonFields?.settings?.socialog_description || ""}
      />
      <Box className={classes.container}>
        <TitleSubTitle
          title={t("quiz_tags_title")}
          subTitle={t("quiz_tags_subtitle")}
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Box>
      <AutoCompleteText socialShareInfo={socialOgTags} setSocialShareInfo={setSocialOgTags} />
    </>
  );
}

export default SocialShare;
