import getConfig from "next/config";
import { SNOWPLOW } from "../../../constants/CommonConstants";
import { locationApiCallService, postPageImpressionEvent } from "../../../utils/helperFunctions";
import usePlatformAnalytics from "platform-x-prelems/prelems/analytics";

const { publicRuntimeConfig = {} } = getConfig() || {};

export const useSnowplowTracking = () => {
  const [handleTrack, , handlePage] = usePlatformAnalytics();

  const noValueFormatData = (value = "") => {
    return value ? value : SNOWPLOW.NA;
  };

  const localeFullText = (locale) => {
    switch (locale) {
      case "en":
        return SNOWPLOW.ENGLISH;
      case "de":
        return SNOWPLOW.GERMAN;
      case "fr":
        return SNOWPLOW.FRENCH;
      default:
        return SNOWPLOW.NA;
    }
  };

  const getUserDetails = (key) => {
    const userLoginDetails = localStorage.getItem("userLoginDetails");
    if (userLoginDetails) {
      const useDeatils = JSON.parse(userLoginDetails);
      return useDeatils?.data?.[key] || SNOWPLOW.NA;
    }
    return SNOWPLOW.NA;
  };

  const pageImpressionsObject = async (
    pageData: any = {},
    contentType = "",
    locale = "",
    instances: any = {},
    site_host = "",
  ) => {
    // eslint-disable-next-line no-console
    console.log(instances, "instances");

    const gtmObj = {
      pageId: noValueFormatData(pageData?.Page),
      pageTitle: noValueFormatData(pageData?.Title),
      eventType: SNOWPLOW.IMPRESSIONTYPE,
      pageDesc: noValueFormatData(pageData?.PageSettings?.PageDescription),
      pageTags: noValueFormatData(pageData?.PageSettings?.PageTags?.join(", ")),
      AuthorName: noValueFormatData(pageData?.Page_createdby),
      PageUrl: noValueFormatData(pageData?.PageSettings?.PageURL),
      contentType: noValueFormatData(contentType),
    };
    let locationData: any = {};
    try {
      locationData = (await locationApiCallService()) || {};
    } catch (error) {
      locationData = {};
    }
    const snowplowObj = {
      schema: publicRuntimeConfig.NEXT_PAGE_IMPRESSIONS_SCHEMA,
      data: {
        ...gtmObj,
        value: pageData?.Page,
        category: `${SNOWPLOW.SNOWPLOW} - ${pageData?.Page}`,
        label: SNOWPLOW.SNOWPLOWLABEL,
        pageVisitContinent: noValueFormatData(locationData?.continent_name),
        pageVisitCountry: noValueFormatData(locationData?.country_name),
        pageVisitState: noValueFormatData(locationData?.state_prov),
        pageVisitCity: noValueFormatData(locationData?.city),
        userIp: noValueFormatData(locationData?.ip),
        userIsRegistered: localStorage.getItem("userId") ? "Yes" : "No",
        pageLanguage: noValueFormatData(localeFullText(locale)),
        age: SNOWPLOW.NA,
        gender: getUserDetails("gender"),
        email: getUserDetails("email_id"),
        siteName: noValueFormatData(site_host),
        environment: noValueFormatData(publicRuntimeConfig.NEXT_ELASTIC_APM_ENVIRONMENT),
      },
    };
    handleTrack(SNOWPLOW.TRACKID, snowplowObj);
    handlePage(gtmObj?.eventType, gtmObj);
    postPageImpressionEvent(pageData, "Page");
  };

  /**
   * user register schema
   * @param emailID string
   */
  const userRegisterImpression = (emailID, site_host = "") => {
    const snowplowRegisterObj = {
      schema: publicRuntimeConfig.NEXT_SNOWPLOW_REGISTER_USER_IMPRESSIONS,
      data: {
        eventType: SNOWPLOW.NA,
        age: SNOWPLOW.NA,
        userId: emailID,
        gender: SNOWPLOW.NA,
        registrationMode: SNOWPLOW.NA,
        registrationFrom: "rendering",
        continent: SNOWPLOW.NA,
        country: SNOWPLOW.NA,
        state: SNOWPLOW.NA,
        city: SNOWPLOW.NA,
        siteName: noValueFormatData(site_host),
        environment: noValueFormatData(publicRuntimeConfig.NEXT_ELASTIC_APM_ENVIRONMENT),
      },
    };
    handleTrack(SNOWPLOW.TRACKID, snowplowRegisterObj);
  };
  return { pageImpressionsObject, userRegisterImpression };
};
