import { CacheProvider, EmotionCache } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import getConfig from "next/config";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AnalyticsProvider } from "use-analytics";
import dynamic from "next/dynamic";
import ErrorBoundary from "../components/Common/ErrorBoundary";
import { CookieDataType } from "../components/Cookie/Cookie.type";
import PlatformXLoader from "../components/Loader/loader";
import { analyticsInstance } from "../dynamic/dynamicAnalytics";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/globals.css";
import PrelemTheme from "../theme/prelemTheme";
import { triggerAPM } from "../utils/helperFunctions";
import { ToastContainer } from "react-toastify";
import ChatPopUp from "../components/chat/chatPopUp";
import { default as light } from "../theme/prelemVariableLight";
import { default as fifa } from "../theme/fifaVariable";
import { default as feyenoord } from "../theme/feyenoordVariable";
import { default as hockeyAustralia } from "../theme/hockeyAustraliaVariable";

const { publicRuntimeConfig } = getConfig();
unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "Platform-x-"),
);

type MyAppType = {
  pageProps?: any;
  Component?: any;
  emotionCache?: EmotionCache;
  pageData?: any;
  route?: Router;
  MenuData?: [];
  HeaderFooterData?: {};
  footerSettingData?: {};
  cookieData?: CookieDataType;
};

function MyApp(props: MyAppType) {
  const { Component, pageProps, pageData } = props;
  const pageRouter = useRouter();
  // const anaInstance: any = {
  //   identify: () => {},
  //   track: () => {},
  //   page: () => {},
  //   user: () => {},
  //   // ...and 7 more properties
  // };
  const [instances, setInstances] = useState({});
  const [loading, setLoading] = useState(false);
  const clientSideEmotionCache = createEmotionCache();
  const { emotionCache = clientSideEmotionCache } = props;

  const siteName = publicRuntimeConfig.NEXT_SITE_BASED_THEME;
  const site_array = (siteName || "").split(",");
  let ThemeConstant;
  if (site_array?.[0] === pageProps?.site_host) {
    ThemeConstant = fifa;
  } else if (site_array?.[1] === pageProps?.site_host) {
    ThemeConstant = feyenoord;
  } else if (site_array?.[2] === pageProps?.site_host) {
    ThemeConstant = hockeyAustralia;
  } else {
    ThemeConstant = light;
  }

  const analyticHandle = () => {
    if (Object.keys(instances).length === 0) {
      (async () => {
        const res = await analyticsInstance();
        setInstances(res);
      })();
    }
  };

  useEffect(() => {
    if (publicRuntimeConfig?.NEXT_ELASTIC_APM_ENVIRONMENT === "staging") triggerAPM();
  }, []);

  useEffect(() => {
    Router?.events?.on("routeChangeStart", () => setLoading(true));
    Router?.events?.on("routeChangeComplete", () => setLoading(false));
    Router?.events?.on("routeChangeError", () => setLoading(false));
    return () => {
      Router?.events?.off("routeChangeStart", () => setLoading(true));
      Router?.events?.off("routeChangeComplete", () => setLoading(false));
      Router?.events?.off("routeChangeError", () => setLoading(false));
    };
  }, [Router?.events]);

  const CookieComponent = dynamic(() => import("../components/Cookie/Cookie"), {
    ssr: false,
  });

  return (
    <>
      <ToastContainer position='bottom-right' />
      {loading ? (
        <>
          <PlatformXLoader />
        </>
      ) : (
        <>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={PrelemTheme(ThemeConstant)}>
              <CssBaseline />
              <ErrorBoundary>
                <AnalyticsProvider instance={instances}>
                  <Box
                    sx={{
                      margin: (themeOptions) => themeOptions.prelemMargin.value,
                      minHeight: "100vh",
                    }}>
                    <ChatPopUp />
                    <Component
                      {...props}
                      {...pageProps}
                      pageData={pageData}
                      instances={instances}
                    />
                  </Box>
                </AnalyticsProvider>
              </ErrorBoundary>
              {!pageRouter?.asPath?.includes("embed") ? (
                <CookieComponent analyticHandle={analyticHandle} />
              ) : null}
            </ThemeProvider>
          </CacheProvider>
        </>
      )}
    </>
  );
}

export default MyApp;
