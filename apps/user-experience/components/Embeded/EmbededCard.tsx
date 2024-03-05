import dynamic from "next/dynamic";
import getConfig from "next/config";
import { convertLowerCase } from "../../utils/helperFunctions";

const EmbedCard: any = dynamic(() => import("platform-x-prelems/prelems/Embed"));

// const ProductDetail = dynamic(() => import("@platformx/x-prelems-library").then((mod) => mod.ProductListing), {
//   ssr: false,
// });

const EmbededCard = (props) => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const defaultUrl = publicRuntimeConfig?.NEXT_PUBLISH_APP_URL;
  const defaultSocialImage =
    "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3e74f70e-7064-4bc9-a9a1-40ba01ecbef9/content";
  const { pageData = {}, secondaryArgs = {} } = props;

  const analyticsProp = {
    pageId: pageData?.Page,
    pageTitle: pageData?.PageSettings?.Page,
    pageDesc: pageData?.PageSettings?.Description,
    pageTags: pageData?.Tags?.join(", "),
    isAuthoring: false,
    isSeoEnabled: pageData?.SeoEnable,
    isAnalyticsEnabled: pageData?.AnalyticsEnable,
  };
  const embedData = {
    Title: pageData?.Title ? pageData?.Title : pageData?.title,
    Description: pageData?.Description ? pageData?.Description : pageData?.description,
    Thumbnail:
      convertLowerCase(pageData?.content_type) === "article"
        ? pageData?.banner
        : convertLowerCase(pageData?.TagName) === "vod"
        ? pageData?.Thumbnail
        : convertLowerCase(pageData?.content_type) === "quiz"
        ? pageData?.background_content?.Url
          ? pageData?.background_content?.Url
          : defaultSocialImage
        : convertLowerCase(pageData?.content_type) === "poll"
        ? pageData?.background_content?.Url
          ? pageData?.background_content?.Url
          : defaultSocialImage
        : convertLowerCase(pageData?.content_type) === "event"
        ? pageData?.thumbnail_image
        : defaultSocialImage,

    Author:
      convertLowerCase(pageData?.content_type) === "article"
        ? pageData?.developed_by
        : convertLowerCase(pageData?.TagName) === "vod"
        ? pageData?.developed_by
        : convertLowerCase(pageData?.content_type) === "quiz"
        ? pageData?.page_createdby
        : convertLowerCase(pageData?.content_type) === "poll"
        ? pageData?.createdBy
        : convertLowerCase(pageData?.content_type) === "event"
        ? pageData?.createdBy
        : pageData?.developed_by,

    creationDate:
      convertLowerCase(pageData?.content_type) === "article"
        ? pageData?.developed_date
        : convertLowerCase(pageData?.TagName) === "vod"
        ? pageData?.developed_date
        : convertLowerCase(pageData?.content_type) === "quiz"
        ? pageData?.created_date
        : convertLowerCase(pageData?.content_type) === "poll"
        ? pageData?.creationDate
        : convertLowerCase(pageData?.content_type) === "event"
        ? pageData?.creationDate
        : pageData?.last_modified_date,

    LandingPage:
      convertLowerCase(pageData?.content_type) === "article"
        ? pageData?.settings?.socialog_url
        : convertLowerCase(pageData?.TagName) === "vod"
        ? pageData?.settings?.socialog_url
        : convertLowerCase(pageData?.content_type) === "quiz"
        ? pageData?.settings?.socialog_url
        : convertLowerCase(pageData?.content_type) === "poll"
        ? pageData?.settings?.socialog_url
        : defaultUrl,
  };
  const prelemAuthoringHelper = {
    isAuthoring: false,
  };
  return (
    <EmbedCard
      content={embedData}
      analytics={analyticsProp}
      secondaryArgs={secondaryArgs}
      authoringHelper={prelemAuthoringHelper}
    />
  );
};

export default EmbededCard;
