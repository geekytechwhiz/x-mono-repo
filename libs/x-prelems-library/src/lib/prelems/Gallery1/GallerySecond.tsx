import React from "react";
import { Box } from "@mui/material";
import "./Gallery1.css";
import { formCroppedUrl } from "@platformx/utilities";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";

function GallerySecond({ GalleryTwo, handleOpen, secondaryArgs }: any) {
  return (
    <Box className='gallery1FirstBox'>
      {GalleryTwo?.map((item: any, index: number) => {
        return (
          <Box
            className='gallery1ImageWrapper'
            key={`${item?.Title}_${index.toString()}`}
            onClick={() => handleOpen(GalleryTwo, index)}>
            {!("Thumbnail" in item) ? (
              <img
                alt='gallery 1'
                src={formCroppedUrl(
                  secondaryArgs?.gcpUrl,
                  secondaryArgs?.bucketName,
                  item?.Url,
                  item?.ext,
                )}
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

export default GallerySecond;
