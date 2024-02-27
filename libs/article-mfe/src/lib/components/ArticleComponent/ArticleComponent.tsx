import { Article } from "@platformx/x-prelem-library";

export const ArticleComponent = (props) => {
  const { pageData = {}, secondaryArgs = {} } = props || {};
  const contentData = pageData;
  const analyticsProp = {
    pageId: pageData?.page,
    pageTitle: pageData?.title,
    pageDesc: pageData?.description,
    pageTags: pageData?.settings?.keywords?.join(", "),
    isAuthoring: false,
    isSeoEnabled: pageData?.settings?.seo_blockIndexing,
    isAnalyticsEnabled: pageData?.analytics_enable,
  };
  const authoringHelper = {
    isModalShow: true,
  };

  return (
    <Article
      content={contentData}
      analytics={analyticsProp}
      authoringHelper={authoringHelper}
      secondaryArgs={secondaryArgs}
    />
  );
};
