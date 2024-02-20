import axios from "axios";

const getHostName = (host) => {
  return host.includes("localhost") ? process.env.NX_SITE_HOST : host;
};

const getRequestWithHost = (url, host) => {
  return axios
    .get(url, {
      headers: {
        site_host: host,
      },
    })
    .catch(() => {});
};

export const fetchContentData = (contentType, pageName, langCode, host) => {
  const hostName = getHostName(host);
  return getRequestWithHost(
    `${process.env.NX_CLUSTER_API_URL}api/v1/web/${langCode}/delivery/${contentType}-model?pagePath=${pageName}`,
    hostName,
  );
};
