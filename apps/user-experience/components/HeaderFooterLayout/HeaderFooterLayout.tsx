import React, { memo } from "react";
import getConfig from "next/config";
import { Box } from "@mui/material";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import { getDomainUrl } from "../../utils/helperFunctions";

const { publicRuntimeConfig = {} } = getConfig() || {};

type headerFooterTypeProps = {
  children: any;
  route: any;
  MenuData: Array<any>;
  authState: any;
  isEcomPage?: boolean;
  footerSettingData: any;
  prelemBaseEndpoint: any;
  isCartIconEnable: boolean;
  isProductUpdateCount?: boolean | number; //ecom purpose
  userData?: any;
};

const HeaderFooterLayout = (props: headerFooterTypeProps) => {
  const {
    children = "",
    route = {},
    MenuData = [],
    userData = {},
    authState = {},
    isEcomPage = false,
    footerSettingData = {},
    prelemBaseEndpoint = {},
    isCartIconEnable = true, //ecom purpose
    isProductUpdateCount = 0, //ecom purpose
  } = props;
  const { locale = "", host = "" } = route;
  const showHeader = children ? true : false;

  const logoutButtonHandle = () => {
    const logOutUrl = `${publicRuntimeConfig?.NEXT_LOGOUT}?tenant_id=${
      publicRuntimeConfig?.NEXT_REALM
    }&client_id=${publicRuntimeConfig?.NEXT_CLIENT_ID}&redirect_uri=${getDomainUrl(host)}${locale}`;
    localStorage.removeItem("userLoginDetails");
    localStorage.removeItem("userId");
    localStorage.removeItem("VisitorID");
    localStorage.removeItem("OfferName");
    window?.location.replace(logOutUrl);
  };

  const onLogin = () => {
    const loginUrl = `${publicRuntimeConfig?.NEXT_AUTH}${getDomainUrl(host)}${locale}`;
    window?.location.replace(loginUrl);
  };

  return (
    <div className='layout'>
      <HeaderLayout
        onLogin={onLogin}
        route={route}
        userData={{ data: userData }}
        MenuData={MenuData}
        authState={authState}
        isEcomPage={isEcomPage}
        showHeader={showHeader}
        isCartIconEnable={isCartIconEnable}
        footerSettingData={footerSettingData}
        prelemBaseEndpoint={prelemBaseEndpoint}
        logoutButtonHandle={logoutButtonHandle}
        isProductUpdateCount={isProductUpdateCount}
        host={host}
        locale={locale}
      />
      <Box
        sx={{
          minHeight: "100vh",
        }}>
        {children}
      </Box>
      <FooterLayout
        route={route}
        MenuData={MenuData}
        showHeader={showHeader}
        footerSettingData={footerSettingData}
      />
    </div>
  );
};
export default memo(HeaderFooterLayout);
