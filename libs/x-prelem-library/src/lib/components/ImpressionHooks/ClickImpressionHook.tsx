import { createClickImpression, snowplowPrelemClickImpression } from "./helper";
import { IMPRESSIONS } from "./constants";
import usePlatformAnalytics from "../../hooks/usePlatformxAnalytics/index";
import { Analytics, PrelemBaseEndpoint, SecondaryArgs } from "@platformx/utilities";

export const useClickImpression = () => {
  const [handleTrack] = usePlatformAnalytics();
  const triggerClickAnalytics = (
    url: string,
    index: number,
    analytics: Analytics,
    secondaryArgs: SecondaryArgs,
    contentTitle?: string,
    contentType?: string,
  ) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        prelemSlotNumber: index + 1,
        contentType: contentType,
        contentTitle: contentTitle,
        contentUrl: url,
      };
      const cardClickAnalyticsObj = createClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        {},
        cardClickObj,
      );
      const cardClickSnowplowObj = snowplowPrelemClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        {},
        cardClickObj,
      );
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, cardClickAnalyticsObj);
      handleTrack(IMPRESSIONS?.TRACKID, cardClickSnowplowObj);
    }
  };

  const triggerClickAnalyticsForContentType = (
    analytics: Analytics,
    secondaryArgs: SecondaryArgsForContent,
  ) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const buttonClickImpressionObj = createClickImpression(
        analytics,
        IMPRESSIONS.Button,
        secondaryArgs,
        {},
        {},
      );
      const cardClickSnowplowObj = snowplowPrelemClickImpression(
        analytics,
        IMPRESSIONS.Button,
        secondaryArgs,
        {},
        {},
      );
      handleTrack(IMPRESSIONS?.TRACKID, cardClickSnowplowObj);
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, buttonClickImpressionObj);
    }
  };
  return { triggerClickAnalytics, triggerClickAnalyticsForContentType };
};
interface SecondaryArgsForContent {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  gcpUrl: string;
  bucketName: string;
}
