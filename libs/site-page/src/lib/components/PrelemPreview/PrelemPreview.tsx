import { TabContext, TabPanel } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Mapping } from "@platformx/x-prelems-library";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import PrelemPreviewFrame from "../PrelemPreviewFrame/PrelemPreviewFrame";
import Header from "../PrelemPreviewHeader/Header";
import { SearchCardObjecType } from "../utils/prelemTypes";
import { useStyles } from "./PrelemPreview.styles";
import { useLazyQuery } from "@apollo/client";
import { fetchPrelemContent } from "@platformx/authoring-apis";
import { getSubDomain, Loader, ThemeConstantForPrelemThemeBasedOnSite } from "@platformx/utilities";
import PrelemTheme from "../utils/theme/prelemtheme";

//mapping dynamic instance
const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(
    //() => import(`platform-x-prelems/prelems/${Mapping[item]}`),
    () =>
      import(`@platformx/x-prelems-library`).then((module) => ({
        default: module[Mapping[item]],
      })),
  );
  return mappingDynamicInstance;
});

const deviceArray = ["window", "tablet", "mobile"];

const PrelemPreview = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("window");
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const prelemMetaInfo = location.state as SearchCardObjecType;
  const [prelemContent, setPrelemContent] = useState({});
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const PrelemComponent = mappingDynamicInstance[prelemMetaInfo?.PrelemId];

  useEffect(() => {
    runFetchContentQuery({
      variables: {
        path: prelemMetaInfo.DocumentPath,
        docType: prelemMetaInfo.DocumentType,
        prelemId: prelemMetaInfo?.PrelemId,
      },
    }).then((resp) => {
      setPrelemContent(resp.data.authoring_getCmsItemContent);
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    });
  }, [prelemMetaInfo]);

  const handleChange = (event: React.SyntheticEvent, updatedVal: string) => {
    setValue(updatedVal);
  };
  const ThemeConstant = ThemeConstantForPrelemThemeBasedOnSite();

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header value={value} handleChange={handleChange} />
          <Box sx={{ paddingLeft: "15px", paddingRight: "15px" }}>
            <Box className={classes.previewBox}>
              <TabContext value={value}>
                {deviceArray.map((device, index) => {
                  const classNames =
                    device === "window" ? "webBox" : device === "tablet" ? "tabBox" : "mobBox";
                  const innerClass =
                    device === "window"
                      ? "webinner"
                      : device === "tablet"
                      ? "tabinner"
                      : "mobinner";
                  return (
                    <TabPanel key={index} className={classes[classNames]} value={device}>
                      <Box className={classes[innerClass]}>
                        <PrelemPreviewFrame device={device} prelemid={prelemMetaInfo?.PrelemId}>
                          {PrelemComponent && prelemContent ? (
                            <ThemeProvider theme={() => PrelemTheme(ThemeConstant)}>
                              <PrelemComponent
                                content={prelemContent}
                                secondaryArgs={{
                                  gcpUrl: process.env.NX_GCP_URL,
                                  bucketName: process.env.NX_BUCKET_NAME,
                                  prelemBaseEndpoint: {
                                    device: device,
                                    APIEndPoint: process.env.NX_API_URI,
                                    PublishEndPoint: `${getSubDomain()}/`,
                                    buttonBaseUrl: `${getSubDomain()}/`,
                                    deliveryEndPoint: process.env.NX_DELIVERY_URI,
                                    language: i18n.language,
                                  },
                                }}
                                analytics={{
                                  isSeoEnabled: false,
                                  isAuthoring: false,
                                  isAnalyticsEnabled: true,
                                  position: 0,
                                  pageId: 19,
                                  prelemId: 19,
                                  pageTitle: "Image Carousel 1",
                                  pageDesc:
                                    "This prelem can be used to create an image carousel of 5 images. All the image will have some text & CTA. Users can use it as the hero banner of the website.",
                                  pageTags: "Image Carousel, Images, Gallery, Hero Banner",
                                  prelemTags: "Image Carousel, Images, Gallery, Hero Banner",
                                }}
                                authoringHelper={{
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
                                }}
                              />
                            </ThemeProvider>
                          ) : (
                            <Grid className={classes.notLoaded}>
                              {t("selected_prelem_not_loaded")}
                            </Grid>
                          )}
                        </PrelemPreviewFrame>
                      </Box>
                    </TabPanel>
                  );
                })}
              </TabContext>
            </Box>
            <Box className={classes.previewBottomContent}>
              <Typography component='p' mb={1} variant='p1semibold'>
                {prelemMetaInfo.PrelemName}
              </Typography>
              <Typography component='p' variant='p3regular'>
                {prelemMetaInfo.Description}
              </Typography>
              <Box className={classes.tagswarp}>
                <ul>
                  {prelemMetaInfo.Tags.map((item, index) => {
                    return (
                      <li key={index}>
                        <Typography variant='p3regular'>{item}</Typography>
                      </li>
                    );
                  })}
                </ul>
              </Box>
              <Box className={classes.devider}></Box>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default PrelemPreview;
