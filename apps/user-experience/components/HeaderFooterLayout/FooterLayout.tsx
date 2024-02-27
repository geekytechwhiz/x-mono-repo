import getConfig from "next/config";
import dynamic from "next/dynamic";
import React from "react";

const { publicRuntimeConfig = {} } = getConfig() || {};

const FooterLayout = (props: any) => {
  const { route = {}, MenuData = [], showHeader = false, footerSettingData = {} } = props;

  const headerFooterData = {
    Menus: MenuData,
  };

  const DynamicFooter: any = dynamic(
    () => import(`platform-x-prelems/prelems/HeaderFooter`).then((mod) => mod.Footer),
    { ssr: false },
  );
  // const DynamicFooter = dynamic(() => import("@platformx/x-prelems-library").then((mod) => mod.Footer), {
  //   ssr: false,
  // });

  const tempHide = true;
  return (
    <>
      {showHeader && tempHide ? (
        <DynamicFooter
          data={{
            ...headerFooterData,
            ...footerSettingData,
          }}
          langCode={route?.locale}
          gcpUrl={publicRuntimeConfig?.NEXT_GCP_URL}
          bucketName={publicRuntimeConfig?.NEXT_BUCKET_NAME}
        />
      ) : null}
    </>
  );
};
export default React.memo(FooterLayout);
