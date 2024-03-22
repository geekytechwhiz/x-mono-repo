import getConfig from "next/config";
import Cookies from "cookies";
import { LOGIN_COOKIE } from "../constants/CommonConstants";
import { verifyLogin, createSession, getDomainUrl } from "./helperFunctions";

const { publicRuntimeConfig = {} } = getConfig() || {};

const setKeyclockHeaders = async (headers, res) => {
  if (headers["set-cookie"] && headers["set-cookie"]?.length > 0) {
    await res.setHeader("set-cookie", headers["set-cookie"].toString() || "");
    await res.setHeader("X-Foo", "Bar");
  }
};

const verifyLoggedInStatus = async (req, res) => {
  const cookies = new Cookies(req, res);
  const loginCookie = cookies?.get(LOGIN_COOKIE);
  if (loginCookie) {
    const { status = "", data } = (await verifyLogin(req.headers.cookie)) || {};
    if (status === 200) {
      return { isLoggedIn: true, userData: data?.data?.userDetails || {} };
    } else {
      return { isLoggedIn: false, userData: {} };
    }
  }
  return { isLoggedIn: false, userData: {} };
};

const createNewSession = async (req, res, query, locale, pageName) => {
  const payload = {
    code: query?.code,
    client_id: `${publicRuntimeConfig?.NEXT_CLIENT_ID}`,
    grant_type: `${publicRuntimeConfig?.NEXT_GRANT_TYPE}`,
    redirect_uri: `${getDomainUrl(req?.headers?.host || "")}${locale}/${pageName}`,
    // redirect_uri: "http://localhost:3000/en/",
    tenant_id: `${publicRuntimeConfig?.NEXT_REALM}`,
  };
  const { headers } = await createSession(req, payload);
  if (headers) {
    await setKeyclockHeaders(headers, res);
  }
  return headers;
};

export { createNewSession, verifyLoggedInStatus };
