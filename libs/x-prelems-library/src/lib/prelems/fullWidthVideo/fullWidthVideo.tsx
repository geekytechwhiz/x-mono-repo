/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import {
  Analytics,
  AuthoringHelper,
  SecondaryArgs,
  fetchCroppedUrl,
  formCroppedUrlString,
  getThumbImages,
} from "@platformx/utilities";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";
import { useCustomStyle } from "./FullWidthVideo.style";
import useCustomMediaQuery from "../../components/CustomHook/useCustomMediaQuery";

const FullWidthVideo = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: FullWidthVideoProp) => {
  const mediaQueryValues = useCustomMediaQuery();
  const { bucketName, gcpUrl } = secondaryArgs;
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const generateStructureData = () => {
    let fullWidthVideoStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);
    if (firstRender.current && String(tempSD).length > 0) {
      fullWidthVideoStructureData = JSON.parse(tempSD);
    } else {
      try {
        fullWidthVideoStructureData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "VideoObject",
              contentUrl: content?.Videos?.Video_1?.Url,
              name: content?.Videos?.Video_1?.Title,
              description: content?.Videos?.Video_1?.Description,
              embedUrl: content?.Videos?.Video_1?.Url,
              thumbnailUrl: formCroppedUrlString(
                gcpUrl,
                bucketName,
                content?.Videos?.Video_1.Thumbnail,
                content?.Videos?.Video_1.ext,
              ).src,
            },
          ],
        };
      } catch (e) {
        fullWidthVideoStructureData = {};
      }
    }
    firstRender.current = false;
    return fullWidthVideoStructureData;
  };
  const thumbnailImg = getThumbImages(content?.Videos?.Video_1?.Thumbnail);
  const posterImage =
    thumbnailImg &&
    fetchCroppedUrl(
      content?.Videos?.Video_1?.Url ? content.Videos.Video_1.Url : "",
      thumbnailImg,
      {
        1440: "landscape",
        1280: "landscape",
        1024: "landscape",
        768: "landscape",
        600: "landscape",
        320: "landscape",
      },
      {},
      mediaQueryValues,
      secondaryArgs,
      false,
      content?.Videos?.Video_1?.ext ? content.Videos.Video_1.ext : "",
    );

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    content?.Title,
    content?.Videos?.Video_1?.Url,
    content?.Videos?.Video_1?.Title,
    content?.Videos?.Video_1?.Description,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  const classes = useCustomStyle();
  return (
    <Box ref={authoringHelper?.innerRef}>
      <Box ref={ref} className={`${classes.fullWidthVideoWrapper} fullWidthVideoProp`}>
        <VideoPlayer
          playerProp={{
            posterImg: posterImage,
            videoUrl: content?.Videos?.Video_1.Url,
          }}
        />
      </Box>
    </Box>
  );
};

interface FullWidthVideoProp {
  content: Content;
  analytics: Analytics;
  authoringHelper: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}

interface Content {
  Title?: string;
  Description?: string;
  Videos?: {
    Video_1: {
      Name: string;
      Url: string;
      Thumbnail: string;
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      CC: boolean;
      ext: string;
    };
  };
  TagName?: string;
}

FullWidthVideo.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: "Full Width Video",
    Description:
      "This prelem can be used to house a video which will take the full width of the screen. Here the video will be picked up from DAM.",
    Videos: {
      Video_1: {
        Name: "FullWidthVideo",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/222ba388-4da7-456a-9957-fd5a13c93c86/content",
        Title: "FullWidthVideo",
        Description: "This is for FullWidthVideo",
        Attribution: false,
        CC: false,
        ext: "png",
        visibility: "public",
        bitStreamId: "",
        Transcript: false,
        Thumbnail: {
          original_image_relative_path:
            "1710240445145/public/png/Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept",
          bitstream_id: "4af3e224-4716-464c-b7d9-8f481826bdd8",
          visibility: "public",
          ext: "png",
          urgency: 0,
          folder_path: "",
          file_name: "Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept.png",
          images: [
            {
              aspect_ratio: "card1",
              folder_path:
                "1710240445145/public/png/Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept-card1",
            },
            {
              aspect_ratio: "portrait",
              folder_path:
                "1710240445145/public/png/Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept-portrait",
            },
            {
              aspect_ratio: "square",
              folder_path:
                "1710240445145/public/png/Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept-square",
            },
            {
              aspect_ratio: "hero",
              folder_path:
                "1710240445145/public/png/Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept-hero",
            },
            {
              aspect_ratio: "landscape",
              folder_path:
                "1710240445145/public/png/Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept-landscape",
            },
            {
              aspect_ratio: "card2",
              folder_path:
                "1710240445145/public/png/Y2Mate-is-Santas-gift-The-Audi-grandsphere-concept-card2",
            },
          ],
        },
      },
    },
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Full Width Video",
    pageDesc: "Video, Full Width Video",
    pageTags: "Video, Full Width Video",
    prelemTags: "Video, Full Width Video",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default FullWidthVideo;
