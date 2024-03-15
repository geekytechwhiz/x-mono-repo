import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import { prelemBaseEndpointObj } from "../../utils/helperFunctions";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import { getHeaderFooterData } from "../../utils/helperInitialData";

export async function getServerSideProps(context) {
  const { query = {}, locale = "", resolvedUrl = "", req } = context;
  const host = req.headers.host || "";
  const { id = "" } = await query;

  const [menuData, footerSettingData] = await getHeaderFooterData(locale || "en", host);

  return {
    props: {
      pageData: {},
      MenuData: menuData,
      footerSettingData: footerSettingData,
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl, host },
      site_host: host,
    },
  };
}

const Profile = (props: any) => {
  const { pageProps = {}, authState = {} } = props;
  const { route = {}, site_host = "", MenuData = [], footerSettingData = {} } = pageProps;

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const UserProfile = dynamic(
    () => import("@platformx/x-prelems-library").then((mod) => mod.Profile),
    {
      ssr: false,
    },
  );

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
          prelemBaseEndpoint={prelemBaseEndpoint}>
          <UserProfile secondaryArgs={{ prelemBaseEndpoint }} />
        </HeaderFooterLayout>
      </ErrorBoundary>
    </Box>
  );
};

export default Profile;
