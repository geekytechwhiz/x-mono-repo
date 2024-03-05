import axios from "axios";
import getConfig from "next/config";
import { getRequestWithHost } from "../../utils/helperFunctions";

const { publicRuntimeConfig = {} } = getConfig() || {};
export const fetchCookieSettingModel = (langCode = "en") => {
  const isLocalhost = window.location.hostname.includes("localhost");
  const hostName = isLocalhost ? publicRuntimeConfig.NEXT_SITE_HOST : window.location.hostname;
  return getRequestWithHost(
    `${publicRuntimeConfig.NEXT_PUBLISH_API_URL}api/v1/web/${langCode}/delivery/cookie-setting-model?pagePath=cookie-item&contentType=MultiSiteSettings`,
    hostName,
  );
};

export const fetchFooterSettingModel = (langCode, host) => {
  const isLocalhost = host.includes("localhost");
  const hostName = isLocalhost ? publicRuntimeConfig.NEXT_SITE_HOST : host;

  return axios.get(
    `${publicRuntimeConfig.NEXT_CLUSTER_API_URL}api/v1/web/${langCode}/delivery/footer-setting-model?pagePath=footer-item&contentType=MultiSiteSettings`,
    {
      headers: {
        site_host: hostName,
      },
    },
  );
};
