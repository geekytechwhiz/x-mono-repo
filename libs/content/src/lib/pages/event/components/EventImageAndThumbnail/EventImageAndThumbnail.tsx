import { Box, Grid } from "@mui/material";
import { CommonBoxWithNumber, TitleSubTitle, useAccess } from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import "../../../../components/Common/commonStyles/disabledStyles.css";
import { XImageRender } from "@platformx/x-image-render";
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
  console.log("state", state);

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
      // setPreviewButton((prevValue) => {
      //   if (prevValue) {
      //     return false;
      //   }
      // });
    }
  }, [state.imageUrl]);
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
              data={{
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
