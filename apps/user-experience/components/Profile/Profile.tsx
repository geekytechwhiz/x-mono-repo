import React from "react";
import dynamic from "next/dynamic";

const ProfilePrelem: any = dynamic(() => import(`platform-x-prelems/prelems/PlayerDetail`), {
  ssr: false,
});

export const ProfileComponent = (props) => {
  const { pageData = {}, secondaryArgs = {} } = props || {};
  const prelemContentProp = pageData;
  const prelemAnalyticsProp = {
    pageId: pageData?.page,
    pageTitle: pageData?.title,
    pageDesc: pageData?.description,
    pageTags: pageData?.settings?.keywords?.join(", "),
    isAuthoring: false,
    isSeoEnabled: pageData?.settings?.seo_blockIndexing,
    isAnalyticsEnabled: pageData?.analytics_enable,
  };

  const prelemAuthoringHelper = {
    isModalShow: true,
  };

  return (
    <React.Fragment>
      <ProfilePrelem
        content={prelemContentProp}
        analytics={prelemAnalyticsProp}
        authoringHelper={prelemAuthoringHelper}
        secondaryArgs={secondaryArgs}
      />
    </React.Fragment>
  );
};
