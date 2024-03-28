/* eslint-disable no-shadow */
import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ShowToastSuccess,
  ThemeConstants,
  BasicSwitch,
  usePlatformAnalytics,
} from "@platformx/utilities";
import { PrelemImagesProps } from "../utils/editTypes";
import "../PageSettings/PageSettings.css";
import { XImageRender } from "@platformx/x-image-render";

const PrelemImages: React.FC<PrelemImagesProps> = ({
  index,
  handleSave,
  sectionToUpdate = "ImageCompound",
  original_image,
  published_images = [],
}) => {
  const { t } = useTranslation();
  const [content, setContent] = useState(original_image);
  const [handleImpression] = usePlatformAnalytics();
  const [originalImage, setOriginalImage] = useState({
    Thumbnail: original_image?.original_image_relative_path,
    bitStreamId: original_image?.bitStreamId,
    auto: original_image.auto,
    ext: original_image?.ext,
    Visibility: original_image?.visibility,
  });
  const [publishedImages, setPublishedImages] = useState(published_images);

  const UpdatePrelemInfo = () => {
    const originalImg = {
      Images: { ...original_image },
      published_images: published_images,
    };
    const currentImg = {
      Images: { ...originalImage },
      published_images: publishedImages,
    };
    if (JSON.stringify(originalImg) !== JSON.stringify(currentImg)) {
      if (content?.Title !== "" && content?.Url !== "") {
        handleSave(
          sectionToUpdate,
          {
            ImageCompound: {
              published_images: publishedImages,
              original_image: {
                ...content,
                bitStreamId: originalImage?.bitStreamId,
                ext: originalImage?.ext,
              },
            },
          },
          index,
        );
        const pageDataObj = {
          eventType: "Prelem Image Setting Saved",
          ImageSaved: true,
        };

        handleImpression(pageDataObj.eventType, pageDataObj);
        ShowToastSuccess(`${t("prelem_image_info_toast")} ${t("saved_toast")}`);
      }
    }
  };

  const handleAttribution = (event, fieldType) => {
    setContent({
      ...content,
      MetaFields: { ...content.MetaFields, [fieldType]: event.target.checked },
    });
  };

  const handleDataChange = (event, fieldType) => {
    setContent({
      ...content,
      MetaFields: { ...content.MetaFields, [fieldType]: event.target.value },
    });
  };

  const getDisabledState = () => {
    if (
      (JSON.stringify(original_image) === JSON.stringify(originalImage) &&
        JSON.stringify(published_images) === JSON.stringify(publishedImages)) ||
      content?.MetaFields?.Title === "" ||
      content?.MetaFields?.Title?.trim()?.length === 0 ||
      content?.Url === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateField = (updatedPartialObj) => {
    const { original_image = {}, published_images = [] } = updatedPartialObj || {};
    const contentNew = {
      ...content,
      Url: original_image?.Thumbnail,
      MetaFields: {
        ...content?.MetaFields,
        Title: original_image.Title,
        Description: original_image.Description,
      },
    };
    setContent(contentNew);
    setOriginalImage(original_image);
    setPublishedImages(published_images);
  };

  return (
    <Box className='ImageSecWp'>
      <Box className='rowBox'>
        <XImageRender
          callBack={updateField}
          editData={{
            original_image: originalImage,
            published_images: publishedImages,
          }}
          isCrop={true}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("prelem_image_title")}
        </Typography>
        <TextField
          multiline
          value={content?.MetaFields?.Title}
          onChange={(e) => handleDataChange(e, "Title")}
          variant='outlined'
          size='small'
          placeholder={t("page_search_title_placeholder")}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("prelem_image_about")}
        </Typography>
        <TextField
          multiline
          value={content?.MetaFields?.Description}
          onChange={(e) => handleDataChange(e, "Description")}
          variant='outlined'
          size='small'
          placeholder={t("page_info_about_placeholder")}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t("prelem_image_attribution")}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            checked={content?.MetaFields.Attribution}
            onChange={(e: any) => handleAttribution(e, "Attribution")}
          />
        </Typography>
      </Box>
      {(content?.MetaFields?.Title === "" ||
        content?.MetaFields?.Title?.trim()?.length === 0 ||
        content?.Url === "") && (
        <Typography
          variant='p4regular'
          sx={{
            color: ThemeConstants.NOTIFICATION_ERROR,
          }}>
          {t("mandatory_fields")}
        </Typography>
      )}
      <Box className='rowBox' key={`${index}_save`}>
        <Button
          variant='contained'
          disabled={getDisabledState()}
          sx={{ width: "100%" }}
          onClick={UpdatePrelemInfo}>
          {t("done")}
        </Button>
      </Box>
      <Box className='rowBox deviderBox'>
        <hr />
      </Box>
    </Box>
  );
};
export default PrelemImages;
