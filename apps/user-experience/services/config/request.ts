import axios from "axios";
import { showToastError } from "../../components/toastNotification/ToastNotification";
import { MESSAGE_API_ERROR } from "../../constants/CommonConstants";
import getConfig from "next/config";

const { publicRuntimeConfig = {} } = getConfig() || {};

const _authorizationHeaders = () => ({
  "Content-Type": "application/json",
});

const handleError = (err, url) => {
  // eslint-disable-next-line no-console
  console.error(`Api call error in services -> request.js : ${url} `, err);
};

export const sendBaseUrl = () => {
  return publicRuntimeConfig?.NEXT_PUBLISH_API_URL_GENERIC;
};

export const sendBlogUrl = () => {
  return publicRuntimeConfig?.NEXT_BLOGS_API;
};

export const sendBtnBaseUrl = () => {
  return publicRuntimeConfig?.NEXT_PUBLISH_APP_URL;
};

export const trimmedBaseUrl = () => {
  const { NEXT_PUBLISH_API_URL = "" } = publicRuntimeConfig;
  return NEXT_PUBLISH_API_URL.replace("api/v1/web/en/delivery", "");
};

export const getNextApiUrl = () => {
  return publicRuntimeConfig?.NEXT_API_URL;
};

export const getCurrentLang = () => {
  const split = location.pathname.split("/");
  return split[1] || "en";
};

export const sendUsersBaseUrl = () => {
  return publicRuntimeConfig?.NEXT_USER_SERVICE_APP_URL;
};

const apiRequest = async (url, data, headers, method) => {
  try {
    const res = await axios({
      url: publicRuntimeConfig?.NEXT_PUBLISH_API_URL + url,
      method: method,
      headers: { ...headers },
      data,
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    handleError(err, url);
    showToastError(
      err?.response?.data?.error?.message ? err?.response?.data?.error?.message : MESSAGE_API_ERROR,
    );
    return err?.response?.data ? err.response.data : {};
  }
};

export const getRequest = async (url, page, headers = _authorizationHeaders()) => {
  try {
    const res = await axios.get(publicRuntimeConfig?.NEXT_PUBLISH_API_URL + url, {
      headers: { ...headers },
    });
    return res.data.data ? res.data.data : res.data;
  } catch (err: any) {
    handleError(err, url);
    showToastError(MESSAGE_API_ERROR);
    return err?.response?.data ? err.response.data : {};
  }
};

export const postRequest = async (url, data = {}, headers = _authorizationHeaders()) => {
  await apiRequest(url, data, headers, "POST");
};

export const putRequest = async (url, data = {}, headers = _authorizationHeaders()) => {
  await apiRequest(url, data, headers, "PUT");
};

export const patchRequest = async (url, data = {}, headers = _authorizationHeaders()) => {
  try {
    const res = await axios({
      url: publicRuntimeConfig?.NEXT_PUBLISH_API_URL + url,
      method: "PATCH",
      headers: { ...headers },
      data,
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    handleError(err, url);
    showToastError(MESSAGE_API_ERROR);
    return err?.response?.data ? err.response.data : {};
  }
};

export const deleteRequest = async (url, headers = _authorizationHeaders()) => {
  try {
    const res = await axios({
      url: publicRuntimeConfig?.NEXT_PUBLISH_API_URL + url,
      method: "DELETE",
      headers: { ...headers },
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    handleError(err, url);
    showToastError(MESSAGE_API_ERROR);
    return err?.response?.data ? err.response.data : {};
  }
};

export const getRequestForMockApi = async (url, headers = _authorizationHeaders()) => {
  try {
    const res = await axios.get(url, {
      headers: { ...headers },
    });
    return res.data.result ? res.data.result : res.data;
  } catch (err: any) {
    handleError(err, url);
    if (err?.response?.data?.code === 401) {
      //logout
    } else {
      return err?.response?.data ? err.response.data : {};
    }
  }
};

export const Api = {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  getRequestForMockApi,
};
