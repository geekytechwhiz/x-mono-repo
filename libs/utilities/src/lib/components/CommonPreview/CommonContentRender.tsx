/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AUTH_INFO, Loader, PrelemTheme, getCurrentLang } from "@platformx/utilities";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { MAPPING, HIDE_HEADER_FOOTER } from "../../constants/CommonConstants";
import { useStyles } from "./CommonPrivew.style";
import axios from "axios";

const CommonContentRender = () => {
  const classes = useStyles();
  const currentItem = localStorage.getItem("preview");
  const currentContent = currentItem && JSON.parse(currentItem);
  const selectedContentType = MAPPING[currentContent?.contentType];
  const ContentType = lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module?.[selectedContentType],
    })),
  );
  const Header = lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module?.Header,
    })),
  );
  const Footer = lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module?.Footer,
    })),
  );
  if (!currentItem || JSON.stringify(currentItem) === JSON.stringify("{}")) {
    window.history.back();
  }
  const [ishide, setIsHide] = useState(false);
  const [previewObject, setPreviewObject] = useState({
    options_compound_fields: "",
    contentType: "",
  });
  const [menuData, setmenuData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    if (Object.keys(currentContent).length > 0) {
      setPreviewObject(currentContent);
    } else {
      window.history.back();
    }
  }, []);
  useEffect(() => {
    if (HIDE_HEADER_FOOTER.includes(currentContent?.contentType)) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }
  }, [currentContent]);
  useEffect(() => {
    const hostName = process.env.NX_SITE_HOST;
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NX_DELIVERY_URI}api/v1/web/${getCurrentLang()}/delivery/footer-setting-model?pagePath=footer-item&contentType=MultiSiteSettings`,
          {
            headers: {
              site_host: hostName,
            },
          },
        );
        setFooterData(response?.data?.fetchMultiSiteFooterSettings);
        setmenuData({
          header_logo: response?.data?.data?.fetchMultiSiteFooterSettings?.header_logo,
          Menus: [],
        });
        window.parent.postMessage("contentLoaded", "*");
      } catch (error) {
        window.parent.postMessage("contentLoaded", "*");
        console.error("Error fetching data:", error);
      }
    };
    fetchFooterData();
  }, []);

  const prelemAuthoringHelper = {
    isAuthoring: true,
  };
  const secondaryArgs = {
    gcpUrl: AUTH_INFO.gcpUri,
    bucketName: AUTH_INFO.gcpBucketName,
  };

  return (
    <Box className={`${classes.commonPreviewPageRender} contentPreviewPage`}>
      <ThemeProvider theme={PrelemTheme}>
        <Suspense fallback={<Loader />}>
          {!ishide && (
            <Box>
              <Header
                data={menuData}
                homePageUrl=''
                langCode={getCurrentLang()}
                secondaryArgs={secondaryArgs}
                bucketName={secondaryArgs?.bucketName}
                gcpUrl={secondaryArgs?.gcpUrl}
              />
            </Box>
          )}

          <ContentType
            showRecentArticles={false}
            content={previewObject}
            showLoading={false}
            results={previewObject.options_compound_fields}
            enablePreview
            authoringHelper={prelemAuthoringHelper}
            secondaryArgs={secondaryArgs}
          />
          {!ishide && (
            <Box>
              <Footer
                data={footerData}
                langCode={getCurrentLang()}
                bucketName={secondaryArgs?.bucketName}
                gcpUrl={secondaryArgs?.gcpUrl}
              />
            </Box>
          )}
        </Suspense>
      </ThemeProvider>
    </Box>
  );
};
export default CommonContentRender;
