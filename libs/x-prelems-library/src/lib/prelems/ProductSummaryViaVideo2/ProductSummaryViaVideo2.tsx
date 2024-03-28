import { Box, Container, Typography } from "@mui/material";
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
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import prelemTypes from "../../globalStyle";
import { useCustomStyle } from "./ProductSummaryViaVideo2.style";
import useCustomMediaQuery from "../../components/CustomHook/useCustomMediaQuery";

const ProductSummaryViaVideo2 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
ProductSummaryProp) => {
  const mediaQueryValues = useCustomMediaQuery();
  const { bucketName, gcpUrl } = secondaryArgs;
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const generateStructureData = () => {
    let productSummaryViaVideoStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current && String(tempSD).length > 0) {
      productSummaryViaVideoStructureData = JSON.parse(tempSD);
    } else {
      try {
        productSummaryViaVideoStructureData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "VideoObject",
              contentUrl: content?.Videos?.Video_1?.Url,
              name: content?.Title,
              description: content?.Description,
              embedUrl: content?.Videos?.Video_1?.Url,
              thumbnailUrl: {
                "@id": formCroppedUrlString(
                  gcpUrl,
                  bucketName,
                  content?.Videos?.Video_1.Thumbnail,
                  content?.Videos?.Video_1.ext,
                ).src,
              },
            },
          ],
        };
      } catch (e) {
        productSummaryViaVideoStructureData = {};
      }
    }
    firstRender.current = false;
    return productSummaryViaVideoStructureData;
  };

  useEffect(() => {
    const child = document.querySelector<HTMLElement>("#react-player :first-child");
    if (child != null && child.style.objectFit !== "cover") {
      child.style.objectFit = "cover";
    }
  });

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Description, content?.Title, content?.Videos?.Video_1?.Url]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    const thumbnailImg = getThumbImages(content?.Videos?.Video_1?.Thumbnail);
    const posterImage =
      thumbnailImg &&
      fetchCroppedUrl(
        content?.Videos?.Video_1?.Url ? content.Videos.Video_1.Url : "",
        thumbnailImg,
        {
          1440: "card2",
          1280: "landscape",
          1024: "card2",
          768: "landscape",
          600: "landscape",
          320: "square",
        },
        {},
        mediaQueryValues,
        secondaryArgs,
        false,
        content?.Videos?.Video_1?.ext ? content.Videos.Video_1.ext : "",
      );
    return (
      <Box className='videoBoxColorWrapper'>
        <Box className='VideoBoxWrapper'>
          {content?.Videos?.Video_1.Url && (
            <VideoPlayer
              playerProp={{
                posterImg: posterImage,
                videoUrl: content?.Videos?.Video_1.Url,
                playing: false,
              }}
            />
          )}
        </Box>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='rightWrapper'>
        <Typography variant='h2semibold' id='Title'>
          {content.Title}
        </Typography>

        <Typography variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.productSummaryViaVideo2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 productSummaryViaVideo2 productSummaryViaVideo2Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='productSummaryViaVideo2InnerWrapper'
          noGap={true}
        />
      </Container>
    </Box>
  );
};

interface ProductSummaryProp {
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
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      Thumbnail: any;
      CC: boolean;
      ext: string;
    };
  };
  TagName?: string;
}

ProductSummaryViaVideo2.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue.Proin sit amet mi in odio efficitur fringilla.Quisque dictum odio ligula",
    Videos: {
      Video_1: {
        Name: "HCL 360 Video",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/222ba388-4da7-456a-9957-fd5a13c93c86/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Attribution: false,
        CC: false,
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
        ext: "png",
        Visibility: "public",
        BitStreamId: "",
        Transcript: false,
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
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Product Summary via Video",
    pageDesc: "Prelem Description",
    pageTags: "Video, summary, product summary, video summary",
    prelemTags: "Video player, React Player, Video message, leadership",
  },
  secondaryArgs: {
    APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ProductSummaryViaVideo2;
