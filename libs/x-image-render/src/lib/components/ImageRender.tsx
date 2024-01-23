import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { nullToObject } from "@platformx/utilities";
import PictureComponent from "./PictureComponent";
import { RATIOS } from "../utils/constants";

const ImageRender = (props: any = {}) => {
  const {
    data = {},
    imgOrder = {
      1440: "hero",
      1280: "hero",
      1024: "portrait",
      768: "portrait",
      600: "square",
      320: "square",
    }, //breakpoints with ratios
    changeCrop,
    selectedImage,
  } = nullToObject(props);

  const { published_images: cropped_images, original_image = {} } = data || {};
  const { ext } = original_image || {};
  const { Thumbnail } = selectedImage || {};

  const RoundBox = styled("div")({
    position: "absolute",
    right: "20px",
    top: "20px",
    width: "40px",
    height: "40px",
    background: "#fff",
    zIndex: "9",
    borderRadius: "4px",
    boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  return (
    <>
      <RoundBox onClick={changeCrop}>
        <ViewQuiltIcon
          sx={{
            fontSize: { md: "22px" },
          }}
        />
      </RoundBox>
      {cropped_images && cropped_images.length > 0 ? (
        <PictureComponent croppedImages={cropped_images} imgOrder={imgOrder} extension={ext} />
      ) : Thumbnail && Thumbnail.search("dspace") !== -1 ? (
        <Paper
          sx={{
            aspectRatio: {
              xs: RATIOS[imgOrder["320"]],
              sm: RATIOS[imgOrder["600"]],
              md: RATIOS[imgOrder["768"]],
              em: RATIOS[imgOrder["1024"]],
              lg: RATIOS[imgOrder["1280"]],
              xl: RATIOS[imgOrder["1440"]],
            },
            height: "inherit",
          }}>
          {" "}
          <img
            alt='thumbnail'
            src={Thumbnail}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Paper>
      ) : null}
    </>
  );
};

export default React.memo(ImageRender);
