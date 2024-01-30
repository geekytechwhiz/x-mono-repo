import { Box, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useComment } from "@platformx/authoring-apis";
import { CommonBoxWithNumber, TitleSubTitle } from "@platformx/utilities";
import { useCustomStyle } from "../quiz.style";
import { CommentWrapper } from "@platformx/comment-review";
import { XImageRender } from "@platformx/x-image-render";

const ImageVideo = ({ state, setState, quizRef, unsavedChanges }) => {
  const { t } = useTranslation();
  const { scrollToRef } = useComment();

  const updateField = (updatedPartialObj) => {
    console.warn("final data", updatedPartialObj);
    const relativeUrl = `${updatedPartialObj?.original_image.original_image_relative_path}.${updatedPartialObj?.original_image.ext}`;
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
      thumbnailURL: updatedPartialObj?.original_image?.Thumbnail,
      socialShareImgURL: relativeUrl,
    };
    setState(modifiedData);
    quizRef.current = {
      ...quizRef.current,
      ...updatedPartialObj,
      thumbnailURL: updatedPartialObj?.original_image?.Thumbnail,
      socialShareImgURL: relativeUrl,
    };
    unsavedChanges.current = true;
  };

  const classes = useCustomStyle();
  return (
    <Box id='imageVideo' className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='2' scrollRef={scrollToRef}>
        <CommonBoxWithNumber
          number='02'
          title={t("quiz_background_head")}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t("subhead")}>
          <Grid container>
            <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={`${t("add_image")}*`}
                subTitle={t("quiz_image_subtitle")}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
              <XImageRender
                callBack={updateField}
                data={{
                  original_image: state.original_image,
                  published_images: state.published_images,
                }}
                isCrop={true}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};

export default React.memo(ImageVideo);
