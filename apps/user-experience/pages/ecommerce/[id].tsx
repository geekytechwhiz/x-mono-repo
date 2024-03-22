import { useState } from "react";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import { Ecommerce } from "../../components/Ecommerce/Ecommerce";
import {
  nullToArray,
  nullToObject,
  prelemBaseEndpointObj,
  snowplowSchemaUrl,
} from "../../utils/helperFunctions";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import getConfig from "next/config";
import { getHeaderFooterData } from "../../utils/helperInitialData";

const { publicRuntimeConfig = {} } = getConfig() || {};

export async function getServerSideProps(context) {
  const { query = {}, locale = "", req, resolvedUrl } = context;
  const { id = "" } = query;
  const host = req.headers.host || "";

  const [menuData, footerSettingData] = await getHeaderFooterData(locale || "en", host);

  return {
    props: {
      pageData: {},
      type: "",
      MenuData: menuData,
      footerSettingData: footerSettingData,
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl, host },
      site_host: host,
    },
  };
}

const EcommercePage = (props: any) => {
  const { pageProps = {}, authState = {} } = props;
  const { route = {}, MenuData = [], footerSettingData = {}, site_host } = pageProps;
  const [cartCount, set_cartCount] = useState<any>(0);

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const cartCountUpdate = (ele: any) => {
    const { line_item = [] } = nullToObject(ele);
    if (ele === null) {
      set_cartCount(null);
    } else {
      set_cartCount(nullToArray(line_item).length);
    }
  };

  /**
   * pass url from eCom prelm repo
   * @param url string
   */
  const takeToLoginPage = (url) => {
    const loginUrl = `${publicRuntimeConfig?.NEXT_AUTH}${url}`;
    window?.location.replace(loginUrl);
  };

  return (
    <ErrorBoundary>
      <HeaderFooterLayout
        userData={{}}
        route={route}
        MenuData={MenuData}
        isEcomPage={true}
        authState={authState}
        isCartIconEnable={true}
        isProductUpdateCount={cartCount}
        footerSettingData={footerSettingData}
        prelemBaseEndpoint={prelemBaseEndpoint}>
        <Ecommerce
          secondaryArgs={{ prelemBaseEndpoint, ...snowplowSchemaUrl() }}
          cartCountUpdate={cartCountUpdate}
          takeToLoginPage={takeToLoginPage}
        />
      </HeaderFooterLayout>
    </ErrorBoundary>
  );
};

export default EcommercePage;
