import { Box } from "@mui/material";
import getConfig from "next/config";
import dynamic from "next/dynamic";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import { prelemBaseEndpointObj } from "../../utils/helperFunctions";
import { getHeaderFooterData } from "../../utils/helperInitialData";

const { publicRuntimeConfig = {} } = getConfig() || {};

export async function getServerSideProps(context) {
  const { query = {}, locale = "", resolvedUrl = "", req, res } = context;

  const { id = "" } = query;
  const host = req.headers.host || "";
  res.setHeader("site_host", host);
  res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");

  const [menuData, footerSettingData] = await getHeaderFooterData(locale || "en", host);

  return {
    props: {
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl },
      type: "",
      MenuData: menuData,
      footerSettingData: footerSettingData,
      site_host: host,
    },
  };
}

const MyProfile = (props: any) => {
  const { pageProps = {}, authState = {} } = props;
  const { route = {}, MenuData = [], footerSettingData = {}, site_host } = pageProps;

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const Component: any = dynamic(() => import(`platform-x-prelems/prelems/MyProfile`));

  return (
    <Box>
      <ErrorBoundary>
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
          <Component />
        </HeaderFooterLayout>
      </ErrorBoundary>
    </Box>
  );
};

export default MyProfile;
