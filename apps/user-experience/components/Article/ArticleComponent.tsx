import React from "react";
import dynamic from "next/dynamic";

const ArticlePrelem: any = dynamic(() => import(`platform-x-prelems/prelems/Article`), {
  ssr: false,
});

export const ArticleComponent = (props) => {
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
      <ArticlePrelem
        content={prelemContentProp}
        analytics={prelemAnalyticsProp}
        authoringHelper={prelemAuthoringHelper}
        secondaryArgs={secondaryArgs}
      />
    </React.Fragment>
  );
};
