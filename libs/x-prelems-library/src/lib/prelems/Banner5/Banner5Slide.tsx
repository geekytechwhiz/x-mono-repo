import EastIcon from "@mui/icons-material/East";
import { Box, Typography } from "@mui/material";
import { Analytics } from "@platformx/utilities";
import React from "react";
import BasicButton from "../../components/BasicButton/BasicButton";
import ImageRender from "../../components/ImageRender";
import "./Banner5.css";

const Banner5Slide = ({
  idfortitle,
  title,
  img,
  analytics,
  authoringHelper,
  secondaryArgs,
  ButtonObj,
  buttonDataObj,
  showSlide,
}: Banner5SlideProps) => {
  return (
    <Box
      className={
        authoringHelper?.isEditing ? "slideWithoutStyles" : `slide ${showSlide ? "active" : ""}`
      }
      sx={{ display: showSlide ? "block" : "none" }}>
      <Box className='gradient'></Box>
      <ImageRender
        originalImage={img?.original_image}
        publishedImages={img?.published_images}
        secondaryArgs={secondaryArgs}
        imgOrder={{
          1440: "landscape",
          1280: "landscape",
          1024: "card2",
          768: "square",
          600: "card1",
          320: "portrait",
        }}
      />
      <Box className='slide-content'>
        <Box className={`slide-caption caption`}>
          <Box
            className={`animationEffect ${
              !authoringHelper?.isEditing && showSlide ? "animated" : ""
            }`}>
            <Typography
              className='animatedTitle'
              id={idfortitle}
              variant='h1regular'
              color='textColor'>
              {title}
            </Typography>
            <Box className='linkButton'>
              <BasicButton
                openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                isAuthoring={analytics?.isAuthoring}
                currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                variant='defaultButton3'
                analyticsEnabled={analytics?.isAnalyticsEnabled}
                ButtonObj={ButtonObj}
                isEditing={authoringHelper?.isEditing}
                buttonDataObj={buttonDataObj}
                secondaryArgs={secondaryArgs}
                endIcon={<EastIcon />}
                analytics={analytics}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface Banner5SlideProps {
  idfortitle: string;
  title: string;
  img: {
    original_image: object;
    published_images: PublishedImages[];
  };
  analytics: Analytics;
  authoringHelper: AuthoringHelper;
  secondaryArgs: any;
  ButtonObj: object;
  buttonDataObj: object;
  showSlide: boolean;
}

interface PublishedImages {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}

interface AuthoringHelper {
  innerRef: React.Ref<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
}
export default Banner5Slide;
