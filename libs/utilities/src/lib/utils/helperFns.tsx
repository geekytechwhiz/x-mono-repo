/* eslint-disable default-param-last */
import axios from "axios";
import { format } from "date-fns";
import getConfig from "next/config";
import FallBackImage from "../assets/images/fallBackImage.png";
import { DE_FLAG, EN_FLAG, FR_FLAG } from "../assets/pngIcons";
import ToastService from "../components/ToastContainer/ToastService";
import { ShowToastError } from "../components/ToastNotification/ToastNotification";
import { AUTH_INFO } from "../constants/AuthConstant";
import { CONTENT_TYPE_WITH_ABSOLUTEURL, DefaultLocale } from "../constants/CommonConstants";
import {
  CONTENT_ICON,
  LanguageList,
  MESSAGE_API_ERROR,
  countries,
  defaultImages,
} from "./helperConstants";
import { breakpoints } from "../components/ConstantData";
import feyenoord from "../themes/prelems/Feyenoord/index";
import fifa from "../themes/prelems/Fifa/index";
import { Content, SecondaryArgs } from "./interface";
import { Props } from "./types";
//import hockeyAustralia from "../themes/prelems/HockeyAustralia/index";
import light from "../themes/prelems/LightTheme/index";

const { publicRuntimeConfig = {} } = getConfig() || {};

export const siteLevelSchema = {
  siteName: "X",
  siteURL: "https://platform-x.com",
  siteDescription: "Lorem Ipsum is simply dummy text of the printing",
  siteImage:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fuicookies.com%2Ffree-html-contact-forms%2F&psig=AOvVaw2eVA8o8PsBkQZBaD49Qxf7&ust=1646374746446000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIC60qamqfYCFQAAAAAdAAAAABAO",
  facebookAppId: "Platform-X",
  twitterAppId: "Platform-X",
};

export const ThemeConstantForPrelemThemeBasedOnSite = () => {
  let ThemeConstant = light;
  const siteName = process.env.NX_SITE_BASED_THEME || "";
  const site_array = siteName.split(",");
  const currentSiteName = getSelectedSite();
  if (site_array[0] === currentSiteName) {
    ThemeConstant = fifa;
  } else if (site_array[1] === currentSiteName) {
    ThemeConstant = feyenoord;
    // } else if (site_array[2] === currentSiteName) {
    //   ThemeConstant = hockeyAustralia;
  } else {
    ThemeConstant = light;
  }
  return ThemeConstant;
};

export const createImageURL = (imageUrl, imageExt = "png") => {
  const gcpUrl = process.env.NX_GCP_URL;
  const bucketName = process.env.NX_BUCKET_NAME;
  return `${gcpUrl}/${bucketName}/${imageUrl}.${imageExt}`;
};

const errorRequest =
  "We have not been able to complete the requested action. Please try again later";
const headerData = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-cache",
};

/**
 * getCall
 * @param url string
 * @returns object
 */
export const getRestApiCall = (url: string, locale?: string, sitename?: string) => {
  try {
    return axios.get(url, {
      headers: {
        ...headerData,
        Locale: locale === "en" ? `${locale}` : `${locale}_${locale}`,
        ...(sitename && { sitename: sitename }),
      },
    });
  } catch (err: any) {
    // const { } = err.response;
    ToastService.failToast(errorRequest);
    return err?.response;
  }
};

/**
 * postCall
 * @param url string
 * @param payload object
 * @returns object
 */
export const postRestApiCall = (url: string, payload: any, locale?: string, site_host?: string) => {
  try {
    return axios.post(url, payload, {
      headers: {
        ...headerData,
        ...(site_host && { site_host: site_host }),
        Locale: locale === "en" ? `${locale}` : `${locale}_${locale}`,
      },
    });
  } catch (err: any) {
    // const { } = err.response;
    ToastService.failToast(errorRequest);
    return err?.response;
  }
};

/**
 * postCall
 * @param url string
 * @param payload object
 * @returns object
 */
export const putRestApiCall = (url: string, payload: any, locale?: string, site_host?: string) => {
  try {
    return axios.put(url, payload, {
      headers: {
        ...headerData,
        ...(site_host && { site_host: site_host }),
        Locale: locale === "en" ? `${locale}` : `${locale}_${locale}`,
      },
      withCredentials: true,
    });
  } catch (err: any) {
    // const { } = err.response;
    ToastService.failToast(errorRequest);
    return err?.response;
  }
};

// export const postRequest = async (url: any, payload = {}) => {
//   try {
//     return axios.post(url, payload, {
//       headers: {
//         ...headerData,
//         ...(site_host && { site_host: site_host }),
//         Locale: locale === "en" ? `${locale}` : `${locale}_${locale}`,
//       },
//       withCredentials: true,
//     });
//   } catch (err: any) {
//     // if (err?.response?.data?.code === 401) {
//     //   handleLogout();
//     // }
//     return err;
//   }
// };

