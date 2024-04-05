import createCache from "@emotion/cache";
import weakMemoize from "@emotion/weak-memoize";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import TabletAndroidRoundedIcon from "@mui/icons-material/TabletAndroidRounded";
import { Box, Divider } from "@mui/material";
import { RootState } from "@platformx/authoring-state";
import { ThemeConstants } from "@platformx/utilities";
import { Mapping } from "@platformx/x-prelems-library";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  const { state: stateObj } = useLocation();
  const { t } = useTranslation();
  const { device = "" } = useParams();
  const [deviceType, setDeviceType] = useState<string>("");
  // const [height, setHeight] = useState(400);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const memoizedCreateCacheWithContainer = weakMemoize((container: any) => {
    const newCache = createCache({ container, key: "css", prepend: true });
    return newCache;
  });

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
            <iframe
              className='prelemResponsivePreview'
              title='page preview'
              width='100%'
              style={{ height: `calc(100vh - 170px)` }}
              frameBorder='0'
              src={`${stateObj?.prevPageUrl}&preview=true`}></iframe>
          )}
        </Box>
      </Box>
    </>
  );
};
