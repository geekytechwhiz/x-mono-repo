import { fetchFooterSettingModel } from "../services/Cookie/Cookie.service";
import { fetchContent, fetchContentProfileDetails, fetchMenuModel } from "./helperFunctions";

const getHeaderFooterData = async (locale, host) => {
  const [menuResponse, footerSettingModelResponse] = await Promise.all([
    fetchMenuModel(locale, host),
    fetchFooterSettingModel(locale, host),
  ]);
  const menuData = menuResponse?.data?.data?.fetchMenu;
  const footerSettingData = footerSettingModelResponse?.data?.data?.fetchMultiSiteFooterSettings;
  return [menuData, footerSettingData];
};

const getContentData = async (type, id, locale, host) => {
  const contentResponse: any = await fetchContent(type, id, locale, host);
  return contentResponse?.data?.data;
};

const getInitialData = async (type, id, locale, host) => {
  const [menuData, footerSettingData] = await getHeaderFooterData(locale, host);
  const contentData = await getContentData(type, id, locale || "en", host);
  return [menuData, footerSettingData, contentData];
};

const getInitalProfileData = async (type, id, locale, host) => {
  const [menuData, footerSettingData] = await getHeaderFooterData(locale, host);
  const contentData = await fetchContentProfileDetails(type, id, host);
  const {
    data: {
      data: { fetchSchemaContent },
    },
  } = contentData;
  return [menuData, footerSettingData, fetchSchemaContent];
};

export { getInitialData, getContentData, getHeaderFooterData, getInitalProfileData };
