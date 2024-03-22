/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography } from "@mui/material";
import { Analytics, fetchCroppedUrl, getThumbImages } from "@platformx/utilities";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";
import "./VideoBanner1.css";
import { useCustomStyle } from "./VideoBanner1.style";
import useCustomMediaQuery from "../../components/CustomHook/useCustomMediaQuery";

const VideoBanner1 = ({ content, analytics, authoringHelper, secondaryArgs }: VideoBanner1Prop) => {
  const [val, setVal] = useState(1);
  const scrollRef = useRef("DOWN");
  const scrollValueRef = useRef(1);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const { ref: secondBoxRef } = useInView({
    threshold: 0,
  });
  const boxRef = useRef<null | HTMLElement>(null);
  const mediaQueryValues = useCustomMediaQuery();
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
      content?.Videos?.Video_1?.ext ? content?.Videos?.Video_1?.ext : "",
    );
  const generateStructureData = () => {
    let fullWidthVideoStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);
    if (firstRender.current && String(tempSD).length > 0) {
      fullWidthVideoStructureData = JSON.parse(tempSD);
    } else {
      try {
        fullWidthVideoStructureData = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: content?.Videos?.Video_1?.Title,
          description: content?.Videos?.Video_1?.Description,
          thumbnailUrl: content?.Videos?.Video_1?.Thumbnail,
          contentUrl: content?.Videos?.Video_1?.Url,
        };
      } catch (e) {
        fullWidthVideoStructureData = {};
      }
    }
    firstRender.current = false;
    return fullWidthVideoStructureData;
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [
    content?.Videos?.Video_1?.Title,
    content?.Videos?.Video_1?.Description,
    content?.Videos?.Video_1?.Url,
    content?.BannerTitle,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  useEffect(() => {
    let oldScrollY = typeof window !== "undefined" ? window?.scrollY : 0;
    let iframeoldScrollY: number | undefined;
    let iframe: HTMLIFrameElement | null | undefined;
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (oldScrollY < window?.scrollY) {
          scrollRef.current = "DOWN";
        } else {
          scrollRef.current = "UP";
        }
        oldScrollY = window?.scrollY;
        const doc = authoringHelper?.innerRef?.current;
        if (inView) {
          if (scrollRef.current === "DOWN") {
            setVal((prevVal) => {
              const newVal = prevVal + 0.006;
              if (newVal >= 1 && newVal < 1.5) {
                scrollValueRef.current = newVal;
                if (doc)
                  doc.querySelector("#BannerTitle")!.style.transform =
                    `scale(${scrollValueRef.current})`;
              }
              return newVal;
            });
          }

          if (scrollRef.current === "UP") {
            setVal((prevVal) => {
              const newVal = prevVal - 0.009;
              if (newVal >= 1 && newVal < 1.5) {
                scrollValueRef.current = newVal;
                if (doc)
                  doc.querySelector("#BannerTitle")!.style.transform =
                    `scale(${scrollValueRef.current})`;
              }
              if (window?.scrollY === 0) {
                if (doc) doc.querySelector("#BannerTitle")!.style.transform = `scale(1)`;
              }
              return newVal;
            });
          }
        }
      }
    };

    const handleIframeScroll = () => {
      if (iframeoldScrollY && iframe) {
        if (iframeoldScrollY < iframe?.contentWindow!.scrollY) {
          scrollRef.current = "DOWN";
        } else {
          scrollRef.current = "UP";
        }
        iframeoldScrollY = iframe?.contentWindow!.scrollY;
        const doc = authoringHelper?.innerRef?.current;
        if (inView) {
          if (scrollRef.current === "DOWN") {
            setVal((prevVal) => {
              const newVal = prevVal + 0.006;
              if (newVal >= 1 && newVal < 1.5) {
                scrollValueRef.current = newVal;
                doc.querySelector("#BannerTitle")!.style.transform =
                  `scale(${scrollValueRef.current})`;
              }
              return newVal;
            });
          }

          if (scrollRef.current === "UP") {
            setVal((prevVal) => {
              const newVal = prevVal - 0.009;
              if (newVal >= 1 && newVal < 1.5) {
                scrollValueRef.current = newVal;
                doc.querySelector("#BannerTitle")!.style.transform =
                  `scale(${scrollValueRef.current})`;
              }
              if (iframe?.contentWindow!.scrollY === 0) {
                doc.querySelector("#BannerTitle")!.style.transform = `scale(1)`;
              }
              return newVal;
            });
          }
        }
      }
    };

    if (analytics?.isAuthoring) {
      const iframe1 = document?.getElementsByTagName("iframe")[0];
      if (iframe1 && iframe1.id === "site-frame") {
        iframe1.contentWindow!.addEventListener("scroll", handleIframeScroll);
      }
    } else {
      window?.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Clean up the event listeners when the component unmounts
      window?.removeEventListener("scroll", handleScroll);
      const iframe2 = document?.getElementsByTagName("iframe")[0];
      if (iframe2 && iframe2.id === "site-frame") {
        iframe2.contentWindow!.removeEventListener("scroll", handleIframeScroll);
      }
    };
  }, [inView, analytics?.isAuthoring]);

  const onClickScroll = (e: any) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const pageHeight = window.innerHeight;
      window.scrollBy({
        top: pageHeight,
        behavior: "smooth",
      });
    }
  };

  const classes = useCustomStyle();

  return (
    <Box ref={authoringHelper?.innerRef} className={`${classes.videoBanner1Wrapper} videoBanner1`}>
      <Box className='animatorContainer'>
        <Box className='banner' ref={ref}>
          {secondaryArgs?.editState ? (
            <img alt='banner2' src={content.Videos.Video_1.Thumbnail} />
          ) : (
            <VideoPlayer
              playerProp={{
                posterImg: "",
                videoUrl: content?.Videos?.Video_1.Url,
                controls: false,
                loop: true,
                playsinline: true,
                classname: "react-player-anime",
                playing: true,
                muted: true,
              }}
            />
          )}
          <Typography id='BannerTitle' variant='h3bold' gutterBottom className='bannerText'>
            <span>{content.BannerTitle}</span>
          </Typography>
        </Box>
        <Box className='anibuttonwrapper'>
          <Box className='videobanner1mouse-indicator' onClick={(e) => onClickScroll(e)}>
            <Box className='vb1mouse-down'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 30 45'
                enableBackground='new 0 0 30 45'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeMiterlimit='10'
                  d='M15,1.118c12.352,0,13.967,12.88,13.967,12.88v18.76  c0,0-1.514,11.204-13.967,11.204S0.931,32.966,0.931,32.966V14.05C0.931,14.05,2.648,1.118,15,1.118z'></path>
              </svg>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box id='next_video' ref={boxRef} className='bottomWrapper'>
        <Box ref={secondBoxRef}>
          {secondaryArgs?.editState ? (
            <img alt='banner3' className='bottomWraperImg' src={content.Videos.Video_1.Thumbnail} />
          ) : (
            <VideoPlayer
              playerProp={{
                posterImg: "",
                videoUrl: content?.Videos?.Video_1.Url,
                controls: false,
                loop: true,
                playsinline: true,
                playing: true,
                muted: true,
                classname: "react-player",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface VideoBanner1Prop {
  content: Content;
  analytics: Analytics;
  authoringHelper?: any;
  secondaryArgs?: any;
}

interface Content {
  BannerTitle: string;
  Description1: string;
  Description2: string;
  Videos: {
    Video_1: {
      Name: string;
      Url: string;
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      CC: boolean;
      Thumbnail: string;
      ext: string;
    };
  };
}

VideoBanner1.defaultProps = {
  content: {
    BannerTitle: "Lorem ipsum",

    Videos: {
      Video_1: {
        Name: "HCL 360 Video",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/222ba388-4da7-456a-9957-fd5a13c93c86/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Attribution: false,
        CC: false,
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
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
    },
    PlayerType: "dspace",
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
    pageTitle: "Video Banner 1",
    pageDesc: "This prelem can be used as the header banner with video along with animation.",
    pageTags: "Header Banner, Video Banner, Animated Banner",
    prelemTags: "Header Banner, Video Banner, Animated Banner",
  },
};

export default VideoBanner1;
