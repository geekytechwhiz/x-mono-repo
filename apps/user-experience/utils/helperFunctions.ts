import axios from "axios";
import { init as initApm } from "@elastic/apm-rum";
import {
  getNextApiUrl,
  sendBaseUrl,
  sendBlogUrl,
  trimmedBaseUrl,
} from "../services/config/request";
import getConfig from "next/config";
import { MESSAGE_API_ERROR } from "../constants/CommonConstants";
import { showToastError } from "../components/toastNotification/ToastNotification";
import { getHeaderFooterData } from "./helperInitialData";

const { publicRuntimeConfig = {} } = getConfig() || {};

export const handleError = (err) => {
  console.error("API Error", err.config.url, err.message);
  showToastError(err.message);
};

export const getRequestWithHost = (url, host) => {
  return axios
    .get(url, {
      headers: {
        site_host: host,
      },
    })
    .catch((err) => handleError(err));
};

export function contentReader(documentItem: string, content: Object) {
  return content[documentItem];
}
const getHostName = (host) => {
  return host.includes("localhost") ? publicRuntimeConfig.NEXT_SITE_HOST : host;
};

export const fetchMenuModel = (langCode, host) => {
  const hostName = getHostName(host);
  return getRequestWithHost(
    `${publicRuntimeConfig.NEXT_CLUSTER_API_URL}api/v1/web/${langCode}/delivery/menu-model`,
    hostName,
  );
};

export const fetchContent = (contentType, pageName, langCode, host) => {
  const hostName = getHostName(host);
  return getRequestWithHost(
    `${publicRuntimeConfig.NEXT_CLUSTER_API_URL}api/v1/web/${langCode}/delivery/${contentType}-model?pagePath=${pageName}`,
    hostName,
  );
};

export const getGeolocationData = async () => {
  try {
    const response = await axios.get(
      `${publicRuntimeConfig.NEXT_GEOLOCATION_API_URL}?apiKey=${publicRuntimeConfig.NEXT_GEOLOCATION_API_KEY}`,
    );
    const { state_prov, city, country_name, country_code2, zipcode } = response.data;
    return {
      state: state_prov,
      city,
      country: country_name,
      countryCode: country_code2,
      zipCode: zipcode,
    };
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return null;
  }
};

export const isValidPayload = (payload) => {
  // Return true if valid, false otherwise
  return payload && payload.visitorId !== undefined && payload.visitorId !== null;
};

export const getDeviceType = () => {
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 768) {
    return "Mobile";
  } else if (viewportWidth < 1024) {
    return "Tablet";
  } else {
    return "Desktop";
  }
};

export const getBrowser = () => {
  // Check if window and navigator are available (client-side)
  if (typeof window !== "undefined" && navigator.userAgent) {
    const { userAgent } = navigator;

    if ((userAgent.indexOf("Opera") || userAgent.indexOf("OPR")) !== -1) {
      return "Opera";
    } else if (userAgent.indexOf("Edg") !== -1) {
      return "Edge";
    } else if (userAgent.indexOf("Chrome") !== -1) {
      return "Chrome";
    } else if (userAgent.indexOf("Safari") !== -1) {
      return "Safari";
    } else if (userAgent.indexOf("Firefox") !== -1) {
      return "Firefox";
    } else if (userAgent.indexOf("MSIE") !== -1) {
      // IF IE > 10
      return "IE";
    } else {
      return "unknown";
    }
  } else {
    return "unknown";
  }
};

export const createVisitorPayload = (geolocationData, pageData) => {
  const { state, city, country, countryCode, zipCode } = geolocationData;
  const { userAgent } = navigator;
  //userId in userInfo
  const userInfo = localStorage.getItem("userLoginDetails");
  //userId in localStorage
  const storedUserId = localStorage.getItem("userId");
  //VisitorID in localStorage
  const storedVisitorId = localStorage.getItem("VisitorID");
  const payload = {
    isNewVisitor: false,
    visitorId: storedUserId || storedVisitorId || "AnonymousVisitorID",
    deviceId: "AnonymousDeviceID",
    pagePublishedId: 0,
    visitorAttributes: [
      {
        name: "Browser",
        value: getBrowser(),
        updateOperator: 0,
      },
      {
        name: "env",
        value: "Dev",
        updateOperator: 0,
      },
      {
        name: "userName",
        value: userInfo ? JSON.parse(userInfo)?.data?.name : "NA",
        updateOperator: 0,
      },
      {
        name: "emailId",
        value: userInfo ? JSON.parse(userInfo)?.data?.email_id : "NA",
        updateOperator: 0,
      },
      {
        name: "userId",
        value: userInfo ? JSON.parse(userInfo)?.data?.user_id : "NA",
        updateOperator: 0,
      },
      {
        name: "mobileNumber",
        value: "NA",
        updateOperator: 0,
      },
      {
        name: "gender",
        value: userInfo ? JSON.parse(userInfo)?.data?.gender : "NA",
        updateOperator: 0,
      },
      {
        name: "geoCountry",
        value: country,
        updateOperator: 0,
      },
      {
        name: "geoCountryCode",
        value: countryCode,
        updateOperator: 0,
      },
      {
        name: "geoRegion",
        value: state,
        updateOperator: 0,
      },
      {
        name: "geoCity",
        value: city,
        updateOperator: 0,
      },
      {
        name: "geoZipcode",
        value: zipCode,
        updateOperator: 0,
      },
      {
        name: "pageUrl",
        value: pageData?.PageSettings?.PageURL,
        updateOperator: 0,
      },
      {
        name: "pageTitle",
        value: pageData?.Title,
        updateOperator: 0,
      },
      {
        name: "userAgent",
        value: userAgent,
        updateOperator: 0,
      },
      {
        name: "deviceType",
        value: getDeviceType(),
        updateOperator: 0,
      },
    ],
    pageReferrer: pageData?.PageSettings?.PageURL,
    requestURL: pageData?.PageSettings?.PageURL,
    clientId: publicRuntimeConfig?.NEXT_RPI_CLIENT_ID,
    geolocation: {
      longitude: "NA",
      latitude: "NA",
      searchString: "NA",
    },
    interactionTracking: {
      channelExecutionId: 0,
      rpContactId: "NA",
    },
    viewName: publicRuntimeConfig?.NEXT_RPI_VIEW_NAME,
    trackingMode: 0,
  };
  return payload;
};

