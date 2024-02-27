import getConfig from "next/config";
import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import HeaderFooterLayout from "../../HeaderFooterLayout/HeaderFooterLayout";
import { prelemBaseEndpointObj } from "../../../utils/helperFunctions";

const { publicRuntimeConfig = {} } = getConfig() || {};

const ErrorBoundaryHeaderFooterWrapper = (props: any) => {
  const { pageProps = {}, authState = {}, children } = props;
  const { route = {}, MenuData = [], footerSettingData = {}, site_host } = pageProps;

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };
  return (
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
        {children}
      </HeaderFooterLayout>
    </ErrorBoundary>
  );
};
export default React.memo(ErrorBoundaryHeaderFooterWrapper);
