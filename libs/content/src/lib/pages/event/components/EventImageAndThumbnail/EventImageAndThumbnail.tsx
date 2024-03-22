import { Box, Grid } from "@mui/material";
import { CommonBoxWithNumber, TitleSubTitle } from "@platformx/utilities";
import React from "react";
import { useTranslation } from "react-i18next";
// import "../../../../components/Common/commonStyles/disabledStyles.css";
import { XImageRender } from "@platformx/x-image-render";
import { useCustomStyle } from "../../CreateEvent.styles";
import { ImageThumbnailProp } from "../../CreateEvent.types";

const EventImageAndThumbnail = ({
  state,
  setState,
  eventWholeRef,
  unsavedChanges,
}: ImageThumbnailProp) => {
  const { t } = useTranslation();
  const updateField = (updatedPartialObj) => {
    const relativeUrl = `${updatedPartialObj?.original_image.original_image_relative_path}.${updatedPartialObj?.original_image.ext}`;
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
      thumbnailURL: updatedPartialObj?.original_image?.Thumbnail,
      socialShareImgURL: relativeUrl,
    };
    setState(modifiedData);
    eventWholeRef.current = {
      ...eventWholeRef.current,
      ...updatedPartialObj,
      thumbnailURL: updatedPartialObj?.original_image?.Thumbnail,
      socialShareImgURL: relativeUrl,
    };
    unsavedChanges.current = true;
  };

  const classes = useCustomStyle();

  return (
    <Box id='ImageAndThumbnail' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='01'
        title={t("choose_the_image")}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t("subhead")}>
        <Grid container>
          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t("event_image_tilte")}
              subTitle={t("event_image_subtitle")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
            <XImageRender
              callBack={updateField}
              editData={{
                original_image: state.original_image,
                published_images: state.published_images,
              }}
            />
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  );
};

export default React.memo(EventImageAndThumbnail);
