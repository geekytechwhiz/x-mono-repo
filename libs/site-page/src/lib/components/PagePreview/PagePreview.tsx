import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import TabletAndroidRoundedIcon from "@mui/icons-material/TabletAndroidRounded";
import { Box, Divider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RootState } from "@platformx/authoring-state";
import {
  ThemeConstantForPrelemThemeBasedOnSite,
  ThemeConstants,
  getSubDomain,
} from "@platformx/utilities";
import { Mapping } from "@platformx/x-prelems-library";
import React, { createRef, useEffect, useRef, useState } from "react";
import Frame from "react-frame-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PrelemTheme from "../../theme/prelemTheme";
import { PrelemInstance } from "../utils/prelemTypes";
import { useStyles } from "./PagePreview.styles";

const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module[Mapping[item]],
    })),
  );
  return mappingDynamicInstance;
});

export const PagePreview = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { device = "" } = useParams();
  const [deviceType, setDeviceType] = useState<string>("");
  // const [height, setHeight] = useState(400);
  const iframeRef = React.useRef<any>();
  const { page } = useSelector((state: RootState) => state);
  const myRefs = useRef([]);
  const tabs = [
    { type: "window", icon: ComputerRoundedIcon },
    { type: "tablet", icon: TabletAndroidRoundedIcon },
    { type: "mobile", icon: PhoneAndroidRoundedIcon },
  ];
  const navigate = useNavigate();
  myRefs.current = page?.prelemMetaArray?.map(
    (arrayTuple: PrelemInstance, i) => myRefs.current[i] ?? createRef(),
  );
  const handleResize = (iframe: any) => {
    if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      // setHeight(window?.parent?.innerHeight - 48);
    }
  };
  const ThemeConstant = ThemeConstantForPrelemThemeBasedOnSite();
  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}<style>
    #react-player video {
      object-fit: fill !important;
    }
    .tweetWrapper iframe {
      visibility: visible !important;
      position: relative !important;
    }
    body {
      overflow-x: hidden;
    }
    </style></head><body><div></div></body></html>`;

  useEffect(() => {
    if (device !== "") {
      setDeviceType(device);
    }
  }, [device]);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.iconContainer} onClick={() => navigate(-1)}>
          <ArrowBackIcon className={classes.backIcon} /> {t("back")}
        </Box>
        <Box className={classes.tabsContainer}>
          {tabs.map((tab) => (
            <Box
              key={tab.type}
              sx={{
                display: "flex",
                backgroundColor:
                  deviceType === tab.type
                    ? ThemeConstants.PRIMARY_MAIN_COLOR
                    : ThemeConstants.WHITE_COLOR,
                transition: "all 0.50s",
                padding: "12px 27px",
                borderRadius: "24px",
                cursor: deviceType === tab.type ? "pointer" : "default",
              }}
              onClick={() => {
                setDeviceType(tab.type);
              }}>
              <tab.icon
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_H2,
                  color:
                    deviceType === tab.type
                      ? ThemeConstants.WHITE_COLOR
                      : ThemeConstants.PRIMARY_MAIN_COLOR,
                  cursor: "pointer",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Divider sx={{ mb: { sm: "31px" } }} />
      <Box
        sx={{
          border: "1px solid #ced3d9",
          borderRadius: "45px",
          padding: "20px",
          width: {
            sm: deviceType === "window" ? "100%" : deviceType === "tablet" ? "100%" : "390px",
            md: deviceType === "window" ? "100%" : deviceType === "tablet" ? "820px" : "390px",
            lg: deviceType === "window" ? "1280px" : deviceType === "tablet" ? "820px" : "390px",
          },
          margin: "auto",
          backgroundColor: "whitesmoke",
        }}>
        <Box
          sx={{
            border: "1px solid #ced3d9",
            borderRadius: "30px",
            overflow: "hidden",
          }}>
          {page && page?.prelemMetaArray && page?.prelemMetaArray.length && (
            <Frame
              width={deviceType === "window" ? "100%" : deviceType === "tablet" ? "100%" : "100%"}
              height={window?.parent?.innerHeight}
              initialContent={initialContent}
              id='site-frame'
              ref={iframeRef}
              contentDidMount={() => handleResize(iframeRef)}
              contentDidUpdate={() => handleResize(iframeRef)}
              frameBorder='0'>
              <ThemeProvider theme={() => PrelemTheme(ThemeConstant)}>
                <Box
                  sx={{
                    margin: (themeOptions) => themeOptions.prelemMargin.value,
                  }}>
                  {page?.prelemMetaArray?.map((arrayTuple: PrelemInstance, i) => {
                    if (!arrayTuple.IsHidden) {
                      const PrelemComponent = mappingDynamicInstance[arrayTuple.PrelemId];
                      const prelemSchema = {
                        ...arrayTuple,
                        isAuthoring: true,
                      };
                      const prelemContent = { ...prelemSchema?.content };
                      const prelemAnalytics = {
                        pageId: page?.pageSettings?.PageName,
                        pageTitle: page?.pageModel?.Title,
                        pageDesc: page?.pageSettings?.PageName,
                        pageTags: page?.pageSettings?.PageTags,
                        prelemID: arrayTuple.PrelemId,
                        prelemTitle: arrayTuple.PrelemName,
                        isAuthoring: true,
                        prelemPosition: i,
                      };
                      const prelemAuthoringHelper = {
                        isAuthoring: true,
                        isSeoEnabled: true,
                        isAnalyticsEnabled: true,
                        innerRef: myRefs.current[i],
                        isModalShow: true,
                      };
                      const prelemBaseEndpoint = {
                        APIEndPoint: process.env.NX_API_URI,
                        PublishEndPoint: `${getSubDomain()}/`,
                        buttonBaseUrl: `${getSubDomain()}/`,
                        device: deviceType,
                        deliveryEndPoint: process.env.NX_DELIVERY_URI,
                        language: i18n.language,
                      };
                      const secondaryArgs = {
                        prelemBaseEndpoint,
                        gcpUrl: process.env.NX_GCP_URL,
                        bucketName: process.env.NX_BUCKET_NAME,
                      };
                      return (
                        <Box
                          key={i}
                          sx={{
                            paddingTop: (themeOptions) => themeOptions.prelemPaddingTop.value,
                            paddingBottom: (themeOptions) => themeOptions.prelemPaddingBottom.value,
                          }}>
                          <PrelemComponent
                            content={prelemContent}
                            analytics={prelemAnalytics}
                            authoringHelper={prelemAuthoringHelper}
                            secondaryArgs={secondaryArgs}
                          />
                        </Box>
                      );
                    }
                  })}
                </Box>
              </ThemeProvider>
            </Frame>
          )}
        </Box>
      </Box>
    </>
  );
};
