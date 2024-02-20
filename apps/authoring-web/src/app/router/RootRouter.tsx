import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import PlatformXLoader from "../components/Loader/loader";
// import PrelemSearchLoader from "../components/Skeleton-loader/prelem-search-loader";
// import { authInfo, authUrl } from "../utils/authConstants";

import axios from "axios";
// import useUserSession from "../hooks/useUserSession/useUserSession";
// import ChangePassword from "../pages/changePassword";
// import authAPI from "../services/auth/Auth.api";
// import { Store } from "../store/ContextStore";
import { authAPI } from "@platformx/authoring-apis";
import {
  AUTH_INFO,
  AUTH_URL,
  XLoader,
  getSelectedSite,
  useUserSession,
} from "@platformx/utilities";
import { createSession } from "../utils/helper";
import { routes } from "./routes";
// import { getSelectedSite } from "../utils/helperFunctions";
// import routes from "../utils/routes";
// const PlatXLogo = <img src={PlatXLogoImage} style={{ width: "24px", cursor: "pointer" }} />;
const noLoaderArr = ["/prelem-search", "/content"];
const skeltonLoaderArr = ["/prelem-search/", "/layouts", "/prelem-search/about"];

function RootRouter() {
  const [handleImpression] = usePlatformAnalytics();
  const location = useLocation();
  // const { dispatch } = useContext(Store);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [getSession, updateSession] = useUserSession();
  const { userInfo } = getSession();
  const code = searchParams.get("code");
  const pages: Array<string> = ["About", "Products", "Contact", "Account"];
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
          process.env.REACT_APP_API_URI + `auth/get-site-permissions/${getSelectedSite()}`,
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
    const response: any = await authAPI.signIn("auth/session", payload);
    if (response && response.data) {
      const userDetails = { ...response.data, isActive: "true" };
      const { roles, selected_site } = response.data;
      // const userRole =  roles && roles.length > 0 ? roles[0].name : 'admin';
      const userRole = roles?.find((obj) => obj.site === selected_site)?.name;
      // const role: string = response.data?.roles.name;
      updateSession(createSession(response.data, true, userRole));

      // Send login user info to Analytics End
      handleImpression(userDetails.eventType, userDetails);
      setLoader(false);
      // navigate('/dashboard');

      localStorage.setItem("selectedSite", response.data.selected_site);

      const defaultLang = response.data.preferred_sites_languages?.[selected_site] || "en";
      if (selected_site?.toLowerCase() === "system") {
        window.location.replace(
          `${process.env.REACT_APP_BASE_URL}/${selected_site}/${defaultLang}/sites/site-listing`,
        );
      } else {
        window.location.replace(
          `${process.env.REACT_APP_BASE_URL}/${selected_site}/${defaultLang}/dashboard`,
        );
      }
    } else {
      navigate("/");
    }
    setLoader(false);
  };

  useEffect(() => {
    debugger;
    // Check if there is no active session and redirect to the login page
    // if (!getSession()?.userInfo && !code) {
    //   localStorage.removeItem("selectedSite");
    // }
    // if (!code) {
    //   verifySession();
    // }
    console.log("useEffect location", location);
  }, [location]);

  // useEffect(() => {
  //   dispatch({ type: "CLEAR_CONTENT" });
  // }, [location]);

  useEffect(() => {
    debugger;
    // if (code && Object.entries(userInfo || {}).length === 0) {
    //   setLoader(true);
    //   handleSignIn();
    // }
    if (code) {
      const selected_site = userInfo.selected_site;
      const lang = userInfo.preferred_sites_languages?.[selected_site] || "en";
      //navigate('/dashboard');
      if (selected_site?.toLowerCase() === "system") {
        window.location.replace(
          `${process.env.REACT_APP_BASE_URL}/${selected_site}/${lang}/sites/site-listing`,
        );
      } else {
        // window.location.replace(
        //   `${process.env.REACT_APP_BASE_URL}/${selected_site}/${lang}/dashboard`,
        // );
        // navigate(`${selected_site}/${lang}/dashboard`);
        navigate(`dashboard`);
      }
    }
    if (!code && location?.pathname === "/") {
      window.location.href = AUTH_URL;
    }
    console.log("useEffect code", code);
    setLoader(false);
  }, []);

  const handleLogin = () => {
    console.log("login", AUTH_URL);
    const loginURL = AUTH_URL;
    window.location.replace(loginURL);
  };

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
    <>
      {/* {location?.pathname === '/' || location?.pathname === '/access-denied' ? (
        <Header
          onLoginClick={handleLogin}
          pages={pages}
          title={PlatXLogo}
          sx={{ cursor: 'pointer' }}
        />
      ) : null} */}
      <Routes>
        <Route path='/' element={<>Home</>} />

        {/* <Route path='/dashboard' element={<Dashboard />} /> */}

        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}
export default RootRouter;
