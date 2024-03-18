import React, { memo } from "react";
import dynamic from "next/dynamic";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

const ArticlePrelem = dynamic(
  () => import("@platformx/x-prelems-library").then((mod) => mod.Article),
  {
    ssr: false,
    loading: () => <SkeletonLoader />,
  },
);
const ArticleComponent = (props) => {
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
    <ArticlePrelem
      content={prelemContentProp}
      analytics={prelemAnalyticsProp}
      authoringHelper={prelemAuthoringHelper}
      secondaryArgs={secondaryArgs}
    />
  );
};

export default memo(ArticleComponent);