// export const getRequest = async (url: any) => {
//   try {
//     const res = await axios.get(process.env.NX_API_URI + url, {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Cache-Control": "no-cache",
//       },
//       withCredentials: true,
//     });
//     return res;
//   } catch (err: any) {
//     // if (err?.response?.data?.code === 401 && !url.includes('verify')) {
//     //   handleLogout();
//     // }
//     return err;
//   }
// };

export const completeButtonUrl = (
  actionType = "External",
  url = "https://www.hcltech.com",
  btnBaseUrl = "",
) => {
  if (actionType === "Internal") {
    const urlwidoutSlash = url.slice(1);
    return btnBaseUrl + urlwidoutSlash;
  }
  return url;
};

export const completeButtonUrl2 = (
  internal = true,
  url = "https://www.hcltech.com",
  btnBaseUrl = "",
) => {
  if (internal) {
    const urlwidoutSlash = url.slice(1);
    return btnBaseUrl + urlwidoutSlash;
  }
  return url;
};

export const handleHtmlTags = (inputString: any) => {
  if (inputString) {
    return inputString.replace(/<[^>]*(>|$)|&nbsp;/g, "");
  }
  return inputString;
};

/**
 * null | undefined to string
 */
export const nullToString = (string: any = "") => {
  return string ? string : "";
};

/**
 * null | undefined to object
 */
export const nullToObject = (obj: any = {}) => {
  return obj ? obj : {};
};
export const convertToLowerCase = (stringData: any = "") => {
  return ("" + stringData).toLowerCase();
};
/**
 * null | undefined to array
 */
export const nullToArray = (arr: any = []) => {
  return arr ? arr : [];
};
export const capitalizeFirstLetter = (str = "") => {
  if (str) {
    try {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (e) {
      return "";
    }
  }
  return "";
};

export const triggerAnalytics = ({ e, analytics, defaultObj, handleTrack = () => {} }: Props) => {
  if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
    const buttonClickObj = {
      eventType: "Button Click",
      ...defaultObj,
      buttonURL: "",
      nameOfFileDownloaded: "",
      eventCategory: "Button Click",
      eventAction: "Click",
      eventLabel: e.currentTarget.innerText,
      eventValue: 1,
    };
    handleTrack(buttonClickObj?.eventType, buttonClickObj);
  }
};

export const debounce = (fn: any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const checkImageUrlPath = (imgUrl = "") => {
  if (imgUrl.match(/(https?:\/\/.*\.(?:png|jpg|svg|webp|gif))/i)) {
    return imgUrl;
  }
  return FallBackImage;
};

export const formCroppedUrlInCrop = (url = "", ext = "") => {
  if (url) {
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
      return url;
    }
    return `${AUTH_INFO.gcpUri}/${AUTH_INFO.gcpBucketName}/${url.replaceAll(" ", "%20")}.${ext}`;
  }
  return FallBackImage;
};
type CroppedURL = {
  src: string;
};
export const formCroppedUrlString = (
  gcpUrl = "",
  bucketName = "",
  url = "",
  ext = "",
  contentType = "",
  bannerType = "",
): CroppedURL => {
  if (CONTENT_TYPE_WITH_ABSOLUTEURL.includes(contentType)) {
    return { src: url };
  } else {
    if (url && ext) {
      if (bannerType !== "") {
        return {
          src: checkImageUrlPathString(`${gcpUrl}/${bucketName}/${url}-${bannerType}.${ext}`),
        };
      } else {
        return { src: checkImageUrlPathString(`${gcpUrl}/${bucketName}/${url}.${ext}`) };
      }
    }
  }
  return { src: "" }; // Return an empty string URL if conditions are not met
};

export const formCroppedUrl = (
  gcpUrl = "",
  bucketName = "",
  url = "",
  ext = "",
  contentType = "",
  bannerType = "",
) => {
  if (CONTENT_TYPE_WITH_ABSOLUTEURL.includes(contentType)) {
    return url;
  } else {
    if (url && ext) {
      if (bannerType !== "") {
        return checkImageUrlPath(`${gcpUrl}/${bucketName}/${url}-${bannerType}.${ext}`);
      } else {
        return checkImageUrlPath(`${gcpUrl}/${bucketName}/${url}.${ext}`);
      }
    }
    return FallBackImage;
  }
  // if (CONTENT_TYPE_WITH_ABSOLUTEURL.includes(contentType)) return url;
  // else if (bannerType !== "")
  //   return `${gcpUrl}/${bucketName}/${url}-${bannerType}.${ext}`;
  // else return `${gcpUrl}/${bucketName}/${url}.${ext}`;
};
// export const checkImageUrlPathString: string = (imgUrl) => {
//   if (imgUrl.match(/(https?:\/\/.*\.(?:png|jpg|svg|webp|gif))/i)) {
//     return imgUrl; // Return the URL as a string
//   }
//   return FallBackImage as string; // Assuming FallBackImage is a string URL
// };
export const checkImageUrlPathString: (imgUrl: string) => string = (imgUrl) => {
  const imagePath: string = "";
  if (imgUrl.match(/(https?:\/\/.*\.(?:png|jpg|svg|webp|gif))/i)) {
    return imgUrl; // Return the URL as a string
  }
  return imagePath; // Assuming FallBackImage is a string URL
};

