/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AUTH_INFO, PrelemTheme, XLoader, getCurrentLang } from "@platformx/utilities";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { MAPPING, HIDE_HEADER_FOOTER } from "../../constants/CommonConstants";
import { useStyles } from "./CommonPrivew.style";
import axios from "axios";

interface MappingDynamicInstance {
  Header?: React.ComponentType<any>;
  Footer?: React.ComponentType<any>;
}
// let mappingDynamicInstance: any;
// Object.keys(MAPPING).map((item) => {
//   mappingDynamicInstance[item] = lazy(() =>
//     import(`@platformx/x-prelems-library`).then((module) => ({
//       default: module[MAPPING[item]],
//     })),
//   );
//   return mappingDynamicInstance;
// });
// console.log("mappingDynamicInstance", mappingDynamicInstance);

const CommonContentRender = () => {
  const classes = useStyles();
  const currentItem = localStorage.getItem("preview");
  const currentContent = currentItem && JSON.parse(currentItem);
  const ContentType = lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module?.[currentContent?.contentType],
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
  // const ContentType = mappingDynamicInstance[currentContent?.contentType];
  // const Header = mappingDynamicInstance[MAPPING.Header];
  // const Footer = mappingDynamicInstance[MAPPING.Footer];
  // const { [currentContent?.contentType]: ContentType, Header, Footer } = mappingDynamicInstance;

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
        <Suspense fallback={<XLoader type='xloader' />}>
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
