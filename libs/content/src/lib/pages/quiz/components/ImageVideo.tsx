import { Box, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useComment } from "@platformx/authoring-apis";
import { CommonBoxWithNumber, TitleSubTitle } from "@platformx/utilities";
import { useCustomStyle } from "../quiz.style";
import { CommentWrapper } from "@platformx/comment-review";
import { XImageRender } from "@platformx/x-image-render";

const ImageVideo = ({ state, setState }) => {
  const { t } = useTranslation();
  const { scrollToRef } = useComment();

  const updateField = (updatedPartialObj) => {
    console.info("final data", updatedPartialObj);
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
    };
    console.info("modified data", modifiedData);
    setState(modifiedData);
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
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};

export default React.memo(ImageVideo);
