/* eslint-disable no-console */
import { authAPI } from "@platformx/authoring-apis";
import {
  AUTH_INFO,
  AUTH_URL,
  XLoader,
  getSelectedSite,
  useUserSession,
} from "@platformx/utilities";
import axios from "axios";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { createSession } from "../utils/helper";
import { routes } from "./routes";

const noLoaderArr = ["/prelem-search", "/content"];
const skeltonLoaderArr = ["/prelem-search/", "/layouts", "/prelem-search/about"];

function RootRouter() {
  const [handleImpression] = usePlatformAnalytics();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [getSession, updateSession] = useUserSession();
  const { userInfo } = getSession();
  const code = searchParams.get("code");
  const [loader, setLoader] = React.useState(true);

  const verifySession = async () => {
    const response: any = await authAPI.verifySession("auth/verify-session");
    if (response && response?.data) {
      const { active } = response?.data || { userDetails: {} };
      if (getSelectedSite() === localStorage.getItem("selectedSite")) {
        updateSession({
          ...getSession(),
          isActive: active || false,
        });
      } else {
        const res = await axios.get(
          process.env.NX_APP_API_URI + `auth/get-site-permissions/${getSelectedSite()}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
            },
            withCredentials: true,
          },
        );

        localStorage.setItem("selectedSite", getSelectedSite());
        updateSession({
          ...getSession(),
          isActive: active || false,
          permissions: res.data?.data?.permissions,
          userInfo: res.data?.data,
          role: res.data?.data?.roles?.find((obj) => obj.site === res.data?.data?.selected_site)
            ?.name,
        });
      }
    } else {
      localStorage.removeItem("selectedSite");
      updateSession(null);
    }
    setLoader(false);
  };

  const handleSignIn = async () => {
    setLoader(true);
    const payload = {
      code: code,
      client_id: AUTH_INFO.clientId,
      grant_type: AUTH_INFO.grantType,
      redirect_uri: AUTH_INFO.redirectUri,
      tenant_id: AUTH_INFO.realm,
    };

    try {
      const response = await authAPI.signIn("auth/session", payload);

      if (response && response.data) {
        const userDetails = { ...response.data, isActive: "true" };
        const { roles, selected_site } = response.data;
        const userRole = roles?.find((obj) => obj.site === selected_site)?.name;
        localStorage.setItem("selectedSite", selected_site);
        updateSession(createSession(response.data, true, userRole));

        // Send login user info to Analytics End
        handleImpression(userDetails.eventType, userDetails);

        const defaultLang = response.data.preferred_sites_languages?.[selected_site] || "en";
        if (selected_site?.toLowerCase() === "system") {
          window.location.replace(
            `${process.env.NX_APP_BASE_URL}/${selected_site}/${defaultLang}/sites/site-listing`,
          );
        } else {
          navigate(`/dashboard`); //${selected_site}
        }
      } else {
        // Handle missing data in response
        console.error("Response data is missing");
      }
    } catch (error) {
      // Handle errors
      console.error("Error occurred during sign-in:", error);
      // Perform error handling actions, such as displaying an error message to the user
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    // Check if there is no active session and redirect to the login page
    if (!getSession()?.userInfo && !code) {
      localStorage.removeItem("selectedSite");
    }
    if (!code) {
      verifySession();
    }
    console.log("useEffect location", location);
  }, [location]);

  useEffect(() => {
    debugger;

    if (code && Object.entries(userInfo || {}).length === 0) {
      setLoader(true);
      handleSignIn();
    }
    if ((!code && location?.pathname === "/") || location?.pathname === "/en") {
      window.location.href = AUTH_URL;
    }
    if (code && Object.entries(userInfo || {}).length > 0) {
      const { selected_site } = userInfo;
      const lang = userInfo.preferred_sites_languages?.[selected_site] || "en";

      if (selected_site?.toLowerCase() === "system") {
        window.location.replace(
          `${process.env.NX_APP_BASE_URL}/${selected_site}/${lang}/sites/site-listing`,
        );
      } else {
        debugger;
        navigate(`/dashboard`);
      }
    } else {
      window.location.href = AUTH_URL;
    }

    console.log("useEffect code", code);
    setLoader(false);
  }, [code]);

  // const handleLogin = () => {
  //   console.log("login", AUTH_URL);
  //   const loginURL = AUTH_URL;
  //   window.location.replace(loginURL);
  // };

  return loader ? (
    <>
      {noLoaderArr.includes(location.pathname) ? (
        ""
      ) : skeltonLoaderArr.includes(location.pathname) ? (
        <XLoader type='circular' />
      ) : (
        <XLoader type='circular' />
      )}
    </>
  ) : (
    <Routes>
      {/* <Route path='/' element={<>Home</>} /> */}

      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
export default RootRouter;
