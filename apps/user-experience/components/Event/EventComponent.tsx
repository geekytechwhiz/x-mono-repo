import dynamic from "next/dynamic";

const EventPrelem = dynamic(() => import("@platformx/x-prelems-library").then((mod) => mod.Event), {
  ssr: false,
});

export const EventComponent = (props) => {
  const { pageData = {}, secondaryArgs = {} } = props || {};
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
    <EventPrelem
      content={pageData}
      analytics={prelemAnalyticsProp}
      authoringHelper={prelemAuthoringHelper}
      secondaryArgs={secondaryArgs}
    />
  );
};