// export const relativeImageURL = (
//   gcpUrl: string,
//   bucketName: string,
//   url: string,
//   ext: string
// ) => {
//   return url && ext ? `${gcpUrl}/${bucketName}/${url}.${ext}` : FallBackImage;
// };

export const relativeImageURL = (url: string) => {
  const gcpUrl = process.env.NX_GCP_URL;
  const bucketName = process.env.NX_BUCKET_NAME;
  if (url?.includes("dam")) {
    // this if condition will be removed after relative img for all content type
    return url;
  }
  return url ? `${gcpUrl}/${bucketName}/${url}` : "";
};

export const getLandingPageURL = (endPoint: any, language: any, contentType: string, id: any) => {
  return `${endPoint}${language}/${contentType.toLocaleLowerCase()}/${id}`;
};

export const getLandingPageURLwithoutSlash = (
  endPoint: any,
  language: any,
  contentType: string,
  id: any,
) => {
  const url = id?.startsWith("/") ? id?.substring(1) : id;
  return `${endPoint}${language}/${contentType.toLocaleLowerCase()}/${url}`;
};

export const getCourseLandingPageURL = (
  endPoint: any,
  language: any,
  contentType: string,
  id: any,
) => {
  return `${endPoint}${language}/course/course-details?courseId=${id}`;
};

//params ensPath update
export const encodeGetParams = (params: any = {}) => {
  return Object.entries(params)
    .map((key: any) =>
      key
        .map((k: any) => {
          const enCodeData = typeof k === "object" ? JSON.stringify(k) : k;
          return encodeURIComponent(enCodeData);
        })
        .join("="),
    )
    .join("&");
};

const getDefaultCroppedImage = (
  publishedImages: [],
  originalImage: any,
  defaultRatio = "landscape",
  secondaryArgs: {},
  isBackgroundImage = true,
  extension: string,
) => {
  const landscapeImg = publishedImages.find(
    ({ aspect_ratio }: any) => aspect_ratio === defaultRatio,
  );
  const { folder_path: imgUrl = "" } = landscapeImg || { folder_path: "" };
  const { gcpUrl, bucketName } = nullToObject(secondaryArgs);
  if (isBackgroundImage) {
    return `url('${gcpUrl}/${bucketName}/${imgUrl}.webp'), url('${gcpUrl}/${bucketName}/${imgUrl}.${originalImage.ext}')`;
  } else {
    if (imgUrl && extension) {
      return `${gcpUrl}/${bucketName}/${imgUrl}.${extension}`;
    } else {
      return FallBackImage;
    }
  }
};

export const fetchCroppedUrl = (
  Url: string,
  publishedImages: [],
  imgOrder = {},
  originalImage: any,
  mediaQueryValues: any,
  secondaryArgs = {},
  isBackgroundImage: boolean,
  extension: string,
) => {
  let returnUrl = "";
  if (publishedImages && publishedImages.length > 0) {
    const {
      less_than_320,
      less_than_600,
      less_than_768,
      less_than_1024,
      less_than_1280,
      less_than_1440,
    } = mediaQueryValues;
    if (less_than_320) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        originalImage,
        imgOrder?.["320"] || breakpoints["320"],
        secondaryArgs,
        isBackgroundImage,
        extension,
      );
    } else if (less_than_600) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        originalImage,
        imgOrder?.["600"] || breakpoints["600"],
        secondaryArgs,
        isBackgroundImage,
        extension,
      );
    } else if (less_than_768) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        originalImage,
        imgOrder?.["768"] || breakpoints["768"],
        secondaryArgs,
        isBackgroundImage,
        extension,
      );
    } else if (less_than_1024) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        originalImage,
        imgOrder?.["1024"] || breakpoints["1024"],
        secondaryArgs,
        isBackgroundImage,
        extension,
      );
    } else if (less_than_1280) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        originalImage,
        imgOrder?.["1280"] || breakpoints["1280"],
        secondaryArgs,
        isBackgroundImage,
        extension,
      );
    } else if (less_than_1440) {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        originalImage,
        imgOrder?.["1440"] || breakpoints["1440"],
        secondaryArgs,
        isBackgroundImage,
        extension,
      );
    } else {
      returnUrl = getDefaultCroppedImage(
        publishedImages,
        originalImage,
        imgOrder?.["1440"] || breakpoints["1440"],
        secondaryArgs,
        isBackgroundImage,
        extension,
      );
    }
  } else {
    if (Url?.search("dspace") !== -1) {
      //normal dspace url
      returnUrl = Url;
    }
  }
  return returnUrl;
};
//string to parse convert
export const uriToJSON = (jsonObj = {}) => {
  const { Button_Content: buttonContent = "" } = nullToObject(jsonObj);
  if (buttonContent && typeof buttonContent === "string") {
    if (buttonContent.includes("ContentEnCodeParse")) {
      return JSON.parse(buttonContent);
    }
    return {};
  }
  return {};
};

