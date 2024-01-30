import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import DamContentGallery from "./components/damContentGallery/DamContentGallery";
import {
  UploadIcon,
  ThemeConstants,
  ShowToastError,
  nullToObject,
  ShowToastSuccess,
  relativeImageURL,
} from "@platformx/utilities";
import { useTranslation } from "react-i18next";
import { usePostImageCrop } from "./hooks/usePostImageCrop";
import ImageCrop from "./components/ImageCrop";
import CachedIcon from "@mui/icons-material/Cached";
import ImageRender from "./components/ImageRender";
import ShowCaseCrops from "./components/ShowCaseCrops";

//custom check for rerender
const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

const XImageRender = ({ callBack, data, isCrop = true }): any => {
  const { t } = useTranslation();
  const { postRequest } = usePostImageCrop();
  const [operationType, setOperationType] = useState<string>("choose");
  const [processing, setProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: "",
    title: "",
    description: "",
    bitStreamId: "",
  });
  const [returnData, setReturnData] = useState(data);
  const [manualCropShow, setManualCropShow] = useState(false);
  const [showCropPreview, setShowCropPreview] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);

  const autoCropCallBack = (dat, img) => {
    if (dat) {
      const {
        images = [],
        ext,
        original_image_relative_path = "",
        visibility = "",
        bitstream_id,
      } = nullToObject(dat);
      if (images?.length > 0) {
        const retdata = {
          published_images: images,
          original_image: {
            original_image_relative_path,
            bitStreamId: bitstream_id,
            auto: true,
            ext: ext,
            visibility,
            Thumbnail: img?.Thumbnail,
            Title: img?.title,
          },
          selected_image: img,
        };
        setReturnData(retdata);
        setProcessing(false);
        setGalleryDialogOpen(false);
        ShowToastSuccess(`${t("auto_cropped_successfully")}`);
        callBack(retdata);
      } else {
        setProcessing(false);
        setGalleryDialogOpen(false);
        setManualCropShow(true);
        ShowToastError(`${t("auto_cropping_failed")}`);
      }
    }
  };

  const autoCropFunc = async (selectedImg) => {
    setProcessing(true);
    const payload = {
      url: selectedImg.Thumbnail,
      bitstreamId: selectedImg.bitStreamId,
      visibility: "public",
    };
    await postRequest("api/v1/assets/image/auto-crop", payload, autoCropCallBack, selectedImg);
  };

  const noCropCallBack = (data, img) => {
    const relativeUrl = `${data?.original_image_relative_path}.${data?.ext}`;
    setReturnData({ relativeUrl: relativeUrl });
    callBack({ relativeUrl: relativeUrl, selected_img: img });
  };

  const noCropFunc = async (image) => {
    const payload = {
      bitstreamId: image.bitStreamId,
      visibility: "public",
    };
    await postRequest("api/v1/assets/image/no-crop", payload, noCropCallBack, image);
  };

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
    if (isCrop) {
      autoCropFunc(image);
    } else {
      noCropFunc(image);
    }
  };

  const toggleGallery = (toggleState: boolean, type: string) => {
    setGalleryDialogOpen(toggleState);
    if (type === "cancel") {
      setSelectedImage({
        title: "",
        Thumbnail: "",
        description: "",
        bitStreamId: "",
      });
    }
  };

  const showGallery = () => {
    window.scrollTo(0, 0);
    setGalleryDialogOpen(true);
  };

  const onUploadClick = (type) => {
    setOperationType(type);
    showGallery();
  };

  const backTo = () => {
    if (manualCropShow) setManualCropShow(false);
    if (showCropPreview) setShowCropPreview(false);
  };

  const doneCropCompleted = (
    cropImages = [],
    ext = "",
    original_image_relative_path = "",
    visibility = "",
    bitstream_id = "",
    img: any = {},
  ) => {
    if (cropImages && cropImages.length > 0) {
      const data = {
        published_images: cropImages,
        original_image: {
          original_image_relative_path,
          bitStreamId: bitstream_id,
          auto: false,
          ext: ext,
          visibility,
          Thumbnail: img?.Thumbnail,
          Title: img?.title,
        },
        selected_image: img,
      };
      setReturnData(data);
      callBack(data);
    }
    setManualCropShow(false);
  };

  const handleEdit = () => {
    setShowCropPreview(false);
    setManualCropShow(true);
  };

  const changeCrop = () => {
    setShowCropPreview(true);
  };

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(returnData)) {
      setReturnData(data);
      console.warn("data", data, returnData);
      setSelectedImage({
        Thumbnail: data?.original_image?.Thumbnail,
        title: "",
        description: "",
        bitStreamId: data?.original_image?.bitStreamId,
      });
    }
  }, [data]);
  return (
    <Fragment>
      <Box
        sx={{
          backgroundColor: "#FFF",
        }}>
        {galleryDialogOpen && (
          <DamContentGallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            assetType={"Image"}
            processing={processing}
            dialogOpen={galleryDialogOpen}
            isCrop={isCrop}
          />
        )}
      </Box>
      {returnData.published_images && returnData.published_images.length > 0 ? (
        <Box
          key={`published_images_length_${returnData.published_images.length}`}
          sx={{
            position: "relative", //height: "91%"
            borderRadius: "15px",
            minHeight: "206px",
            "& picture": {
              height: "206px",
            },
          }}
          mb={2}>
          <ImageRender
            data={returnData}
            selectedImage={selectedImage}
            imgOrder={{
              1440: "hero",
              1280: "landscape",
              1024: "card2",
              768: "square",
              600: "card2",
              320: "card2",
            }}
            changeCrop={changeCrop}
          />
          <Box
            sx={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#7470708a",
              borderRadius: "15px",
            }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ cursor: "pointer" }} onClick={() => onUploadClick("replace")}>
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
                  mt={1}
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: ThemeConstants.WHITE_COLOR,
                    textTransform: "capitalize",
                  }}>
                  {t("replace")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : returnData.relativeUrl ? (
        <Box
          sx={{
            position: "relative", //height: "91%"
            borderRadius: "15px",
            minHeight: "206px",
            "& picture": {
              height: "206px",
            },
          }}
          mb={2}>
          <img
            style={{
              width: "100%",
              height: "206px",
              objectFit: "cover",
              display: "flex",
              borderRadius: "15px",
            }}
            src={relativeImageURL(returnData.relativeUrl)}
            alt='socialshare'
          />
          <Box
            sx={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#7470708a",
              borderRadius: "15px",
            }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ cursor: "pointer" }} onClick={() => onUploadClick("replace")}>
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
                  mt={1}
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: ThemeConstants.WHITE_COLOR,
                    textTransform: "capitalize",
                  }}>
                  {t("replace")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            borderRadius: "15px",
            cursor: "pointer",
            height: "206px",
            backgroundColor: "#EFF0F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          onClick={() => onUploadClick("choose")}>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            m={1}>
            <img src={UploadIcon} alt='UploadIcon' />
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
            }}>
            <Typography variant='h5medium'>Choose your image</Typography>
          </Box>
        </Box>
      )}
      {manualCropShow && (
        <ImageCrop
          open={manualCropShow}
          backTo={backTo}
          doneCropCompleted={doneCropCompleted}
          originalImage={selectedImage}
        />
      )}
      {showCropPreview && (
        <ShowCaseCrops
          open={showCropPreview}
          backTo={backTo}
          handleEdit={handleEdit}
          data={returnData}
        />
      )}
    </Fragment>
  );
};

export default React.memo(XImageRender, areEqual);
