import usePlatformAnalytics from "../../hooks/usePlatformxAnalytics/index";
import { IMPRESSIONS } from "./constants";

export const usePlaceOrderImpression = () => {
  const [handleTrack] = usePlatformAnalytics();

  const placeOrderImpression = (secondaryArgs: secondaryArgsObj, OrderInfo: any) => {
    const placeOrderImpressionObject = {
      schema: secondaryArgs?.placeOrderImpressionSchema,
      data: {
        eventType: IMPRESSIONS.PLACE_ORDER,
        createdAt: new Date().toLocaleDateString("en-GB") || IMPRESSIONS.NA,
        ...OrderInfo,
        siteName: secondaryArgs?.sitename || IMPRESSIONS.NA,
        environment: secondaryArgs?.environment || IMPRESSIONS.NA,
      },
    };
    handleTrack(IMPRESSIONS?.TRACKID, placeOrderImpressionObject);
  };
  return { placeOrderImpression };
};

interface secondaryArgsObj {
  prelemImpressionSchema?: string;
  clickImpressionSchema?: string;
  placeOrderImpressionSchema?: string;
  sitename?: string;
  environment?: string;
  rpiUrl?: string;
  rpiClientID?: string;
  rpiAuthKey?: string;
  rpiPublishID?: string;
  rpiViewName?: string;
}
