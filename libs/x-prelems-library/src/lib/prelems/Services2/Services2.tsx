/* eslint-disable @typescript-eslint/no-unused-vars */
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid, Slide, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { useCustomStyle } from "./Services2.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import {
  Analytics,
  AuthoringHelper,
  SecondaryArgs,
  formCroppedUrlString,
} from "@platformx/utilities";
import Image from "next/image";

const Services2 = ({ content, analytics, authoringHelper, secondaryArgs }: Services2Prop) => {
  // const [contentType, setContentType] = React.useState("image");
  // const count = 1;
  // const key1 = 0;
  let timer = 1000;
  const firstRender = useRef(true);
  const { bucketName, gcpUrl } = secondaryArgs;
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const defaultStructureData = () => {
    let Services2StructureData;
    try {
      Services2StructureData = {
        "@context": "https://schema.org/",
        "@type": "Service",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: content?.Title,
          description: content?.Subtitle,
          itemListElement: [
            content?.Slots &&
              Object.entries(content?.Slots).map(([key, value]) => {
                return {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    description: value?.Description,
                    Image: value?.IconImage?.Url,
                    key: key,
                  },
                };
              }),
          ],
        },
      };
    } catch (e) {
      Services2StructureData = {};
    }

    return Services2StructureData;
  };
  const generateStructureData = () => {
    let Services2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Services2StructureData = JSON.parse(tempSD);
      } else {
        Services2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Services2StructureData = defaultStructureData();
    }
    return Services2StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Subtitle, content?.Slots]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.service2PrelemWrapper} ${globalClasses.prelemType1} prelem prelemType1 service2PrelemBg Services2`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Grid container>
          <Grid xs={12} sm={12} md={12} em={5}>
            <Slide
              direction='right'
              in={true /*secondaryArgs?.editState ? true : inView*/}
              timeout={2000}>
              <Box className='LeftServices2'>
                <Typography variant='labelbold' id='Title'>
                  {content?.Title}
                </Typography>
                <Typography variant='h2semibold' id='Subtitle'>
                  {content?.Subtitle}
                </Typography>
              </Box>
            </Slide>
          </Grid>
          <Grid xs={12} sm={12} md={12} em={7}>
            <Grid
              container
              item
              ref={ref}
              sx={{
                position: "relative",
                "&:hover": {
                  ".add-content-overlay": {
                    display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                  },
                },
              }}>
              {content?.Slots &&
                Object.keys(content?.Slots?.slice(0, Math.ceil(Number(content?.Slots?.length) / 2)))
                  .map((keys) => {
                    return Number(keys);
                  })
                  .map((key2, value1) => (
                    <Grid key={key2} xs={12} sm={12} md={12}>
                      <Slide
                        direction='left'
                        in={true /*secondaryArgs?.editState ? true : inView*/}
                        timeout={
                          key2 === 0 ? 1000 : key2 - (key2 - 1) === 1 ? (timer = timer + 1000) : 0
                        }>
                        <Grid container item ref={ref}>
                          {content?.Slots &&
                            Object.entries(content?.Slots?.slice(value1 * 2, (value1 + 1) * 2)).map(
                              ([key, value]) => (
                                <Grid
                                  item
                                  key={key}
                                  xs={12}
                                  sm={6}
                                  md={6}
                                  justifyContent='center'
                                  alignItems='center'
                                  className='gridBoxServices2'>
                                  <Box className='Service2Box'>
                                    <Box className={`IconWrapper imghover`}>
                                      <Image
                                        src={
                                          formCroppedUrlString(
                                            gcpUrl,
                                            bucketName,
                                            value?.IconImage?.Url,
                                            value?.IconImage?.ext,
                                          ).src
                                        }
                                        alt={value?.IconImage?.AltText}
                                      />
                                    </Box>
                                    <Box className={`Services2LineBottom line`}></Box>
                                    <Box className='ContentBottonServices2'>
                                      <Typography gutterBottom variant='p3regular'>
                                        {value?.Description}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                              ),
                            )}
                        </Grid>
                      </Slide>
                    </Grid>
                  ))}
              <Box className={`ReplaceWrapper add-content-overlay`}>
                <Box
                  className='WrapperBoxIcons'
                  onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
                  <AutorenewIcon className='replaceIconWrapper' />
                  <Typography variant='p1regular' color='textColor'>
                    Replace
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface Services2Prop {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}
interface Content {
  Title?: string;
  Subtitle?: string;
  Slots?: [
    {
      Description: string;
      Type: string;
      IconImage: {
        Name: string;
        Url: string;
        AltText: string;
        ext: string;
      };
    },
    {
      Description: string;
      Type: string;
      IconImage: {
        Name: string;
        Url: string;
        AltText: string;
        ext: string;
      };
    },
    {
      Description: string;
      Type: string;
      IconImage: {
        Name: string;
        Url: string;
        AltText: string;
        ext: string;
      };
    },
    {
      Description: string;
      Type: string;
      IconImage: {
        Name: string;
        Url: string;
        AltText: string;
        ext: string;
      };
    },
  ];
}

Services2.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    Subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor",
    Slots: [
      {
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Type: "ServiceCard",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690812382165/public/png/Services2_PngIcon1",
          AltText: "Icon",
          ext: "png",
        },
      },
      {
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Type: "ServiceCard",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690812629312/public/png/Services2_PngIcon2",
          AltText: "Icon",
          ext: "png",
        },
      },
      {
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Type: "ServiceCard",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690813010914/public/png/Services2_PngIcon3",
          AltText: "Icon",
          ext: "png",
        },
      },
      {
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Type: "ServiceCard",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690813221737/public/png/Services2_PngIcon4",
          AltText: "Icon",
          ext: "png",
        },
      },
      {
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Type: "ServiceCard",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690813568556/public/png/Services2_PngIcon5",
          AltText: "Icon",
          ext: "png",
        },
      },
      {
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        Type: "ServiceCard",
        IconImage: {
          Name: "Icon",
          Url: "machine_assets/1690813754303/public/png/Services2_PngIcon6",
          AltText: "Icon",
          ext: "png",
        },
      },
    ],
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
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 19,
    prelemId: 19,
    pageTitle: "Services2",
    pageDesc:
      "This prelem can be used to house a full width image. It can be used anywhere in the website to add an element of beautification to it.",
    pageTags: "Image, Full Width Image",
    prelemTags: "Image, Full Width Image",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default Services2;
