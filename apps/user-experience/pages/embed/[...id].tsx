import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { getEmbedResponse } from "../../utils/helperEmbed";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import usePlatformAnalytics from "platform-x-prelems/prelems/analytics";
import EmbededCardComponent from "../../components/Embeded/EmbededCard";
import {
  nullToObject,
  prelemBaseEndpointObj,
  snowplowSchemaUrl,
} from "../../utils/helperFunctions";

export async function getServerSideProps(context) {
  const { query = {}, locale = "", req } = context;
  const host = req.headers.host || "";

  const { id = [] } = query;
  const response = await getEmbedResponse(id[0] || "", id[1] || "", locale || "en", host);

  return {
    props: {
      route: { ...query, locale: locale, query: id[1] },
      pageData: response || {},
      type: "",
      site_host: host,
    },
  };
}

const Embed = (props: any) => {
  const { pageProps = {}, instances = {} } = props;
  const { pageData = {}, route, site_host } = pageProps;
  const [, handlePage] = usePlatformAnalytics();
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  useEffect(() => {
    if (
      pageData?.analytics_enable &&
      enableImpressionTracking &&
      inView &&
      Object.keys(nullToObject(instances)).length > 0
    ) {
      const impressionObj = {
        eventType: pageData?.content_type + "embed Impression",
        pageId: pageData?.page,
        pageTitle: pageData?.title,
        AuthorName: pageData?.page_createdby,
        pageTags: pageData?.tags?.join(", "),
        PageUrl: pageData?.settings?.socialog_url,
        pageDesc: pageData?.settings?.socialog_description,
        contentType: pageData?.content_type + " embed",
      };

      handlePage(impressionObj?.eventType, impressionObj);
      setEnableImpressionTracking(false);
    }
  }, [inView, instances]);

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        <EmbededCardComponent
          pageData={pageData}
          secondaryArgs={{ prelemBaseEndpoint, ...snowplowSchemaUrl() }}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default Embed;