/**
 * string to parse convert
 * @param urijson
 * @returns object
 */
export const uriToJSONforButtonEditWindow = (urijson) => {
  if (urijson) {
    return JSON.parse(urijson);
  }
  return {};
};

export const completeExternalUrl = (str: string) => {
  let tarea = str;
  const tarea_regex = /^(http|https)/;
  if (!tarea_regex.test(String(str).toLowerCase())) {
    tarea = "https://" + str;
  }
  return tarea;
};

/**
 * last sting value is check "/"
 * @param ContentType
 * @returns string
 */

export const conCatUrlPath = (ContentType = "") => {
  if (ContentType) {
    const typeUrl =
      ContentType.charAt(ContentType.length - 1) === "/" ? `${ContentType}` : `${ContentType}/`;
    if (convertToLowerCase(typeUrl) === "vod/") {
      return "video/";
    }
    return convertToLowerCase(typeUrl);
  }
  return "";
};

export const pluralize = (value: number, word: string) => {
  return [0, 1].includes(value) ? word : `${word}s`;
};

export const structureDataUrlPoint = (content: any = {}, secondaryArgs: any = {}) => {
  const { prelemBaseEndpoint = {} } = secondaryArgs;
  const { PublishEndPoint = "", language = "" } = prelemBaseEndpoint;
  const ContentUrl = `${PublishEndPoint}${language}/`;
  const { Button_Action = "", Button_RedirectURL = "" } = content;

  if (Button_Action === "Internal") {
    let id = Button_RedirectURL;
    if (id && id.charAt(0) === "/") {
      id = id.substring(1);
    }
    return ContentUrl + id;
  } else if (Button_Action === "Content") {
    const contentObjHandle = uriToJSON(content);
    const { ContentType = "", currentPath = "" } = nullToObject(contentObjHandle);
    const isGalleryArray = ["ImageGallery", "VideoGallery", "Gallery"].some(
      (ele) => convertToLowerCase(ele) === convertToLowerCase(ContentType),
    );
    if (!isGalleryArray) {
      //backSlash remove
      const type = conCatUrlPath(ContentType);
      let id = currentPath;
      if (id && id.charAt(0) === "/") {
        id = id.substring(1);
      }
      return `${ContentUrl}${type}${id}`;
    }
    return "";
  }
  return "";
};

export const dateFormat = (dataTime: any = "") => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== "Invalid Date" && !isNaN(assign)) {
      return format(new Date(dataTime), "LLL dd, yyyy");
    }
    return dataTime;
  }
  return dataTime;
};

export const timeFormat = (dataTime: any = "") => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== "Invalid Date" && !isNaN(assign)) {
      return format(new Date(dataTime), "H:mm");
    }
    return dataTime;
  }
  return dataTime;
};

export const dateTimeFormat = (dataTime: any = "") => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== "Invalid Date" && !isNaN(assign)) {
      return format(new Date(dataTime), "LLL dd, yyyy | H:mm a");
    }
    return dataTime;
  }
  return dataTime;
};

export const dateTime12hFormat = (dataTime: any = "") => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== "Invalid Date" && !isNaN(assign)) {
      return format(new Date(dataTime), "hh:mm a, LLL dd yyyy");
    }
    return dataTime;
  }
  return dataTime;
};

/**
 * currency based symbol
 * @param currency string
 * @returns string
 */
export const currencyBasedIcon = (currency: string) => {
  if (convertToLowerCase(currency) === "usd") {
    return "$";
  } else if (convertToLowerCase(currency) === "inr") {
    return "₹";
  }
  return "";
};

/**
 * allow only number
 * @param e objet
 */
export const allowOnlyNumberInputData = (e: any) => {
  const values = e?.target?.value;
  const number = values.replace(/[^0-9]/g, "");
  e.target.value = number;
};

/**
 * allow only char
 * @param e objet
 */
