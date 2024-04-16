/* eslint-disable no-console */
import axios from "axios";
import {
  getRestApiCall,
  getSelectedSite,
  getSubDomain,
  nullToObject,
  postRestApiCall,
} from "./helperFns";
import { LOGOUT_URL } from "../constants/AuthConstant";

export const hasOwnProp = (obj: object, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const getStyleString = (styles: any) =>
  Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value}`)
    .join("; ");

/**
 * courseId based get course fill details
 * post call
 */
export const getCourseDetailsApiCall = (courseId: string, secondaryArgs: any) => {
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    secondaryArgs;
  return getRestApiCall(
    `${deliveryEndPoint}api/v1/web/en/delivery/course-model?path=${courseId}`,
    language,
    sitename,
  );
  // return getRestApiCall(
  //   `https://marvericks.delivery.hcl-x.com/platform-x/api/v1/web/en/delivery/course-model?path=108058619401306`
  // );
};

/**
 * courseId based get course fill details
 * post call
 */
export const getLearningListApiCall = (ele: any) => {
  const { secondaryArgs = {}, userId = "" } = nullToObject(ele);
  const {
    prelemBaseEndpoint: {
      // deliveryEndPoint = "https://dev.users.hcl-x.com/platform-x/user-service/",
      usersEndPoint = "",
      language = "en",
    } = {},
    sitename,
  } = nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `query{getuserCourses(user_id:${JSON.stringify(userId)})}`,
    variables: {},
  });

  return postRestApiCall(`${usersEndPoint}user-service/`, data, language, sitename);
};

/**
 * courseId based get course fill details
 * post call
 */
export const getDynamicContentListApiCall = async (ele: any) => {
  const { secondaryArgs = {}, start, numberOfRows, params } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);
  const localStorageData = localStorage.getItem("OfferName");
  const cdpfilter = localStorageData ? JSON.parse(localStorageData).data : [];
  // Define the deliveryEndPoint based on the condition
  const { tags = [], filter = "ALL", searchTerm = "" } = params;
  const obj: String = `{pagination:{start:${start},rows:${numberOfRows}},searchTerm:${JSON.stringify(
    searchTerm,
  )},tags:${JSON.stringify(tags)},cdpFilter:${JSON.stringify(
    cdpfilter,
  )},filter:${filter},isSuggestive:false}`;
  const { data: { data: { fetchEcomProducts = [] } = {} } = {} } = await getRestApiCall(
    `${deliveryEndPoint}api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`,
    // `https://dev.delivery.hcl-x.com/platform-x/api/v1/web/en/delivery/getEcomProducts?queryParam=${obj}`,
    language,
    sitename,
  );
  return fetchEcomProducts;
};

/**
 * user details update api call
 */
export const updateUserFormDetailsService = (ele: any) => {
  const { secondaryArgs = {}, userDetails = {} } = nullToObject(ele);
  const { prelemBaseEndpoint: { usersEndPoint = "", language = "en", PublishEndPoint = "" } = {} } =
    nullToObject(secondaryArgs);
  const data = {
    input: {
      email: userDetails.emailAddress,
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      phone: userDetails.phoneNumber,
      company_name: userDetails.companyName,
      country: userDetails.country,
      message: userDetails.message,
    },
  };
  return postRestApiCall(`${usersEndPoint}contact_us/save`, data, language, PublishEndPoint);
};

export const getFirstTwoletters = (title: string) => {
  if (!title) return "";
  const words = title.trim().split(" ");
  if (words.length === 1) return words[0].substring(0, 2);
  return words[0].charAt(0) + words[words.length - 1].charAt(0);
};

export const openPageInNewTab = (url: string) => {
  if (window && url) {
    const infoUrl = window?.open(url, "_blank");
    if (infoUrl) {
      infoUrl.focus();
    }
  }
};

export const formatPageUrl = (url) => {
  let tmp = url?.toLowerCase();
  tmp = tmp.replace(/\s/g, "");
  tmp = tmp.replace(/[^a-z0-9\- ]/gi, "");
  return tmp;
};

export const formatAddPrelem = (item) => {
  return {
    PrelemId: item.PrelemId, // Unique Name
    PrelemName: item.PrelemName,
    SeoEnabled: item.SeoEnabled,
    AnalyticsEnabled: item.AnalyticsEnabled,
    InstanceId: "pr_cont1",
    DocumentPath: item.DocumentPath,
    DocumentCreationPath: item.DocumentCreationPath,
    DocumentType: item.DocumentType,
    IsHidden: false,
    IsModified: false,
    StructuredData: "",
  };
};

const handleLogout = () => {
  const keycloakURL = LOGOUT_URL;
  localStorage.removeItem("userSession");
  localStorage.removeItem("selectedSite");
  localStorage.removeItem("imageUuid");
  localStorage.removeItem("videoUuid");
  window.location.replace(keycloakURL);
};

export const getRequestFromDelivery = async (url) => {
  try {
    const res = await axios.get(process.env.NX_DELIVERY_URI + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
      withCredentials: true,
    });
    return res?.data?.result ? res?.data?.result : res?.data;
  } catch (err: any) {
    if (err?.response?.data?.code === 401 && !url.includes("verify")) {
      handleLogout();
    }
    return err;
  }
};