export const fetchOfferName = (VisitorID) => {
  // Define the Redpoint API endpoint and the headers
  const apiUrl = `https://rpi-server-1.hcl-x.com/interactionrealtimeapi/api/SmartAssets/${publicRuntimeConfig?.NEXT_RPI_CLIENT_ID}/Results`;
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestData = {
    Identity: {
      VisitorID: VisitorID,
    },
    AssetLookups: [
      {
        PublishID: publicRuntimeConfig?.NEXT_RPI_PUBLISH_ID,
      },
    ],
  };

  // Send the POST request and return the Axios promise
  return axios
    .post(apiUrl, requestData, { headers })
    .then((response) => {
      localStorage.setItem(
        "OfferName",
        JSON.stringify({ data: response?.data?.Results[0]?.ResultContent }) || "",
      );
      return response.data; // Return the API response
    })
    .catch((error) => {
      console.error("Error fetching offer name:", error);
      return Promise.reject(error); // Return a rejected Promise with the error
    });
};
export const createNewVisitor = (eventData) => {
  // Define the Redpoint API endpoint and the headers
  const apiUrl = "https://rpi-server-1.hcl-x.com/InteractionRealtimeAPI/api/Cache/Visit";
  const headers = {
    accept: "application/json",
    RPIAuthKey: publicRuntimeConfig?.NEXT_RPI_AUTH_KEY,
    "Content-Type": "application/json",
  };

  // Send the POST request and return the Axios promise
  return axios
    .post(apiUrl, eventData, { headers })
    .then((response) => {
      localStorage.setItem("VisitorID", response?.data?.VisitorID);
      fetchOfferName(response?.data?.VisitorID);
      return response.data; // Return the API response
    })
    .catch((error) => {
      console.error("Error sending Visitor Profile:", error);
      throw error; // Rethrow the error to be handled where the function is called
    });
};

export const sendVisitorData = async (pageData) => {
  const geolocationData = await getGeolocationData();
  if (geolocationData !== null) {
    const payload = createVisitorPayload(geolocationData, pageData);
    // Check if the payload is valid before calling createNewVisitor
    if (isValidPayload(payload)) {
      createNewVisitor(payload);
    }
  }
};

export const convertLowerCase = (key: any = null) => {
  return key ? ("" + key).toLowerCase() : "";
};

export const nullToString = (str: any = null) => {
  if (str) {
    return typeof str === "string" ? str : "";
  }
  return "";
};

export const nullToObject = (obj: any = {}) => {
  if (obj) {
    return typeof obj === "object" ? obj : {};
  }
  return {};
};

export const nullToArray = (arr: any = null) => {
  if (arr) {
    return Array.isArray(arr) ? arr : [];
  }
  return [];
};

/**
 * @param stringData string
 * @param numberHide number
 * @returns return optimized value
 */
export const stringShort = (stringData = "", numberHide = 0) => {
  if (stringData) {
    return ("" + stringData).length > numberHide
      ? stringData.substring(0, numberHide).concat("...")
      : stringData;
  }
  return "";
};

export async function postData(url = "", data = {}, site_host = "") {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...(site_host && { site_host: site_host }),
      },
    });

    return response;
  } catch (error: any) {
    showToastError(MESSAGE_API_ERROR);
    return error?.response?.data;
  }
}

export async function getData(url = "") {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    showToastError(MESSAGE_API_ERROR);
    throw error;
  }
}

export const postRequest = async (url, payload = {}) => {
  try {
    const res = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      withCredentials: true,
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401) {
      //handleLogout()
    }
    return err;
  }
};

