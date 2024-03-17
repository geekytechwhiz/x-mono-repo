/* eslint-disable no-restricted-globals */
import { createSearchParams } from "react-router-dom";
import { formatAddPrelem } from "@platformx/utilities";

export const formatPageUrl = (url) => {
  let tmp = url?.toLowerCase();
  tmp = tmp.replace(/\s/g, "");
  tmp = tmp.replace(/[^a-z0-9\- ]/gi, "");
  return tmp;
};

export const navigateToEditpage = (
  prelemToBeAdded: any,
  prelemContentSchema: any,
  navigate: any,
) => {
  const prelemMetaInstance = {
    ...formatAddPrelem(prelemToBeAdded),
    content: JSON.parse(JSON.stringify(prelemContentSchema)),
  };
  const path = localStorage.getItem("path");
  if (path) {
    navigate(
      {
        pathname: "/edit-page",
        search: `?${createSearchParams({
          page: path.toString(),
        })}`,
      },
      { state: "old" },
    );
  } else navigate("/edit-page", { state: "old" });
  return prelemMetaInstance;
};

//function to format page model to be sent at backend to be saved
export const consolidatePageModel = (pageModel, prelemMetaArray, pageSettings, username = "") => {
  const newModel = {
    ...pageModel,
    Page_LastModificationDate: new Date(),
    Page_LastModifiedBy: username,
  };
  const newChildrenArray: any = [];
  const structuredDataArray: any = [];
  for (let i = 0; i < prelemMetaArray.length; i++) {
    const prelemMetaArrayInstance: any = prelemMetaArray[i];
    if (prelemMetaArray[i]?.IsHidden === false && prelemMetaArray[i].SeoEnabled === true) {
      structuredDataArray.push(prelemMetaArrayInstance.StructuredData);
    }
    const prelemMetaArrayInstanceCopy = JSON.parse(JSON.stringify(prelemMetaArray[i]));
    delete prelemMetaArrayInstanceCopy.content;
    delete prelemMetaArrayInstanceCopy.prelemTag;
    delete prelemMetaArrayInstanceCopy.DefaultStructureDataForReset;

    newChildrenArray.push(prelemMetaArrayInstanceCopy);
  }
  const pageSettingsCopy = pageSettings;
  delete pageSettingsCopy.RobotsTags;
  delete pageSettingsCopy.CanonicalURL;
  delete pageSettingsCopy.PageAnalytics;
  delete pageSettingsCopy.EventBasedAnalytics;
  delete newModel.is_workflow_enabled;
  delete newModel.stages;
  delete newModel.workflow_id;
  delete newModel.workflow_status;
  delete newModel.Path;
  newModel.Children = newChildrenArray;
  newModel.PageSettings = pageSettings;
  newModel.StructureData = JSON.stringify(structuredDataArray);
  return newModel;
};

export const getSelectedSite = () => {
  let site = "";
  const split = location.pathname.split("/");
  // eslint-disable-next-line prefer-destructuring
  site = split[1];
  if (site === "en" || site === "fr" || site === "de") {
    return localStorage.getItem("selectedSite");
  } else {
    return site;
  }
};

export const getSubDomain = () => {
  const sessions = localStorage.getItem("userSession") || "";
  const storedSession = JSON.parse(sessions);
  const site_url = storedSession?.userInfo?.preferred_sites_urls;
  const domain = site_url[getSelectedSite() || ""]?.replace(".com.", ".com");
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
