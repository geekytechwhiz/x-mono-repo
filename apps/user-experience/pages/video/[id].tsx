import { Box } from "@mui/material";
import PageHead from "../../components/pageHead";
import { useInView } from "react-intersection-observer";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import getConfig from "next/config";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import {
  navigateToHome,
  nullToObject,
  prelemBaseEndpointObj,
  snowplowSchemaUrl,
} from "../../utils/helperFunctions";
import VideoComponent from "../../components/Video/VideoComponent";
import { CONTENT_TYPES, SNOWPLOW } from "../../constants/CommonConstants";
import { getInitialData } from "../../utils/helperInitialData";
import { usePageImpression } from "../../components/Common/customHook/PageImpressionHook";

const { publicRuntimeConfig = {} } = getConfig() || {};

export async function getServerSideProps(context) {
  const { query = {}, locale = "", resolvedUrl = "", req, res } = context;

  const { id = "" } = query;
  const host = req.headers.host || "";

  res.setHeader("site_host", host);
  res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");

  const [menuData, footerSettingData, contentResponse] = await getInitialData(
    CONTENT_TYPES.VOD,
    id,
    locale || "en",
    host,
  );
  if (Object.keys(nullToObject(contentResponse?.fetchVodByContent)).length === 0)
    return navigateToHome(locale);

  return {
    props: {
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl, host },
      pageData: contentResponse?.fetchVodByContent || {},
      type: "",
      MenuData: menuData,
      footerSettingData: footerSettingData,
      site_host: host,
    },
  };
}

const Video = (props: any) => {
  const { pageProps = {}, authState = {}, instances = {} } = props;
  const { pageData = {}, route = {}, MenuData = [], footerSettingData = {}, site_host } = pageProps;

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  usePageImpression(pageData, inView, instances, SNOWPLOW.CONTENT_TYPE.VIDEO, route, site_host);

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        {/* page head */}
        <PageHead
          pageData={{
            ...pageData,
            settings: {
              ...pageData.settings,
              socialog_title: pageData.Title,
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
          prelemBaseEndpoint={{
            ...prelemBaseEndpoint,
            gcpUrl: publicRuntimeConfig.NEXT_GCP_URL,
            bucketName: publicRuntimeConfig.NEXT_BUCKET_NAME,
          }}>
          <VideoComponent
            pageData={pageData}
            secondaryArgs={{
              prelemBaseEndpoint,
              ...snowplowSchemaUrl(),
              gcpUrl: publicRuntimeConfig.NEXT_GCP_URL,
              bucketName: publicRuntimeConfig.NEXT_BUCKET_NAME,
            }}
          />
        </HeaderFooterLayout>
      </ErrorBoundary>
    </Box>
  );
};

export default Video;
