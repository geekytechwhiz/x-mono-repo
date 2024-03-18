import { GetServerSidePropsContext } from "next";
import { Box } from "@mui/material";
import getConfig from "next/config";
import { useInView } from "react-intersection-observer";
import PageHead from "../../components/pageHead";
import ArticleComponent from "../../components/Article/ArticleComponent";
import HeaderFooterLayout from "../../components/HeaderFooterLayout/HeaderFooterLayout";
import { prelemBaseEndpointObj, snowplowSchemaUrl } from "../../utils/helperFunctions";
import { getInitialData } from "../../utils/helperInitialData";
import { CONTENT_TYPES, SNOWPLOW } from "../../constants/CommonConstants";
import { usePageImpression } from "../../components/Common/customHook/PageImpressionHook";

const { publicRuntimeConfig = {} } = getConfig() || {};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query = {}, locale = "en", req, res } = context;
  const { id = "" } = query;
  const host = req.headers.host || "";
  res.setHeader("site_host", host);
  res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");
  // try {
  const [menuData, footerSettingData, contentResponse] = await getInitialData(
    CONTENT_TYPES.ARTICLE,
    id,
    locale || "en",
    host,
  );
  if (!contentResponse?.fetchArticleContent) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      route: { ...query, locale: locale, query: id, host },
      pageData: contentResponse?.fetchArticleContent || {},
      type: "",
      MenuData: menuData,
      footerSettingData: footerSettingData,
      site_host: host,
    },
  };
}

const Article = (props: any) => {
  const { pageProps = {}, authState = {}, instances = {} } = props;
  const {
    pageData = null,
    route = {},
    MenuData = [],
    footerSettingData = {},
    site_host,
  } = pageProps;
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  usePageImpression(pageData, inView, instances, SNOWPLOW.CONTENT_TYPE.ARTICLE, route, site_host);

  return (
    <Box ref={ref}>
      {pageData ? (
        <>
          <PageHead
            pageData={{
              ...pageData,
              settings: {
                ...pageData.settings,
                socialog_title: pageData.title,
              },
            }}
            favIcon={footerSettingData?.fav_icon}
          />
          <HeaderFooterLayout
            {...props}
            route={route}
            MenuData={MenuData}
            authState={authState}
            isCartIconEnable={true}
            footerSettingData={footerSettingData}
            prelemBaseEndpoint={prelemBaseEndpoint}>
            <ArticleComponent
              pageData={pageData}
              secondaryArgs={{
                prelemBaseEndpoint,
                ...snowplowSchemaUrl(),
                gcpUrl: publicRuntimeConfig.NEXT_GCP_URL,
                bucketName: publicRuntimeConfig.NEXT_BUCKET_NAME,
              }}
            />
          </HeaderFooterLayout>
        </>
      ) : null}
    </Box>
  );
};

export default Article;
