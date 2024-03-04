import { Cached } from "@mui/icons-material";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { formCroppedUrl } from "@platformx/utilities";
import BasicButton from "../../components/BasicButton/BasicButton";
import ExpertiseShowcaseSlot from "./ExpertiseShowcaseSlot";
import { useCustomStyle } from "./ExpertiseShowcase.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const ExpertiseShowcase = ({ content, analytics, authoringHelper, secondaryArgs }: any) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);
  usePrelemImpression(analytics, inView, secondaryArgs);
  const { Url, ext } = content?.Images?.Image_1 || {};
  const imgUrl = formCroppedUrl(secondaryArgs?.gcpUrl, secondaryArgs?.bucketName, Url, ext);

  const defaultStructureData = () => {
    let expertiseShowcaseStructureData;
    try {
      expertiseShowcaseStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: content?.Title,
        description: content?.Description,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: content?.Button1_Value,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content?.Slots[0].Title,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content?.Slots[1].Title,
          },
        ],
      };
    } catch (e) {
      expertiseShowcaseStructureData = {};
    }

    return expertiseShowcaseStructureData;
  };

  const generateStructureData = () => {
    let expertiseShowcaseStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);
    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        expertiseShowcaseStructureData = JSON.parse(tempSD);
      } else {
        expertiseShowcaseStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      expertiseShowcaseStructureData = defaultStructureData();
    }
    return expertiseShowcaseStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title,
    content?.Description,
    content?.Button1_RedirectURL,
    content?.Button1_Value,
    content?.Slots,
  ]);

  const onAdd = (slotNumber: number) => {
    const {
      multiSlot: { onToggleContentGallery },
    } = secondaryArgs;
    onToggleContentGallery(undefined, undefined, slotNumber);
  };

  const ButtonObjNew = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
    Button_Content: "Button1_Content",
  };
  const ButtonDataObjNew = {
    Button_Name: content?.Button1_Name,
    Button_RedirectURL: content?.Button1_RedirectURL,
    Button_Type: content?.Button1_Type,
    Button_Value: content?.Button1_Value,
    Button_Action: content?.Button1_Action,
    Button_Content: content?.Button1_Content,
  };
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.expertiseShowcaseWrapper} ${globalClasses.prelemType1} prelem prelemType1 expertiseShowcaseBg`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? "grid_full_width prelem-py"
            : "grid_container grid_container_nopadding prelem-py"
        }>
        <Box ref={ref}>
          <Box className='topcontent'>
            <Typography variant='h1semibold' id='Title'>
              {content?.Title}
            </Typography>
            <Typography variant='p3regular' id='Description'>
              {content?.Description}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} em={4} rowSpacing={1} p={1}>
              <Paper className='expertise-show-case-wrapper'>
                <Box
                  sx={{
                    "&:hover": {
                      ".button-name": {
                        display: secondaryArgs?.editState ? "none" : "block",
                      },
                    },
                  }}
                  className='overlay-wrapper'>
                  <Box className='imgWrapper'>
                    <img alt='Expertimg' style={{ objectFit: "cover" }} src={imgUrl} />
                    <Box className='bottomButton'>
                      <BasicButton
                        openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                        isAuthoring={analytics?.isAuthoring}
                        currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                        variant='defaultButton1'
                        analyticsEnabled={analytics?.isAnalyticsEnabled}
                        ButtonObj={ButtonObjNew}
                        isEditing={authoringHelper?.isEditing}
                        buttonDataObj={ButtonDataObjNew}
                        secondaryArgs={secondaryArgs}
                        analytics={analytics}
                      />
                    </Box>
                  </Box>
                  <Box
                    className='image-button-text'
                    sx={{
                      display: secondaryArgs?.editState ? "none" : "flex",
                    }}>
                    <Box className='button-name' sx={{ display: "none" }}>
                      <BasicButton
                        openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                        isAuthoring={analytics?.isAuthoring}
                        currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                        variant='defaultButton1'
                        analyticsEnabled={analytics?.isAnalyticsEnabled}
                        ButtonObj={ButtonObjNew}
                        isEditing={authoringHelper?.isEditing}
                        buttonDataObj={ButtonDataObjNew}
                        secondaryArgs={secondaryArgs}
                        analytics={analytics}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            {content?.Slots?.slice(0, 2).map((item: any, index: any) => {
              return (
                <Grid
                  key={`${index.toString()}_ES`}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  em={4}
                  rowSpacing={1}
                  p={1}>
                  {content &&
                    content?.Slots &&
                    Object.keys(content?.Slots?.[index]).length !== 0 && (
                      <Paper
                        onClick={() => onAdd(index)}
                        className='expertise-show-case-wrapper expertise-cardwrapper2'>
                        <Box
                          className='boxinner'
                          sx={{
                            display: secondaryArgs?.editState ? "flex" : "none",
                          }}>
                          <Box className='iconBox'>
                            <Cached />
                          </Box>
                        </Box>
                        <ExpertiseShowcaseSlot
                          content={content.Slots[index]}
                          secondaryArgs={secondaryArgs}
                        />
                      </Paper>
                    )}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

ExpertiseShowcase.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"ContactUs","isSuggestive":false,"contactUs":{"filter":[]}}',
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "https://www.google.com/",
    Button1_RestEndPoint: "",
    Button1_Type: "current window",
    Button1_Value: "Lorem ipsum",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    Images: {
      Image_1: {
        Name: "ExpertiseShowcase1",
        Url: "machine_assets/1690884048907/public/png/ExpertiseShowcase1",
        Title: "ExpertiseShowcase1",
        Description: "This is for ExpertiseShowcase1",
        Attribution: false,
        AltText: "ExpertiseShowcase1",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
    },
    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit amet",
    PrelemContentType: ["ImageGallery", "VideoGallery", "Gallery"],
    Slots: [
      {
        Title: "Lorem ipsum",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "machine_assets/1690806479275/public/png/ExpertiseShowcase2",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description: "Lorem Ipsum is simply dummy",
      },
      {
        Title: "Lorem ipsum",
        Thumbnail: {
          Name: "ExpertiseShowcase3",
          Url: "machine_assets/1690884668644/public/png/ExpertiseShowcase3",
          Title: "ExpertiseShowcase3",
          Description: "This is for ExpertiseShowcase3",
          Attribution: false,
          AltText: "ExpertiseShowcase3",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description: "Lorem Ipsum is simply dummy",
      },
      {
        Title: "Lorem ipsum",
        Thumbnail: {
          Name: "ExpertiseShowcase4",
          Url: "machine_assets/1690804630580/public/png/ExpertiseShowcase4",
          Title: "ExpertiseShowcase4",
          Description: "This is for ExpertiseShowcase4",
          Attribution: false,
          AltText: "ExpertiseShowcase4",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description: "Lorem Ipsum is simply dummy",
      },
      {
        Title: "Lorem ipsum",
        Thumbnail: {
          Name: "ExpertiseShowcase4",
          Url: "machine_assets/1690804630580/public/png/ExpertiseShowcase4",
          Title: "ExpertiseShowcase4",
          Description: "This is for ExpertiseShowcase4",
          Attribution: false,
          AltText: "ExpertiseShowcase4",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/defaultdata/siteeditorial/imagegallery/default_gallery",
        Description: "Lorem Ipsum is simply dummy",
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
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ExpertiseShowcase;
