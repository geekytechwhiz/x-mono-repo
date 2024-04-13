import CachedIcon from "@mui/icons-material/Cached";
import { Box, Typography } from "@mui/material";
import {
  Icon,
  Refresh,
  ShowToastError,
  ShowToastSuccess,
  ThemeConstants,
  UploadThumbnail,
  nullToObject,
  relativeImageURL,
} from "@platformx/utilities";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageCrop from "./components/ImageCrop";
import ImageRender from "./components/ImageRender";
import ShowCaseCrops from "./components/ShowCaseCrops";
import DamContentGallery from "./components/damContentGallery/DamContentGallery";
import { usePostImageCrop } from "./hooks/usePostImageCrop";

//custom check for rerender
// const areEqual = (prevProps, nextProps) => {
//   return JSON.stringify(prevProps) === JSON.stringify(nextProps);
// };
interface XImageRenderProps {
  callBack: (obj: any, name?: string) => void;
  editData: any;
  isCrop?: boolean;
  name?: string;
  isColorPallete?: boolean;
  // eslint-disable-next-line react/require-default-props
  handleRefresh?: () => void;
  // eslint-disable-next-line react/require-default-props
  handleColorPallete?: (color: string) => void;
}

const XImageRender = ({
  callBack,
  editData,
  isCrop = true,
  name = "",
  isColorPallete = false,
  handleRefresh,
  handleColorPallete,
}: XImageRenderProps) => {
  const { t } = useTranslation();
  const { postRequest } = usePostImageCrop();
  const [processing, setProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: "",
    title: "",
    description: "",
    bitStreamId: "",
  });
  const [returnData, setReturnData] = useState(editData);
  const [manualCropShow, setManualCropShow] = useState(false);
  const [showCropPreview, setShowCropPreview] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [isImage, setIsImage] = useState(editData.isImg || false);
  const colorCode = [
    "#b29a53",
    "#ba8b78",
    "#ae6958",
    "#d86057",
    "#b75c8d",
    "#68669a",
    "#5c98ba",
    "#334075",
    "#246d73",
    "#806a71",
    "#514146",
  ];

  const autoCropCallBack = (data, img) => {
    if (data) {
      const {
        images = [],
        ext,
        original_image_relative_path = "",
        visibility = "",
        bitstream_id,
      } = nullToObject(data);
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
        if (name) callBack(retdata, name);
        else callBack(retdata);
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

    if (name) callBack({ relativeUrl: relativeUrl, selected_img: img }, name);
    else callBack({ relativeUrl: relativeUrl, selected_img: img });
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

  const onUploadClick = () => {
    if (!isImage) setIsImage(true);
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
      if (name) callBack(data, name);
      else callBack(data);
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
    if (editData && JSON.stringify(editData) !== JSON.stringify(returnData)) {
      setReturnData(editData);
      setSelectedImage({
        Thumbnail: editData?.original_image?.Thumbnail,
        title: "",
        description: "",
        bitStreamId: editData?.original_image?.bitStreamId,
      });
      setIsImage(editData?.isImg);
    }
  }, [editData]);
  return (
    <Fragment>
      {isColorPallete && editData.colorCode && !isImage ? (
        <Box
          sx={{
            width: "100%",
            height: "206px",
            aspectRatio: {
              xs: "4 / 3",
              sm: "4 / 3",
              md: "1 / 1",
              em: "4 / 3",
              lg: "16 / 9",
              xl: "3 / 1",
            },
            backgroundColor: editData.colorCode,
            borderRadius: "15px",
          }}></Box>
      ) : (
        <>
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
                  <Box sx={{ cursor: "pointer" }} onClick={() => onUploadClick()}>
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
                  <Box sx={{ cursor: "pointer" }} onClick={() => onUploadClick()}>
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
              onClick={() => onUploadClick()}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                m={1}>
                <img src={UploadThumbnail} alt='UploadIcon' />
              </Box>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  color: ThemeConstants.PRIMARY_MAIN_COLOR,
                }}>
                <Typography variant='h5medium'>{t("choose_your_image")}</Typography>
              </Box>
            </Box>
          )}
        </>
      )}
      {isColorPallete && (
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
            flexFlow: { xs: "wrap", lg: "nowrap" },
          }}>
          <Box
            onClick={() => onUploadClick()}
            sx={{
              width: "27px",
              height: "27px",
              flexGrow: "0",
              borderRadius: "20px",
              backgroundColor: "#fff",
              margin: {
                xs: "0px 8px 8px 0px",
                lg: "0px 8px 8px 0px",
              },
              border: "solid 1px #2d2d39",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}>
            <img src={Icon} alt='Icon' />
          </Box>
          {colorCode.map((val, index) => {
            return (
              <Box
                key={index}
                onClick={() =>
                  typeof handleColorPallete !== "undefined" ? handleColorPallete(val) : ""
                }
                sx={{
                  width: "27px",
                  height: "27px",
                  flexGrow: "0",
                  borderRadius: "20px",
                  backgroundColor: val,
                  margin: {
                    xs: "0px 8px 8px 0px",
                    lg: "0px 8px 8px 0px",
                  },
                  border: val === "#fff" ? "solid 1px #e6eaed" : null,
                  cursor: "pointer",
                }}></Box>
            );
          })}
          <Box
            onClick={() => (typeof handleRefresh !== "undefined" ? handleRefresh() : "")}
            sx={{
              width: "27px",
              height: "27px",
              flexGrow: "0",
              borderRadius: "20px",
              backgroundColor: "#fff",
              border: "solid 1px #ced3d9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              margin: {
                xs: "0px 8px 8px 0px",
                lg: "0px 0px 8px 0px",
              },
            }}>
            <img src={Refresh} alt='Refresh' />
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

XImageRender.defaultProps = {
  isCrop: true,
  name: "",
  isColorPallete: false,
};

export default React.memo(XImageRender);