export const allowOnlyShippingLetterInputData = (e: any) => {
  const values = e?.target?.value;
  const number = values.replace(/[^a-zA-z(-,.,')]/g, "");
  e.target.value = number;
};

/**
 * allow only char
 * @param e objet
 */
export const allowOnlyLetterInputData = (e: any) => {
  const values = e?.target?.value;
  const number = values.replace(/[^a-zA-z]/g, "");
  e.target.value = number;
};

/**
 *
 * @param errors object
 * @returns boolean
 */
export const inputEmptyFieldValidate = (errors = {}) => {
  let valid = true;
  Object.values(errors).forEach((ele) => {
    if (ele === "") {
      valid = false;
    }
  });
  return valid;
};

/**
 *
 * @param errors object
 * @returns boolean
 */
export const inputNonEmptyFieldValidate = (errors = {}) => {
  let valid = true;
  Object.values(errors).forEach((ele) => {
    if (ele !== "") {
      valid = false;
    }
  });
  return valid;
};

/**
 * Decimal Values
 * @param value Actual value to formate
 * @param toFixed number of decimal which we have to show after decimal value
 * @returns float
 */
export const formateNumber = (value: number, toFixedVal?: number) => {
  if (!isNaN(value)) {
    return (Math.round(value * 100) / 100).toFixed(
      !isNaN(toFixedVal as number) ? (toFixedVal as number) : 2,
    );
  }
  return value;
};

/**
 * email validate
 * @param email string
 * @returns boolean
 */
export const emailValidate = (email = "") => {
  const reg = /^\s*([\w+-]+\.)*[\w+]+@([\w+-]+\.)*([\w+-]+\.[a-zA-Z]{2,6})+\s*$/;
  if (!reg.test(email)) {
    return false;
  }
  return true;
};

export const getGridValues = (cardArr: any, index?: number) => {
  let sm = 4,
    em = 3,
    cardType = "XCard1";
  if (cardArr?.length === 1) {
    sm = 12;
    em = 12;
    cardType = "XCard3";
  } else if (cardArr?.length === 2) {
    sm = 6;
    em = 6;
    cardType = "XCard2";
  } else if (cardArr?.length === 3) {
    if (index === 0) {
      em = 6;
      sm = 12;
      cardType = "XCard2";
    } else {
      em = 3;
      sm = 6;
      cardType = "XCard1";
    }
  } else if (cardArr?.length === 4) {
    sm = 6;
    em = 3;
    cardType = "XCard1";
  }
  return { sm, em, cardType };
};
export function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getCountryFlag = (country: string) => {
  const countryObj = countries.find((item) => item.label === country);
  return `https://flagcdn.com/w20/${countryObj?.code?.toLowerCase()}.png`;
};

export const eComTypeUriToJSON = (jsonObj = {}) => {
  const { Button_Content: buttonContent = "" } = nullToObject(jsonObj);
  if (buttonContent && typeof buttonContent === "string") {
    if (buttonContent.includes("ecomEnCodeParse")) {
      return JSON.parse(buttonContent);
    }
    return {};
  }
  return {};
};

export const getCurrentLang = () => {
  let lang = "";
  const split = window?.location.pathname.split("/");

  if (LanguageList().find((x) => x.id === split[2])) {
    const [, , x] = split;
    lang = x;
  } else {
    lang = DefaultLocale;
  }
  return lang;
};

export const onBackButtonEvent = (e, unsavedChanges, setDialogOpen) => {
  e.preventDefault();
  // eslint-disable-next-line no-restricted-globals
  window.history.pushState(null, "", window.location.pathname + location?.search);
  if (unsavedChanges) {
    setDialogOpen(true);
  } else {
    return;
  }
};

export const unloadCallback = (event, unsavedChanges) => {
  event.preventDefault();
  if (unsavedChanges) {
    event.returnValue = "";
    return "";
  }
};

export const getSelectedSite = () => {
  const splitPath = window?.location.pathname.split("/");
  const [, x] = splitPath;
  const site = x;

  if (["en", "fr", "de"].includes(site)) {
    return localStorage.getItem("selectedSite") || "";
  }

  return site || "";
};

export const getSelectedRoute = () => {
  const splitPath = window?.location.pathname.split("/");
  const [, x] = splitPath;
  const site = x;

  if (["en", "fr", "de"].includes(site)) {
    return "";
  }

  return site || "";
};

export const getSubDomain = () => {
  const sessions = localStorage.getItem("userSession") || "";
  const storedSession = JSON.parse(sessions);
  const site_url = storedSession?.userInfo?.preferred_sites_urls;
  const selectedSite: string = getSelectedSite() || "";
  const domain = site_url[selectedSite]?.replace(".com.", ".com");
  if (domain) {
    if (domain.startsWith("http://")) {
      return domain.replace("http://", "https://");
    } else if (!domain.startsWith("https://")) {
      return `https://${domain}`;
    }
    return domain;
  }
  return null; // Return null if `domain` is null or undefined
};

export const getCurrentPathName = () => {
  const { pathname } = window?.location;
  const split = pathname.split("/");

  if (LanguageList().find(({ id }) => id === split[2])) {
    return `/${split.slice(3).join("/")}`;
  } else {
    return pathname;
  }
};

export const trimString = (string: string, length: number) => {
  if (string) {
    const trimmedString = string.length > length ? `${string.substring(0, length - 3)}...` : string;
    return trimmedString;
  }
  return "";
};
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Intl {
  type Key = "calendar" | "collation" | "currency" | "numberingSystem" | "timeZone" | "unit";
  // eslint-disable-next-line no-unused-vars
  function supportedValuesOf(input: Key): string[];
}

//Set page settings wit default values on page creation
export function setDefaultPageSettings(
  name: string,
  description?: string,
  tags?: string[],
  url?: string,
) {
  return {
    PageName: name,
    PageDescription: description !== undefined ? description : "",
    PageTags: tags !== undefined ? [...tags] : [],
    PageURL: url !== undefined ? url : "",
    PageViewer: "",
    PageCaching: false,
    PageMobileFriendly: false,
    SeoTitle: `${name} | ${siteLevelSchema.siteName}`,
    SeoDescription: description !== undefined ? description : "",
    SeoKeywords: tags !== undefined ? [...tags] : [],
    SeoBlockIndexing: false,
    SocialOgTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgDescription: description !== undefined ? description : "",
    SocialOgSiteName: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgType: "Website",
    SocialOgURL: url !== undefined ? url : "",
    SocialOgLocale: "en_US",
    SocialOgImage: "",
    SocialOgTwitterTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgTwitterDescription: description !== undefined ? description : "",
    SocialOgTwitterImage: "",
    SocialOgTwitterURL: url !== undefined ? url : "",
    SocialTwitterCardSize: "summary_large_image",
  };
}

export const formatChildren = (children: any, content: any) => {
  const Children: any = [];
  for (let i = 0; i < children.length; i++) {
    const instance = { ...children[i] };
    delete instance.__typename;
    instance.content = content[instance.DocumentPath];
    Children.push(instance);
  }
  return Children;
};

export const formatContentTitle = (title = "") => {
  return title
    ?.replace(/[_-]/g, " ")
    ?.replace(/([a-z])([0-9])/gi, "$1 $2")
    ?.replace(/([0-9])([a-z])/gi, "$1 $2")
    ?.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const capitalizeWords = (title = "") => {
  return title.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
};

export const timeZoneData = () => {
  return Intl.supportedValuesOf("timeZone");
};
const aryIannaTimeZones = timeZoneData();
export const getUniqueTimeZone = () => {
  const data: any = [];
  aryIannaTimeZones.forEach((timeZone) => {
    // let strTime = new Date().toLocaleTimeString([], {
    //   timeZone: `${timeZone}`,
    //   hour12: false,
    // });
    const strTime = new Date().toLocaleString([], {
      timeZone: `${timeZone}`,
      hour12: false,
    });
    const time = new Date(strTime).toTimeString().slice(0, -21);
    data.push({ label: `${timeZone} ${time}(IST)`, time: `${strTime}` });
  });
  // const uniqueItems = data.filter(
  //   (item: any, index: any, self: any) =>
  //     index === self.findIndex((x: any) => x.time === item.time),
  // );
  return data;
};

export const onClickCardUrlNavigate = (id: string, content: any, secondaryArgs: any) => {
  if (typeof window !== "undefined") {
    // let url = "";
    if (id && id.charAt(0) === "/") {
      // eslint-disable-next-line no-param-reassign
      id = id.substring(1);
    }

    if (content.ContentType === "Article") {
      return getLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        "article",
        id,
      );
    } else if (content.ContentType === "VOD") {
      return getLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        "video",
        id,
      );
    } else if (content.ContentType === "Course") {
      return getCourseLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        content.ContentType,
        id,
      );
    } else if (convertToLowerCase(content.ContentType) === "community") {
      return id;
    } else {
      return getLandingPageURL(
        secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        secondaryArgs?.prelemBaseEndpoint?.language,
        content.ContentType,
        id,
      );
    }
  }
  return "";
};

export const getFormattedImageUrl = (path: string, ext: string, secondaryArgs: any) => {
  if (path && ext) {
    const url = `${secondaryArgs?.gcpUrl}/${secondaryArgs?.bucketName}/${path}.${ext}`;
    if (url.match(/^https?:\/\/.+\/.+$/)) {
      return url;
    }
    return FallBackImage;
  }
  return FallBackImage;
};
export const getFormattedImageUrlString = (path: string, ext: string, secondaryArgs: any) => {
  // const imgPath:string=FallBackImage; #TODO Need to check
  if (path && ext) {
    const url = `${secondaryArgs?.gcpUrl}/${secondaryArgs?.bucketName}/${path}.${ext}`;
    if (url.match(/^https?:\/\/.+\/.+$/)) {
      return { src: url };
    }
    return { src: "" };
  }
  return { src: "" };
};

export const getRandomNumber = (answerArray: any, min: number, max: number) => {
  if (answerArray?.length < max) {
    const existingNumbers = answerArray.map((arr: any) => arr.id);
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (existingNumbers.includes(randomNumber?.toString()));
    return randomNumber;
  }
};

export const getImg = (content: any, secondaryArgs: any, index: number) => {
  const ImageCompound_index = `ImageCompound_${index}`;
  const { original_image_relative_path, ext }: any =
    (content?.ImageCompound && content?.ImageCompound[ImageCompound_index]?.original_image) || {};
  const img = formCroppedUrl(
    secondaryArgs?.gcpUrl,
    secondaryArgs?.bucketName,
    original_image_relative_path,
    ext,
  );
  return img;
};
export const getFallBackImage = (content: Content, secondaryArgs: SecondaryArgs) => {
  const { tags = "", ContentType: contentType = "" } = content || {};
  if (tags?.includes("Community")) {
    return getCommunityFallBackImageBasedOnContentType(contentType, secondaryArgs);
  } else {
    return FallBackImage;
  }
};
export const getImage = (
  content: Content,
  secondaryArgs: SecondaryArgs,
): { imageUrl: string; color: string | null } => {
  const {
    Thumbnail: { Url: url = "", ext = "" } = {},
    ContentType: contentType = "",
    background_content: { Color: color = "" } = {},
  } = nullToObject(content);
  const { gcpUrl = "", bucketName = "" } = nullToObject(secondaryArgs);
  const imageColorObject: { imageUrl: string; color: string | null } = {
    imageUrl: "",
    color: null,
  };
  if (color === "") {
    const urlOfImage: string = formCroppedUrlString(gcpUrl, bucketName, url, ext, contentType).src;
    const httpRegex = /https?:\/\//g;
    let httpCount = 0;
    if (typeof urlOfImage === "string") {
      const matches = urlOfImage.match(httpRegex);
      httpCount = matches ? matches.length : 0;
    }
    if (httpCount === 1) {
      return {
        ...imageColorObject,
        imageUrl: urlOfImage,
      };
    } else {
      return {
        ...imageColorObject,
        imageUrl: getFallBackImage(content, secondaryArgs).toString(),
      };
    }
  } else {
    return { ...imageColorObject, color };
  }
};

export const getCommunityFallBackImageBasedOnContentType = (
  contentType: string,
  secondaryArgs: SecondaryArgs,
) => {
  switch (contentType) {
    case "event":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      );
    case "challenges-announcement":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.challenges,
        defaultImages?.ext,
      );
    case "exokudos:activity":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.kudos,
        defaultImages?.ext,
      );
    case "poll":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.poll,
        defaultImages?.ext,
      );
    case "news":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.news,
        defaultImages?.ext,
      );
    case "quiz":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.quiz,
        defaultImages?.ext,
      );
    case "general":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      );
    default:
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      );
  }
};

