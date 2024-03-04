import dynamic from "next/dynamic";

const QuizPrelem = dynamic(() => import("@platformx/x-prelems-library").then((mod) => mod.Quiz), {
  ssr: false,
});

export const QuizComponent = (props) => {
  const { pageData = {}, secondaryArgs } = props || {};
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
    isAuthoring: false,
  };

  return (
    <QuizPrelem
      content={pageData}
      analytics={prelemAnalyticsProp}
      authoringHelper={prelemAuthoringHelper}
      secondaryArgs={secondaryArgs}
    />
  );
};
