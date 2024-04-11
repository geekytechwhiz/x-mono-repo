/* eslint-disable @typescript-eslint/no-unused-vars */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import TabletAndroidRoundedIcon from "@mui/icons-material/TabletAndroidRounded";
import { Box } from "@mui/material";
import { ThemeConstants, XLoader } from "@platformx/utilities";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { HIDE_HEADER_FOOTER } from "../../constants/CommonConstants";
import { useStyles } from "./CommonPrivew.style";

const tabs = [
  { type: "desktop", icon: ComputerRoundedIcon },
  { type: "tablet", icon: TabletAndroidRoundedIcon },
  { type: "mobile", icon: PhoneAndroidRoundedIcon },
];

const CommonPreview = ({ iframeUrl, type }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deviceType, setDeviceType] = useState("desktop");
  const classes = useStyles();
  const { currentContent } = useSelector((state: any) => state.content);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const getDefaultWidth = () => {
    if (window.outerWidth > 600 && iframeRef.current) {
      iframeRef.current.style.height = "100vh";
    } else if (iframeRef.current) {
      iframeRef.current.style.minHeight = `calc(100vh - 60px)`;
      iframeRef.current.style.height = `calc(100vh - 60px)`;
    }
  };
  const [loaded, setLoaded] = useState(false);
  const adjustIframeHeight = () => {
    if (
      iframeRef.current &&
      iframeRef.current.contentWindow &&
      !HIDE_HEADER_FOOTER.includes(currentContent?.contentType)
    ) {
      const iframeDocument = iframeRef.current.contentWindow.document;
      if (type !== "page") {
        const height = iframeDocument.body.scrollHeight;
        iframeRef.current.style.height = height + 30 + "px";
      } else {
        getDefaultWidth();
      }
    } else if (iframeRef.current) {
      getDefaultWidth();
    }
  };

  useEffect(() => {
    const handleResize = (event) => {
      if (event.data === "contentLoaded") {
        adjustIframeHeight();
        setLoaded(true);
      }
    };
    setTimeout(() => {
      adjustIframeHeight();
      type === "page" && setLoaded(true);
    }, 1000);

    window.addEventListener("resize", handleResize);
    window.addEventListener("message", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("message", handleResize);
    };
  }, [deviceType]);

  useEffect(() => {
    const extractDeviceType = () => {
      const currentUrl = window.location.href;
      const match = currentUrl.match(/\/preview-page\/([^/]+)\/?$/);
      if (match) {
        const device = match[1].toLowerCase();
        if (device.includes("mobile")) {
          setDeviceType("mobile");
        } else if (device.includes("tablet")) {
          setDeviceType("tablet");
        } else {
          setDeviceType("desktop");
        }
      }
    };
    extractDeviceType();
  }, []);

  useEffect(() => {
    localStorage.setItem("preview", JSON.stringify(currentContent));
    return () => localStorage.removeItem("preview");
  }, []);

  return (
    <Box className={`${classes.commonPreviewWrapper} commonPreviewWrapper`}>
      {!loaded && (
        <Box className='xloader'>
          <XLoader type='xloader' />
        </Box>
      )}
      <Box className='leftPannelAndIframeWrapper'>
        {loaded && (
          <Box className='leftMenuPanel'>
            <Box className='backArrow' onClick={() => navigate(-1)} sx={{ cursor: "pointer" }}>
              <ArrowBackIcon />
            </Box>
            <Box className='tabsItemsWrapper'>
              {tabs.map((tab, index) => (
                <Box
                  key={index}
                  className='tabsItemIcons'
                  sx={{
                    display: "flex",
                    backgroundColor:
                      deviceType === tab.type
                        ? ThemeConstants.SECONDRY_COLOR["600"]
                        : ThemeConstants.WHITE_COLOR,
                    transition: "all 0.50s",

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
        )}
        <Box className='rightIframePanelWrapper'>
          <Box
            className='rightIframePanel'
            sx={{
              width: {
                xs:
                  deviceType === "desktop" ? "1280px" : deviceType === "tablet" ? "700px" : "100%",
                sm: deviceType === "desktop" ? "1280px" : deviceType === "tablet" ? "700px" : "98%",
                md:
                  deviceType === "desktop" ? "1280px" : deviceType === "tablet" ? "700px" : "375px",
                lg: deviceType === "desktop" ? "100%" : deviceType === "tablet" ? "700px" : "375px",
              },
              margin: "auto",
              transition: "width 0.50s",
            }}>
            <iframe
              className='prelemResponsivePreview'
              ref={iframeRef}
              title='page preview'
              width='100%'
              frameBorder='0'
              style={{
                width: "100%",
                minHeight: "100vh",
                border: deviceType !== "desktop" ? "solid 1px #ccc" : "none",
                borderRadius: deviceType !== "desktop" ? "30px" : 0,
                pointerEvents: type !== "page" ? "none" : "auto",
              }}
              src={iframeUrl}></iframe>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CommonPreview;
