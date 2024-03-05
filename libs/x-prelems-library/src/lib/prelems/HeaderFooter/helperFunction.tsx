import { DE_FLAG, EN_FLAG, FR_FLAG, fallBackImage as FallBackImage } from "@platformx/utilities";
import { DefaultLocale, LanguageList } from "./constants";

export const getCurrentLang = () => {
  let lang = "";
  const split = window.location.pathname.split("/");
  if (LanguageList.find((x) => x.code === split[1])) {
    [, lang] = split;
  } else {
    lang = DefaultLocale;
  }
  return lang;
};

export const getCurrentPathName = () => {
  let pathname = "";
  const split = window.location.pathname.split("/");
  const search = window.location?.search;
  if (LanguageList.find((x) => x.code === split[1])) {
    pathname = `/${split.slice(2).join("/")}${search}`;
  } else {
    pathname = window.location.pathname + search;
  }
  return pathname;
};

export const getHrefforAnchors = (
  id: string,
  // homePageUrl,
  langCode: string,
  internal = false,
) => {
  if (id && typeof window !== "undefined") {
    if (internal) {
      return `/${langCode}${id}`;
    } else {
      const url = id.match(/^https?:/) ? id : "//" + id;
      return url;
    }
  }
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

export const parseStringDetails = (dataValue: any = "") => {
  if (dataValue) {
    return JSON.parse(dataValue);
  }
  return "";
};

export const nullToObject = (dataValue: any) => {
  if (dataValue) {
    return typeof dataValue === "object" ? dataValue : {};
  }
  return "";
};

export const formRelativeURL = (gcpUrl: any, bucketName: any, img: any) => {
  return gcpUrl + "/" + bucketName + "/" + img;
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target: any = event.target as HTMLImageElement;
  target.src = FallBackImage;
};
