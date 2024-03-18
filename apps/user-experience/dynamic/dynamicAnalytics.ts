import Analytics from "analytics";
import getConfig from "next/config";
import snowplowPlugin from "@analytics/snowplow";
import googleAnalytics from "@analytics/google-analytics";
import googleTagManager from "@analytics/google-tag-manager";
import { SNOWPLOW } from "../constants/CommonConstants";

const { publicRuntimeConfig } = getConfig();

export const analyticsInstance = () => {
  const analytics = Analytics({
    app: "publish-app",
    debug: true,
    plugins: [
      googleTagManager({
        containerId: "GTM-TLTP6NV",
      }),
      googleAnalytics({
        measurementIds: [publicRuntimeConfig?.NEXT_GA_ID],
      }),
      // Minimal recommended configuration
      snowplowPlugin({
        name: SNOWPLOW.SNOWPLOW,
        collectorUrl: publicRuntimeConfig.NEXT_SNOWPLOW_COLLECTOR_URL,
        trackerSettings: {
          appId: publicRuntimeConfig.NEXT_SNOWPLOW_APP_ID,
        },
      }),
    ],
  });

  return analytics;
};
