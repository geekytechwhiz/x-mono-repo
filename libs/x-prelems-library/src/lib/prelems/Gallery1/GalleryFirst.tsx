import React from "react";
import { Box } from "@mui/material";
import "./Gallery1.css";
import { formCroppedUrlString } from "@platformx/utilities";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";
import Image from "next/image";

function GalleryFirst({ GalleryOne, handleOpen, secondaryArgs }: any) {
  return (
    <Box className='gallery1FirstBox'>
      {GalleryOne?.map((item: any, index: number) => {
        return (
          <Box
            className='gallery1ImageWrapper'
            key={`${item?.Title}_${index.toString()}`}
            onClick={() => handleOpen(GalleryOne, index)}>
            {!("Thumbnail" in item) ? (
              <Image
                alt='Gallery1'
                src={
                  formCroppedUrlString(
                    secondaryArgs?.gcpUrl,
                    secondaryArgs?.bucketName,
                    item?.Url,
                    item?.ext,
                  ).src
                }
              />
            ) : (
              <VideoPlayer
                playerProp={{
                  posterImg: "",
                  videoUrl: item.Url,
                  controls: false,
                  loop: true,
                  classname: "videobox",
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default GalleryFirst;