export const createIconUrl = (secondaryArgs: any, imgUrl: string) => {
  return `${secondaryArgs?.gcpUrl}${imgUrl}`;
};

export const formRelativeURL = (gcpUrl: any, bucketName: any, img: any) => {
  return gcpUrl + "/" + bucketName + "/" + img;
};

export const createSliderArray = (originalArray: any, itemsPerRow: any) => {
  const windowWidth = window.innerWidth;
  let itemsPerSlide;
  if (windowWidth >= 1280) {
    itemsPerSlide = itemsPerRow.lg;
  } else if (windowWidth >= 768) {
    itemsPerSlide = itemsPerRow.md;
  } else if (windowWidth >= 500) {
    itemsPerSlide = itemsPerRow.sm;
  } else {
    itemsPerSlide = itemsPerRow.xs;
  }

  const sliderArray: object[][] = [];
  if (originalArray && originalArray.length) {
    for (let i = 0; i < originalArray.length; i += itemsPerSlide) {
      sliderArray.push(originalArray.slice(i, i + itemsPerSlide));
    }
    return sliderArray;
  }
};
export const getRelativeImageURL = (
  gcpUrl: string,
  bucketName: string,
  url: string,
  ext: string,
) => {
  return url && ext ? `${gcpUrl}/${bucketName}/${url}.${ext}` : FallBackImage;
};
export const getFlag = (code = "") => {
  switch (code || getCurrentLang()) {
    case "en":
      return EN_FLAG;
    case "fr":
      return FR_FLAG;
    case "de":
      return DE_FLAG;
    default:
      return EN_FLAG;
  }
};

