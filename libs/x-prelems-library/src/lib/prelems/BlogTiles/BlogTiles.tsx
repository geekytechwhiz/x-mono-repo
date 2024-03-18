/* eslint-disable react/jsx-key */
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid, Typography } from "@mui/material";
import { formCroppedUrlString } from "@platformx/utilities";

import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import prelemTypes from "../../globalStyle";
import "./BlogTiles.css";
import { useCustomStyle } from "./BlogTiles.style";
import BlogTilesCard from "./BlogTilesCard";
import BlogTilesCard2 from "./BlogTilesCard2";

const BlogTiles = ({ content, analytics, authoringHelper, secondaryArgs }: any) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const { bucketName, gcpUrl } = secondaryArgs;
  const getCardArr = (data: any) => {
    if (data?.length > 5) {
      return data.slice(0, 5);
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

  const getGridValues = (index: number) => {
    let md = 4,
      em = 3;
    if (cardArr.length === 1) {
      md = 12;
      em = 12;
    } else if (cardArr.length === 2) {
      md = 6;
      em = 6;
    } else if (cardArr.length === 3) {
      if (index === 0) {
        em = 4;
        md = 4;
      } else {
        em = 4;
        md = 4;
      }
    } else if (cardArr.length === 4) {
      md = 6;
      em = 6;
    }
    return { md, em };
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.blogTilesWrapper} ${globalClasses.prelemType1} prelem prelemType1 blogTilesBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={ref}>
          <Box className='blogTitleWrapper'>
            <Typography variant='h2semibold' id='Title'>
              {content?.Title}
            </Typography>
          </Box>
          <Grid
            container
            className='blogTilesInnerWrapper'
            sx={{
              "&:hover": {
                ".add-content-overlay": {
                  display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                },
              },
            }}>
            {cardArr?.length > 0 ? (
              cardArr?.length <= 4 ? (
                cardArr?.map((item: any, index: any) => {
                  const { md, em } = getGridValues(index);
                  return (
                    <Grid item xs={12} md={md} em={em} rowSpacing={1.5} p={1.5}>
                      {cardArr && Object.keys(item).length !== 0 && (
                        <Fragment>
                          <Box
                            sx={{
                              display: { xs: "block", md: "none", em: "none" },
                            }}>
                            <BlogTilesCard
                              content={cardArr[index]}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                              cardIndex={index}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: { xs: "none", md: "block", em: "none" },
                            }}>
                            {md === 12 ? (
                              <BlogTilesCard
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            ) : (
                              <BlogTilesCard
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            )}
                          </Box>
                          <Box
                            sx={{
                              display: { xs: "none", md: "none", em: "block" },
                            }}>
                            {em === 12 || em === 12 ? (
                              <BlogTilesCard2
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            ) : (
                              <BlogTilesCard
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            )}
                          </Box>
                        </Fragment>
                      )}
                    </Grid>
                  );
                })
              ) : (
                <Grid
                  container
                  className='fivecardswp'
                  sx={{ display: { xs: "flex", md: "flex", em: "flex" } }}>
                  <Grid
                    className='leftGrid'
                    xs={12}
                    md={12}
                    em={7}
                    rowSpacing={1.5}
                    p={1.5}
                    sx={{ display: { xs: "flex", md: "none", em: "flex" } }}>
                    <BlogTilesCard
                      content={cardArr[0]}
                      secondaryArgs={secondaryArgs}
                      analytics={analytics}
                      cardIndex={0}
                    />
                  </Grid>
                  <Grid className='rightGrid' xs={12} md={12} em={5}>
                    <Grid container sx={{ justifyContent: "center", display: "flex" }}>
                      <Grid
                        xs={12}
                        md={6}
                        em={6}
                        rowSpacing={1.5}
                        p={1}
                        sx={{ display: { xs: "none", md: "flex", em: "none" } }}
                        className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[0]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[1]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[2]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[3]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[4]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            ) : (
              <React.Fragment>
                <Box className='noDataFoundWrapper'>
                  <img
                    src={
                      formCroppedUrlString(
                        gcpUrl,
                        bucketName,
                        secondaryArgs?.noResultImg,
                        secondaryArgs?.ext,
                      ).src
                    }
                    alt='NoDataFound'
                  />
                </Box>
                <Typography variant='h2' className='noDataAlingment'>
                  No data found
                </Typography>
              </React.Fragment>
            )}
            <Box className='add-content-overlay replaceWrapper'>
              <Box
                className='pointer'
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
                <AutorenewIcon className='replaceIconWrapper' />
                <Typography variant='p1regular' color='textColor'>
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

BlogTiles.defaultProps = {
  content: {
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
    Title: "Lorem ipsum dolor sit amet",
    PrelemContentType: ["Select"],
    Slots: [
      {
        Title: "ears in the event.",
        Banner: "",
        background_content: {
          objectType: "image",
          ext: "jpg",
          Url: "1701671502411/public/jpeg/1",
          Title: "",
          Thumbnail: "1701671502411/public/jpeg/1",
          Color: "",
        },
        Thumbnail: {
          Name: "ears-in-the-event-",
          Url: "1701671502411/public/jpeg/1",
          Title: "ears in the event.",
          Description: "ears in the event.",
          Attribution: false,
          AltText: "ears in the event.",
          ext: "jpg",
          visibility: "public",
        },
        Description: "ears in the event.",
        PublishedDate: "2023-12-21T14:05:44Z",
        lastModifiedDate: "2023-12-21T14:05:49Z",
        ContentType: "Event",
        tags: '["Events"]',
        Author: "vaishali anand",
        CurrentPageURL: "/ears-in-the-event-",
        hclplatformx_EditorialTags: "ears-in-the-event-",
        EditorialItemPath: "ears-in-the-event-",
        PublishedBy: "vaishali",
        Id: "ears-in-the-event-",
        GoogleApiAddress: "www.google.com",
      },
      {
        Title: "Digital Transformation Banner VOD",
        Thumbnail: {
          Name: "digital-transformation-banner-vod",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/25bb468d-438a-41bc-adf1-b40dd11ba3e8/content",
          Title: "Digital Transformation Banner VOD",
          Description: "",
          Attribution: false,
          AltText: "Digital Transformation Banner VOD",
        },
        EditorialItemPath: "digital-transformation-banner-vod",
        Description: "",
        Id: "digital-transformation-banner-vod",
        ContentType: "VOD",
        PublishedBy: "upendra",
        CurrentPageURL: "/digital-transformation-banner-vod",
        PublishedDate: "2023-11-21T10:20:29Z",
      },
      {
        Title: "itle will appear",
        Banner: "",
        background_content: {
          objectType: "image",
          ext: "jpg",
          Url: "1702549845179/public/jpeg/2302221000-OC-Professional-Soccer-LLC-MOU-Signed-1920x1080",
          Title: "",
          Thumbnail:
            "1702549845179/public/jpeg/2302221000-OC-Professional-Soccer-LLC-MOU-Signed-1920x1080",
          Color: "",
        },
        Thumbnail: {
          Name: "itle-will-appear",
          Url: "1702549845179/public/jpeg/2302221000-OC-Professional-Soccer-LLC-MOU-Signed-1920x1080",
          Title: "itle will appear",
          Description: " are the even",
          Attribution: false,
          AltText: "itle will appear",
          ext: "jpg",
          visibility: "public",
        },
        Description: " are the even",
        PublishedDate: "2023-12-21T13:39:54Z",
        lastModifiedDate: "2023-12-21T13:39:40Z",
        ContentType: "Event",
        tags: '["Events","Cristiano Ronaldo"]',
        Author: "vaishali anand",
        CurrentPageURL: "/itle-will-appear",
        hclplatformx_EditorialTags: "itle-will-appear",
        EditorialItemPath: "itle-will-appear",
        PublishedBy: "vaishali",
        Id: "itle-will-appear",
        EventEndDate: "2023-12-29T18:30:00Z",
        EventStartDate: "2023-12-20T18:30:00Z",
        GoogleApiAddress: "www.google.com",
      },
      {
        Title: "Videography Tutorial",
        Thumbnail: {
          Name: "videography-tutorial",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/92726c1b-6f59-4e0c-a92d-d89b2b526377/content",
          Title: "Videography Tutorial",
          Description: "Nikon",
          Attribution: false,
          AltText: "Videography Tutorial",
        },
        EditorialItemPath: "videography-tutorial",
        Description: "Nikon",
        Id: "videography-tutorial",
        ContentType: "VOD",
        PublishedBy: "sahbaz",
        CurrentPageURL: "/videography-tutorial",
        PublishedDate: "2023-11-21T06:37:20Z",
      },
      {
        Title: "Color check",
        Banner: "",
        background_content: {
          objectType: "color",
          Title: "",
          Color: "#334075",
        },
        Thumbnail: {
          Name: "color-check",
          Url: "",
          Title: "Color check",
          Description: "Color check",
          Attribution: false,
          AltText: "Color check",
        },
        Description: "Color check",
        PublishedDate: "2023-12-26T10:29:38Z",
        lastModifiedDate: "2023-12-26T10:29:18Z",
        ContentType: "Poll",
        tags: '["Polls","Kevin Durant"]',
        Author: "Harsh upadhyay",
        CurrentPageURL: "/color-check",
        hclplatformx_EditorialTags: "color-check",
        EditorialItemPath: "color-check",
        PublishedBy: "Harsh",
        Id: "color-check",
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
    prelemTags: ["Content", "Blog Tiles", "Blog Tiles Prelem", "Article", "VOD"],
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
    bucketName: "cropped_image_public",
    // noResultImg: "machine_assets/1689600462756/public/png/Prelem_UI_Icons1",
    ext: "png",
  },
};

export default BlogTiles;
