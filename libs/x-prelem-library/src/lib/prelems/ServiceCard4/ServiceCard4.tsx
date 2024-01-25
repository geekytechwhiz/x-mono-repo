/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-eval */
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Container, Slide, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import { useCustomStyle } from "./ServiceCard4.style";
import prelemTypes from "../../globalStyle";
import "./ServiceCard4.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import { Analytics, AuthoringHelper, SecondaryArgs } from "@platformx/utilities";

// ts-ignore
const ServiceCard4 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ServiceCard4Props) => {
  const [activeSlide, setActiveSlide] = useState(1);

  const firstRender = useRef(true);
  const totalLenth = content?.Slots?.length ? content?.Slots?.length : 0;
  const refs = Array.from({ length: totalLenth }, () => useRef());
  const { inView, ref } = useInView({
    threshold: 0,
  });
  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <KeyboardBackspaceIcon />
        <Typography variant='h5regular'>
          {activeSlide > 9 ? "" : 0}
          {activeSlide}/{content?.Slots?.length > 9 ? "" : 0}
          {content?.Slots?.length}
        </Typography>
      </div>
    );
  };
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <EastIcon />
      </div>
    );
  };

  const windowSettings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: any) => setActiveSlide(current + 1),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const defaultStructureData = () => {
    let serviceCardStructureData;
    try {
      serviceCardStructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        itemListElement: content?.Slots?.map((item: any, key: any) => {
          return {
            "@type": "ListItem",
            position: key + 1,
            item: {
              "@type": "ImageObject",
              contentUrl: item.Image_1.Url,
              name: item?.Title,
              Description: item?.Description,
            },
          };
        }),
      };
    } catch (e) {
      serviceCardStructureData = {};
    }

    return serviceCardStructureData;
  };

  const generateStructureData = () => {
    let serviceCardStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        serviceCardStructureData = JSON.parse(tempSD);
      } else {
        serviceCardStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      serviceCardStructureData = defaultStructureData();
    }
    return serviceCardStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.Slots]);
  usePrelemImpression(analytics, inView, secondaryArgs);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      className={`${classes.ServiceCard4Wrapper} ${globalClasses.prelemType1} prelem prelemType1 ServiceCard4`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={authoringHelper?.innerRef} className='ServiceCard4Slider'>
          <Box
            sx={{
              position: "relative",
              "&:hover": {
                ".add-content-overlay": {
                  display: authoringHelper?.isEditing ? "flex !important" : "none",
                },
              },
            }}
            ref={ref}>
            <Slider {...windowSettings}>
              {content?.Slots?.map((item, index) => {
                return (
                  <Box key={index} ref={refs[index]}>
                    <Box className='slider-wrapper'>
                      <Box className='contentWrapper'>
                        <Slide
                          direction='left'
                          in={true}
                          // in={
                          //   secondaryArgs?.editState
                          //     ? true
                          //     : inView && refs[index].current === document.activeElement
                          // }
                          timeout={1500}>
                          <Typography variant='h1semibold'>{item?.Title}</Typography>
                        </Slide>
                        <Slide
                          direction='right'
                          in={true}
                          // in={
                          //   secondaryArgs?.editState
                          //     ? true
                          //     : inView && refs[index].current === document.activeElement
                          // }
                          timeout={1500}>
                          <Typography variant='h3semibold'>{item?.Title}</Typography>
                        </Slide>
                        <Slide
                          direction='right'
                          in={true}
                          // in={
                          //   secondaryArgs?.editState
                          //     ? true
                          //     : inView && refs[index].current === document.activeElement
                          // }
                          timeout={1800}>
                          <Typography variant='p3regular' id='Description'>
                            {item?.Description}
                          </Typography>
                        </Slide>
                      </Box>
                      <Slide
                        direction='left'
                        // in={
                        //   secondaryArgs?.editState
                        //     ? true
                        //     : inView && refs[index].current === document.activeElement
                        // }
                        timeout={1500}>
                        <Box className='imageWrapper' id='Image'>
                          <img alt='card4' src={item?.Image_1?.Url} />
                        </Box>
                      </Slide>
                    </Box>
                  </Box>
                );
              })}
            </Slider>
            <Box className='rightBgWrapper'></Box>
            <Box className='ReplaceWrapper add-content-overlay'>
              <Box
                className='WrapperBoxIcons'
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("image", true)}>
                <AutorenewIcon className='autorenewIcon' />
                <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

interface ServiceCard4Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}

interface ContentProps {
  Title?: string;
  Description?: string;
  Image_1?: {
    Name: string;
    Url: string;
    Title: string;
    Description: string;
    AltText: string;
  };
  TagName?: string;
}
interface Content {
  Slots: ContentProps[];
  TagName?: string;
}

ServiceCard4.defaultProps = {
  content: {
    Slots: [
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://cdn.zeplin.io/60c3203b05dcf9bca374c4c0/assets/6CCB6664-1DD8-4FA9-BE57-251EB1752516.png",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/59c70c5b-4f61-4673-aabd-bda3dd6e1faf/content",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/59c70c5b-4f61-4673-aabd-bda3dd6e1faf/content",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
      {
        Title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Image_1: {
          Name: "HomeBanner",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/59c70c5b-4f61-4673-aabd-bda3dd6e1faf/content",
          Title: "HomeBanner",
          Description: "This is for HeroBanner",
          AltText: "HomeBanner",
        },
      },
    ],
    TagName: "About us, Service Box, Features, Products, Cards",
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
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
    pageTitle: "Prelem Title",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      PublishEndPoint: "",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ServiceCard4;
