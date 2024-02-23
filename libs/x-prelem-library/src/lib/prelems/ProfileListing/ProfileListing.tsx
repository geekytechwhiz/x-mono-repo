import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import ProfileListingCard from "./ProfileListingCard";
import prelemTypes from "../../globalStyle";
import { useCustomStyle } from "./ProfileListing.style";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const ProfileListing = ({ content, analytics, authoringHelper, secondaryArgs }: any) => {
  const getCardArr = (data: any) => {
    if (data?.length > 4) {
      return data.slice();
    } else if (data?.length > 0) {
      return data;
    }
    return [];
  };
  const [cardArr, setCardArr] = useState(getCardArr(content?.Slots));
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  usePrelemImpression(analytics, inView, secondaryArgs);

  useEffect(() => {
    setCardArr(getCardArr(content?.Slots));
  }, [content?.Slots]);

  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.ProfileListingWrapper} ${globalClasses.prelemType1} prelem prelemType1 ProfileListingBg`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? "grid_full_width prelem-py"
            : "grid_container grid_container_nopadding prelem-py"
        }>
        <Box ref={ref} className='gridCard'>
          <Box className='topContent'>
            <Typography variant='h2semibold' id='title'>
              {content?.title}
            </Typography>
          </Box>
          <Grid
            container
            sx={{
              position: "relative",
              "&:hover": {
                ".add-content-overlay": {
                  display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                },
              },
            }}>
            {cardArr?.length > 0 ? (
              cardArr.map((item: any, index: any) => {
                return (
                  <Grid
                    key={`${item?.Title}_${index.toString()}`}
                    item
                    xs={12}
                    sm={6}
                    em={4}
                    lg={3}
                    rowSpacing={1.5}
                    p={1.5}>
                    {cardArr && Object.keys(item).length !== 0 && (
                      <Box className='CardBoxWp'>
                        <ProfileListingCard
                          content={cardArr[index]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={index}
                        />
                      </Box>
                    )}
                  </Grid>
                );
              })
            ) : (
              <>
                <Box className='noDataFoundWrapper'>
                  <img
                    src='https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3b8398a0-299a-4b4e-ad6f-2a5bbb306e9a/content'
                    alt='NoDataFound'
                  />
                </Box>
                <Typography variant='h2' className='noDataFound'>
                  No data found
                </Typography>
              </>
            )}
            <Box className='add-content-overlay'>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
                <AutorenewIcon className='autorenewIcon' />
                <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

ProfileListing.defaultProps = {
  content: {
    QueryParam: {
      filter: "ALL",
      tags: [],
      searchTerm: "",
      pagination: {
        start: 0,
        rows: 5,
      },
    },
    TagName: "SiteComponents",
    description: "Description",
    title: "Title",
    PrelemContentType: [
      "ImageGallery",
      "VideoGallery",
      "Gallery",
      "Servicecard",
      "Accolades",
      "Article",
      "Vod",
      "Quiz",
      "Poll",
      "Event",
    ],
    Slots: [
      {
        title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "DynamicPrelem",
          Url: "machine_assets/1690001744940/public/png/ProductDetails",
          Title: "DynamicPrelem",
          Description: "This is for DynamicPrelem",
          Attribution: false,
          AltText: "DynamicPrelem",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_01",
        ContentType: "Article",
        PublishedBy: "Rishabh",
        PublishedDate: "2022-12-21T12:47:02.924Z",
        first_name: "First Name",
        last_name: "Last Name",
        number: "01",
        category: "Category",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "DynamicPrelem",
          Url: "machine_assets/1690001744940/public/png/ProductDetails",
          Title: "DynamicPrelem",
          Description: "This is for DynamicPrelem",
          Attribution: false,
          AltText: "DynamicPrelem",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_01",
        ContentType: "Article",
        PublishedBy: "Rishabh",
        PublishedDate: "2022-12-21T12:47:02.924Z",
        first_name: "First Name",
        last_name: "Last Name",
        number: "02",
        category: "Category",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "DynamicPrelem",
          Url: "machine_assets/1690001744940/public/png/ProductDetails",
          Title: "DynamicPrelem",
          Description: "This is for DynamicPrelem",
          Attribution: false,
          AltText: "DynamicPrelem",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_01",
        ContentType: "Article",
        PublishedBy: "Rishabh",
        PublishedDate: "2022-12-21T12:47:02.924Z",
        first_name: "First Name",
        last_name: "Last Name",
        number: "03",
        category: "Category",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "DynamicPrelem",
          Url: "machine_assets/1690001744940/public/png/ProductDetails",
          Title: "DynamicPrelem",
          Description: "This is for DynamicPrelem",
          Attribution: false,
          AltText: "DynamicPrelem",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_01",
        ContentType: "Article",
        PublishedBy: "Rishabh",
        PublishedDate: "2022-12-21T12:47:02.924Z",
        first_name: "First Name",
        last_name: "Last Name",
        number: "04",
        category: "Category",
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
    authoringHoverShow: false,
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Multi Slot Prelem",
    pageDesc:
      "This prelem having 4 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles.",
    pageTags: "Multi Slot Prelem, Article Prelem, Media Cards",
    prelemTags: ["Content", "Dynamic", "Dynamic Prelem", "Article", "VOD"],
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public_x_site_stage",
  },
};

export default ProfileListing;
