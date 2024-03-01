import { Box } from "@mui/material";
import PageHead from "../../components/pageHead";
import { useInView } from "react-intersection-observer";
import { EventComponent } from "../../components/Event/EventComponent";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import {
  navigateToHome,
  nullToObject,
  prelemBaseEndpointObj,
  snowplowSchemaUrl,
} from "../../utils/helperFunctions";
import getConfig from "next/config";
import { getInitialData } from "../../utils/helperInitialData";
import { CONTENT_TYPES, SNOWPLOW } from "../../constants/CommonConstants";
import { usePageImpression } from "../../components/Common/customHook/PageImpressionHook";

export async function getServerSideProps(context) {
  const { query = {}, locale = "", req, resolvedUrl = "" } = context;
  const { id = "" } = query;
  const host = req.headers.host || "";

  const [menuData, footerSettingData, contentResponse] = await getInitialData(
    CONTENT_TYPES.EVENT,
    id,
    locale || "en",
    host,
  );

  if (Object.keys(nullToObject(contentResponse?.fetchEventContent)).length === 0)
    return navigateToHome(locale);

  return {
    props: {
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl, host },
      pageData: contentResponse?.fetchEventContent || {},
      type: "",
      MenuData: menuData,
      footerSettingData: footerSettingData,
      site_host: host,
    },
  };
}

const Event = (props: any) => {
  const { pageProps = {}, authState = {}, instances = {} } = props;

  const { pageData = {}, route = {}, MenuData = [], footerSettingData = {}, site_host } = pageProps;

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { publicRuntimeConfig = {} } = getConfig() || {};

  usePageImpression(pageData, inView, instances, SNOWPLOW.CONTENT_TYPE.EVENT, route, site_host);

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        {/* page head */}
        <PageHead
          pageData={{
            ...pageData,
            settings: {
              ...pageData.settings,
              socialog_title: pageData.title,
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
          <EventComponent
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

export default Event;
