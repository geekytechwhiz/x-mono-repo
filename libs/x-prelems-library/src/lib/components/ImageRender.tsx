import { CardMedia, Paper } from "@mui/material";
import { fallBackImage, formCroppedUrlString } from "@platformx/utilities";
import Image from "next/image";
import React, { useState } from "react";
import { breakpoints, ratios } from "./ConstantData";

const ImageRender = (props: any = {}) => {
  const [error, setError] = useState(false);
  const {
    originalImage = {},
    publishedImages = [],
    imgOrder = {
      1440: "hero",
      1280: "landscape",
      1024: "card2",
      768: "square",
      600: "card1",
      320: "portrait",
    },
    height = "100%",
    width = "100%",
    secondaryArgs: { bucketName, gcpUrl },
  } = props;
  const { original_image_relative_path, ext } = originalImage;

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      {error ? (
        <Image
          src={fallBackImage}
          style={{ objectFit: "contain", width: width, height: height }}
          alt='fallbackimage'
        />
      ) : (
        <>
          {publishedImages && publishedImages.length > 0 ? (
            <CardMedia
              component='picture'
              sx={{
                aspectRatio: {
                  xs: ratios[imgOrder["320"]],
                  sm: ratios[imgOrder["600"]],
                  md: ratios[imgOrder["768"]],
                  em: ratios[imgOrder["1024"]],
                  lg: ratios[imgOrder["1280"]],
                  xl: ratios[imgOrder["1440"]],
                },
                height: height,
                objectFit: "cover",
                width: width,
              }}>
              {breakpoints.map(({ breakpoint, ratio }, key) => {
                // const img = publishedImages.find(
                //   ({ aspect_ratio }: any) => aspect_ratio === (imgOrder[breakpoint] || ratio),
                // );
                // const { folder_path: imgPath = "" } = img || {};
                return (
                  <React.Fragment key={key}>
                    {/* <source
                      media={`(min-width:${breakpoint}px)`}
                      srcSet={formCroppedUrlString(gcpUrl, bucketName, imgPath, "webp")}
                    />
                    <source
                      media={`(min-width:${breakpoint}px)`}
                      srcSet={formCroppedUrlString(gcpUrl, bucketName, imgPath, ext)}
                    /> */}
                    source has been commented
                  </React.Fragment>
                );
              })}
              <Image
                alt='cropped-img'
                src='https://storage.googleapis.com/cropped_image_public/machine_assets/1689934844153xyz/public/png/WebsiteIntroduction.png'
                onError={handleError}
                style={{
                  width: width,
                  height: height,
                  objectFit: "cover",
                  display: "flex",
                }}
                className='rounderCardImages'
              />
            </CardMedia>
          ) : (
            <Paper
              sx={{
                aspectRatio: {
                  xs: ratios[imgOrder["320"]],
                  sm: ratios[imgOrder["600"]],
                  md: ratios[imgOrder["768"]],
                  em: ratios[imgOrder["1024"]],
                  lg: ratios[imgOrder["1280"]],
                  xl: ratios[imgOrder["1440"]],
                },
              }}>
              <picture>
                Soure has been commented
                {/* <source
                  srcSet={formCroppedUrlString(gcpUrl, bucketName, original_image_relative_path, "webp")}
                  type='image/webp'
                />
                <source
                  srcSet={formCroppedUrlString(gcpUrl, bucketName, original_image_relative_path, ext)}
                /> */}
                <Image
                  src={
                    formCroppedUrlString(gcpUrl, bucketName, original_image_relative_path, ext).src
                  }
                  onError={handleError}
                  // width='100%'
                  // height='100%'
                  style={{ objectFit: "cover", display: "flex" }}
                  alt='prelem default image'
                />
              </picture>
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(ImageRender);
