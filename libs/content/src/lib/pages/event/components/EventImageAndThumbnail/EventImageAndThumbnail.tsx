import { Box, Grid } from "@mui/material";
import { Category, ContentAction, ContentType } from "@platformx/content";
import {
  AddImage,
  CommonBoxWithNumber,
  ErrorTooltip,
  TitleSubTitle,
  useAccess,
} from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../../components/Common/commonStyles/disabledStyles.css";
import { useCustomStyle } from "../../CreateEvent.styles";
import { ImageThumbnailProp } from "../../CreateEvent.types";
import { IMAGES, IMAGE_URL } from "../../Utils/Constants";

const EventImageAndThumbnail = ({
  state,
  setState,
  showGalleryHandle,
  setPreviewButton,
  selectedImage,
}: ImageThumbnailProp) => {
  const { t } = useTranslation();
  const [operationType, setOperationType] = useState<string>("");
  const { canAccessAction } = useAccess();
  const [imageUrlLink, setImageUrlLink] = useState("");

  const updateField = (updatedPartialObj) => {
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...updatedPartialObj,
    };
    setState(modifiedData);
  };

  const onUploadClick = (type) => {
    showGalleryHandle(IMAGES, IMAGE_URL);
    setOperationType(type);
  };

  useEffect(() => {
    setImageUrlLink(state.imageUrl);
    if (state.imageUrl) {
      setPreviewButton((prevValue) => {
        if (prevValue) {
          return false;
        }
      });
    }
  }, [state.imageUrl]);
  const classes = useCustomStyle();

  return (
    <>
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
              <ErrorTooltip
                component={
                  <Box
                    classes={
                      !canAccessAction(Category.Content, ContentType.Event, ContentAction.View) &&
                      "disable"
                    }>
                    <AddImage
                      url={imageUrlLink}
                      onUploadClick={onUploadClick}
                      type='Images'
                      operationType={operationType}
                      content={selectedImage}
                      updateField={updateField}
                      originalImage={state?.original_image}
                      publishedImages={state?.published_images}
                      isShowCrop={true}
                    />
                  </Box>
                }
                doAccess={!canAccessAction(Category.Content, ContentType.Event, ContentAction.View)}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </Box>
    </>
  );
};

export default React.memo(EventImageAndThumbnail);
