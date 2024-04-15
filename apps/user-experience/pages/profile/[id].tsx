import { Box } from "@mui/material";
import getConfig from "next/config";
import { GetServerSidePropsContext } from "next";
import PageHead from "../../components/pageHead";
import { useInView } from "react-intersection-observer";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import { ProfileComponent } from "../../components/Profile/Profile";
import { getInitalProfileData } from "../../utils/helperInitialData";
import { CONTENT_TYPES, SNOWPLOW } from "../../constants/CommonConstants";
import { prelemBaseEndpointObj, snowplowSchemaUrl } from "../../utils/helperFunctions";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import { usePageImpression } from "../../components/Common/customHook/PageImpressionHook";

const { publicRuntimeConfig = {} } = getConfig() || {};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query = {}, locale = "", req, res } = context;
  const { id = "" } = query;
  const host = req.headers?.host || "";
  res.setHeader("site_host", host);
  res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");
  try {
    const [menuData, footerSettingData, fetchSchemaContent] = await getInitalProfileData(
      CONTENT_TYPES.PROFILE,
      id,
      locale || "en",
      host,
    );

    return {
      props: {
        route: { ...query, locale: locale, query: id, host },
        pageData: fetchSchemaContent || {},
        type: "",
        MenuData: menuData,
        footerSettingData: footerSettingData,
        site_host: host,
      },
    };
  } catch (error) {
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

const Profile = (props: any) => {
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

  usePageImpression(pageData, inView, instances, SNOWPLOW.CONTENT_TYPE.PROFILE, route, site_host);

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        {/* page head */}
        <PageHead pageData={pageData} favIcon={footerSettingData?.fav_icon} />

        <HeaderFooterLayout
          userData={{}}
          isEcomPage={false}
          route={route}
          MenuData={MenuData}
          authState={authState}
          isCartIconEnable={true}
          footerSettingData={footerSettingData}
          prelemBaseEndpoint={prelemBaseEndpoint}>
          <ProfileComponent
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

export default Profile;
