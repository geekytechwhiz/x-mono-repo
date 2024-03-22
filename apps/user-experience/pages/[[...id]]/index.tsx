import { Box } from "@mui/material";
import { createRef, useEffect, useRef, memo } from "react";
import { useInView } from "react-intersection-observer";
import { GetServerSidePropsContext } from "next";
import getConfig from "next/config";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import PrelemComponent from "../../components/Prelem/PrelemComponent";
import PageHead from "../../components/pageHead";
import {
  getDomainUrl,
  navigateToHome,
  nullToArray,
  nullToObject,
  prelemBaseEndpointObj,
  sendVisitorData,
} from "../../utils/helperFunctions";
import { createNewSession, verifyLoggedInStatus } from "../../utils/helperLogin";
import { BEHIND_LOGIN, CONTENT_TYPES, SNOWPLOW } from "../../constants/CommonConstants";
import { getContentData, getHeaderFooterData } from "../../utils/helperInitialData";
import { usePageImpression } from "../../components/Common/customHook/PageImpressionHook";

interface Children {
  PrelemTag: Array<string>;
  PrelemId: string;
  PrelemName: string;
  SeoEnabled: boolean;
  AnalyticsEnabled: boolean;
  DocumentPath: string;
  DocumentType: string;
  IsHidden: boolean;
  StructuredData: Object;
}

interface Props {
  pageProps: any;
  pageDatas: any;
  pageData: any;
  instances: any;
  type: string;
  authState: any;
}

const { publicRuntimeConfig = {} } = getConfig() || {};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query = {}, locale = "", req, res } = context;
  const { id = [] } = query;
  const host = req.headers.host || "";
  // const host = "https://du.hcl-x.com/"; //NOSONAR
  res.setHeader("site_host", host);
  res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");
  try {
    const [menuData, footerSettingData] = await getHeaderFooterData(locale || "en", host);
    const pageName =
      nullToArray(id).length > 0
        ? id[0]
        : nullToArray(menuData)?.find((item: any) => item?.HomePage === true)?.URL || "";
    const contentResponse = await getContentData(
      CONTENT_TYPES.PAGE,
      pageName,
      locale || "en",
      host,
    );

    //Logic for login
    const { isLoggedIn, userData = {} } = await verifyLoggedInStatus(req, res);
    // const isPageBehindLogin = true;
    const isPageBehindLogin =
      contentResponse?.fetchPageContent?.PageSettings?.PageViewer === BEHIND_LOGIN;
    if ((!isLoggedIn && isPageBehindLogin) || (!isLoggedIn && query?.code)) {
      if (query?.code) {
        await createNewSession(req, res, query, locale, pageName);
        // if (!headers) {
        return {
          redirect: {
            permanent: false,
            destination: `${publicRuntimeConfig?.NEXT_AUTH}${getDomainUrl(
              host,
            )}${locale}/${pageName}`,
            // destination: `${publicRuntimeConfig?.NEXT_AUTH}http://localhost:3000/en/`,
          },
        };
        // }
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `${publicRuntimeConfig?.NEXT_AUTH}${getDomainUrl(
              host,
            )}${locale}/${pageName}`,
            // destination: `${publicRuntimeConfig?.NEXT_AUTH}http://localhost:3000/en/`,
          },
        };
      }
    }

    // Logic to navigate to home when page doesn't exist
    if (Object.keys(nullToObject(contentResponse?.fetchPageContent)).length === 0)
      return navigateToHome(locale);

    //redirect once cookie is set.
    if (!req.headers.cookie && isPageBehindLogin) {
      return navigateToHome(locale);
    }
    return {
      props: {
        type: "",
        MenuData: menuData,
        footerSettingData: footerSettingData,
        route: { ...query, locale: locale, query: pageName, id: pageName, host },
        pageData: contentResponse?.fetchPageContent || {},
        site_host: host,
        userData,
      },
    };
  } catch (error) {
    console.error(error, "error in api call");
    return {
      props: {
        type: "",
        MenuData: [],
        footerSettingData: {},
        route: {},
        pageData: {},
        site_host: host,
      },
    };
  }
}

const Home = (props: Props) => {
  const { pageProps = {}, authState = {}, instances = {} } = props;
  const {
    pageData = {},
    route = {},
    MenuData = [],
    footerSettingData = {},
    userData = {},
    site_host,
  } = pageProps;

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const myRefs = useRef([]);
  myRefs.current = pageData?.Children?.map(
    (arrayTuple: Children, i) => myRefs.current[i] ?? createRef(),
  );

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const setUserDetails = () => {
    if (userData?.user_id) {
      localStorage.setItem("userId", userData?.user_id || "");
      localStorage.setItem("userLoginDetails", JSON.stringify({ data: userData }) || "");
    }
  };

  useEffect(() => {
    setUserDetails();
  }, []);

  useEffect(() => {
    sendVisitorData(pageData); // send visitor data to RPI
  }, [inView, Object.keys(nullToObject(instances)).length]);

  usePageImpression(pageData, inView, instances, SNOWPLOW.CONTENT_TYPE.PAGE, route, site_host);

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        <PageHead
          pageData={{
            ...pageData,
            settings: {
              seo_title: pageData?.SeoEnable,
              socialog_url: `${prelemBaseEndpoint?.PublishEndPoint}${prelemBaseEndpoint?.language}/${route.id}`,
              socialog_title: pageData?.Title,
              seo_keywords: pageData?.PageSettings?.PageTags?.join(", "),
              socialog_image: "",
              SocialOgLocale: route?.locale,
              SocialOgSiteName: pageData?.SiteName,
              socialog_twitter_url: `${prelemBaseEndpoint?.PublishEndPoint}${prelemBaseEndpoint?.language}/${route.id}`,
              socialog_description: pageData?.PageSettings?.PageDescription,
              socialog_twitter_title: pageData?.Title,
              socialog_twitter_description: pageData?.PageSettings?.PageDescription,
            },
          }}
          favIcon={footerSettingData?.fav_icon}
        />
        <HeaderFooterLayout
          {...props}
          route={route}
          MenuData={MenuData}
          authState={authState}
          isCartIconEnable={true}
          footerSettingData={footerSettingData}
          prelemBaseEndpoint={prelemBaseEndpoint}>
          <PrelemComponent
            myRefs={myRefs}
            pageData={pageData}
            instances={instances}
            prelemBaseEndpoint={prelemBaseEndpoint}
            site_host={site_host}
          />
        </HeaderFooterLayout>
      </ErrorBoundary>
    </Box>
  );
};

export default memo(Home);