// setDuplicate Page settings
export function setDuplicatePageSettings(name: string, url: string, pageSettings) {
  const pageSettingsCopy = {
    ...pageSettings,
    PageName: name,
    PageURL: `${getSubDomain()}/${url}`,
    SeoTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgSiteName: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgURL: `${getSubDomain()}/${url}`,
    SocialOgTwitterTitle: `${name} | ${siteLevelSchema.siteName}`,
    SocialOgTwitterURL: `${getSubDomain()}/${url}`,
    IsSchedulePublish: false,
    IsScheduleUnpublish: false,
    SchedulePublishDateTime: "",
    ScheduleUnpublishDateTime: "",
  };
  return pageSettingsCopy;
}

export const formatChildrenForPageDuplicate = (pageModel, pageName, pageUrl, currentUser) => {
  const ChildrenArray: any = [];
  pageModel.Page = pageUrl;
  pageModel.Title = pageName;
  pageModel.CurrentPageURL = `/${pageUrl}`;
  pageModel.DevelopedBy = currentUser;
  pageModel.Page_LastModificationDate = new Date();
  pageModel.PageSettings = setDuplicatePageSettings(pageName, pageUrl, pageModel.PageSettings);
  if (pageModel?.Children) {
    for (let i = 0; i < pageModel?.Children?.length; i++) {
      const instance = { ...pageModel.Children[i] };
      delete instance.content;
      ChildrenArray.push(instance);
    }
  }
  pageModel.Children = ChildrenArray;
  return pageModel;
};