export const getRequest = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      withCredentials: true,
    });
    return res?.data?.result ? res?.data?.result : res?.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const triggerAPM = () => {
  initApm({
    active: publicRuntimeConfig?.NEXT_ELASTIC_APM_TRACING,
    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    serviceName: "hep-user-experience-ui",
    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: publicRuntimeConfig?.NEXT_ELASTIC_APM_SERVER_URL,
    // Set service version (required for sourcemap feature)
    serviceVersion: "1.0",
    //The environment where the service being monitored is deployed (e.g. "production", "development")
    environment: publicRuntimeConfig?.NEXT_ELASTIC_APM_ENVIRONMENT,
    logLevel: "debug",
  });
};

export const objOthersHandle = (pageData: any = {}) => {
  if (pageData?.Others && typeof pageData.Others === "string") {
    return JSON.parse(pageData.Others);
  }
  return {};
};

export const defaultSocialImage =
  "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/f425d35c-9825-4ba2-9a2c-0be82dd2efbe/content";

/**
 * api end point create
 */
export const getDomainUrl = (host) => {
  return `http://${host}/`;
};

export const prelemBaseEndpointObj = (host) => {
  return {
    APIEndPoint: sendBaseUrl(),
    PublishEndPoint: getDomainUrl(host),
    buttonBaseUrl: getDomainUrl(host),
    deliveryEndPoint: trimmedBaseUrl(),
    usersEndPoint: getNextApiUrl(),
    blogEndPoint: sendBlogUrl(),
    loyaltyEndPoint: publicRuntimeConfig?.NEXT_LOYALTY_END_POINT,
    loyaltyPortalEndPoint: publicRuntimeConfig?.NEXT_LOYALTY_PORTAL_END_POINT,
  };
};

export const snowplowSchemaUrl = () => {
  return {
    pageImpressionSchema: publicRuntimeConfig?.NEXT_PAGE_IMPRESSIONS_SCHEMA,
    prelemImpressionSchema: publicRuntimeConfig?.NEXT_SNOWPLOW_PRELEM_IMPRESSIONS,
    clickImpressionSchema: publicRuntimeConfig?.NEXT_SNOWPLOW_CLICK_IMPRESSIONS,
    userRegisterImpressionSchema: publicRuntimeConfig?.NEXT_SNOWPLOW_REGISTER_USER_IMPRESSIONS,
    environment: publicRuntimeConfig?.NEXT_ELASTIC_APM_ENVIRONMENT,
  };
};

export const navigateToHome = (locale: string) => {
  return {
    redirect: {
      permanent: false,
      destination: `/${locale}`,
    },
  };
};

export const verifyLogin = async (platxCookie) => {
  const res = await axios
    .get(`${publicRuntimeConfig?.NEXT_SESSION_VERIFY}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: platxCookie,
      },
      withCredentials: true,
    })
    .catch((err) => {
      handleError(err);
    });
  return res;
};

export const createSession = async (req, payload: any) => {
  const res = await axios
    .post(`${publicRuntimeConfig?.NEXT_SESSION}`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        // "set-cookie": [req.headers.cookie],
      },
    })
    .catch((err) => {
      handleError(err);
      return err;
    });
  return res;
};

export const redirectUrl = () => {
  const url = window.location.href;
  if (url.indexOf("?") !== -1) {
    const redirectUri = url.slice(0, url.indexOf("?"));
    return redirectUri;
  } else {
    return url;
  }
};

export const putRestApiCall = (url: string, payload: any, locale?: string, site_host?: string) => {
  try {
    return axios.put(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        ...(site_host && { site_host: site_host }),
        Locale: locale === "en" ? `${locale}` : `${locale}_${locale}`,
      },
      withCredentials: true,
    });
  } catch (err: any) {
    return err?.response;
  }
};

export const navigateTo = (nextRouter, path) => {
  nextRouter.push(path);
};

export const locationApiCallService = async () => {
  const res = await axios.get(
    `${publicRuntimeConfig.NEXT_GEOLOCATION_API_URL}?apiKey=${publicRuntimeConfig.NEXT_GEOLOCATION_API_KEY}`,
  );
  const { data: locationData = {} }: any = res;
  return locationData || {};
};

export const fetchContentProfileDetails = (contentType, pageName, host) => {
  const hostName = getHostName(host);
  // const hostName = "du.hcl-x.com";
  const data = JSON.stringify({
    query: `query{fetchSchemaContent(contentType:${JSON.stringify(
      contentType,
    )},pagePath:${JSON.stringify(pageName)})}`,
    variables: {},
  });

  try {
    return axios.post(publicRuntimeConfig?.NEXT_DELIVERY_ENGINE, data, {
      headers: {
        site_host: hostName,
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    handleError(err);
    return err?.response;
  }
};

export const getServerSidePropsMethodForCourseAndXO = async (context) => {
  const { query = {}, locale = "", resolvedUrl = "", req, res } = context;

  const { id = "" } = query;
  const host = req.headers.host || "";

  res.setHeader("site_host", host);
  res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");

  const [menuData, footerSettingData] = await getHeaderFooterData(locale || "en", host);

  return {
    props: {
      pageData: {},
      type: "",
      MenuData: menuData,
      footerSettingData: footerSettingData,
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl, host },
      site_host: host,
    },
  };
};