export function removeParamsFromURL(sParam) {
  let url = `${window.location.href.split("?")[0]}?`;
  const sPageURL = decodeURIComponent(window.location.search.substring(1));
  const sURLVariables = sPageURL.split("&");
  let sParameterName;
  let i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] !== sParam) {
      url = `${url + sParameterName[0]}=${sParameterName[1]}&`;
    }
  }
  return url.substring(0, url.length - 1);
}
export const locationApiCallService = async () => {
  const res = await axios.get(
    `${publicRuntimeConfig.NEXT_GEOLOCATION_API_URL}?apiKey=${publicRuntimeConfig.NEXT_GEOLOCATION_API_KEY}`,
  );
  const { data: locationData = {} }: any = res;
  return locationData || {};
};
export const getDomainUrl = (host) => {
  return `http://${host}/`;
};

export const sendBaseUrl = () => {
  return process.env.NX_PUBLISH_API_URL_GENERIC;
};

export const sendBlogUrl = () => {
  return process.env.NX_BLOGS_API;
};

export const sendBtnBaseUrl = () => {
  return process.env.NX_PUBLISH_APP_URL;
};

export const trimmedBaseUrl = () => {
  const { NX_PUBLISH_API_URL = "" } = process.env;
  return NX_PUBLISH_API_URL.replace("api/v1/web/en/delivery", "");
};

export const getNextApiUrl = () => {
  return process.env.NX_API_URL;
};

export const baseEndpointObj = (host) => {
  return {
    APIEndPoint: sendBaseUrl(),
    PublishEndPoint: getDomainUrl(host),
    buttonBaseUrl: getDomainUrl(host),
    deliveryEndPoint: trimmedBaseUrl(),
    usersEndPoint: getNextApiUrl(),
    blogEndPoint: sendBlogUrl(),
    loyaltyEndPoint: process.env.NX_LOYALTY_END_POINT,
    loyaltyPortalEndPoint: process.env.NX_LOYALTY_PORTAL_END_POINT,
  };
};

export const snowplowSchemaUrl = () => {
  return {
    pageImpressionSchema: process.env.NX_PAGE_IMPRESSIONS_SCHEMA,
    prelemImpressionSchema: process.env.NX_SNOWPLOW_PRELEM_IMPRESSIONS,
    clickImpressionSchema: process.env.NX_SNOWPLOW_CLICK_IMPRESSIONS,
    userRegisterImpressionSchema: process.env.NX_SNOWPLOW_REGISTER_USER_IMPRESSIONS,
    environment: process.env.NX_ELASTIC_APM_ENVIRONMENT,
    gcpUrl: process.env.NX_GCP_URL,
    bucketName: process.env.NX_BUCKET_NAME,
  };
};

export const getSecondaryArgs = (langCode, query, hostName) => {
  return {
    ...snowplowSchemaUrl(),
    baseEndpoint: {
      language: langCode,
      query: query,
      ...baseEndpointObj(hostName),
    },
  };
};
export async function getData(url = "") {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    ShowToastError(MESSAGE_API_ERROR);
    throw error;
  }
}
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
    ShowToastError(MESSAGE_API_ERROR);
    return error?.response?.data;
  }
}

export const getIcon = (contentType) => {
  const gcpUrl = `${process.env.NX_GCP_URL}/${process.env.NX_BUCKET_NAME}/`;
  switch (convertToLowerCase(contentType)) {
    case "article":
      return `${gcpUrl}${CONTENT_ICON.ARTICLE}`;
    case "poll":
      return `${gcpUrl}${CONTENT_ICON.POLL}`;
    case "quiz":
      return `${gcpUrl}${CONTENT_ICON.QUIZ}`;
    case "event":
      return `${gcpUrl}${CONTENT_ICON.EVENT}`;
    case "vod":
      return `${gcpUrl}${CONTENT_ICON.VOD}`;
    default:
      return `${gcpUrl}${CONTENT_ICON.ARTICLE}`;
  }
};

export const apiCallForBlogs = async (url, payload = {}, type = "put") => {
  try {
    return await axios[type](url, payload, {
      headers: {
        ...headerData,
        sitename: getSelectedSite(),
        site_host: getSubDomain(),
      },
    });
  } catch (err: any) {
    return err.response;
  }
};

export const isJSONString = (str: any) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
export const getThumbImages = (thumbnail: any) => {
  if (isJSONString(thumbnail)) {
    const thumbnailObject = JSON.parse(thumbnail);
    return thumbnailObject && thumbnailObject?.images ? thumbnailObject?.images : [];
  }
  return thumbnail?.images || null;
};

export const makeCreateContentPath = (contentType: string) => {
  switch (contentType.toLowerCase()) {
    case "article":
      return "/content/create-article";
    case "quiz":
      return "/content/create-quiz";
    case "poll":
      return "/content/create-poll";
    case "vod":
      return "/content/create-vod";
    case "event":
      return "/content/create-event";
    case "profile":
      return "/content/create-profile";
    case "course":
      return "/content/create-course";
    default:
      return "";
  }
};
