/* eslint-disable no-debugger */

import { XLoader, useUserSession } from "@platformx/utilities";
import { memo, useEffect } from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { MenuData } from "../hooks/useDynamicRoutes/menuData";
import { useDynamicRoutes } from "../hooks/useDynamicRoutes/useDynamicRoutes";
import { routes } from "./routes";

function AppRouter() {
  const location = useLocation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const { handleSignIn, verifySession } = useAuthentication();
  const generatedRoutes = useDynamicRoutes(MenuData, routes);
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    debugger;
    if (location.search.includes("code") && Object.entries(userInfo || {}).length === 0) {
      console.log("location.search 1", location.search.split("code=")[1]);
      handleSignIn(location.search.split("code=")[1]);
    } else if (location.search.includes("code") && Object.entries(userInfo || {}).length !== 0) {
      console.log("location.search 2", location.search.split("code=")[1]);
      const selected_site = userInfo.selected_site;
      const lang = userInfo.preferred_sites_languages?.[selected_site] || "en";

      if (selected_site?.toLowerCase() === "system") {
        console.log("selected_site", selected_site);
        //navigate(`/${selected_site}/${lang}/sites/site-listing`);
        window.location.replace(`${process.env.NX_BASE_URL}/kiwi/en/dashboard`);
      } else {
        console.log("selected_site else", selected_site);
        window.location.replace(`${process.env.NX_BASE_URL}/kiwi/en/dashboard`);
        // navigate(`/dashboard`);// TODO `/${selected_site}/${lang}/dashboard`);
      }
    }
    // else if ((!location.search && location.pathname === "/") || location.pathname === "/error") {
    //   console.log("AUTH_URL", AUTH_URL);
    //   window.location.replace(AUTH_URL);
    // } else if (Object.entries(userInfo || {}).length !== 0) {
    //   const selected_site = userInfo.selected_site;
    //   const lang = userInfo.preferred_sites_languages?.[selected_site] || "en";

    //   if (selected_site?.toLowerCase() === "system") {
    //     window.location.replace(`${process.env.NX_BASE_URL}/kiwi/en/dashboard`);
    //     //   navigate(`/${selected_site}/${lang}/sites/site-listing`);
    //   } else {
    //     window.location.replace(`${process.env.NX_BASE_URL}/kiwi/en/dashboard`);
    //     // navigate(`/dashboard`);// TODO `/${selected_site}/${lang}/dashboard`);
    //   }
    // }
  }, []);

  if (Object.entries(userInfo || {}).length < 1) {
    return <XLoader type='linear' />;
  }
  return (
    <Routes>
      {generatedRoutes?.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default memo(AppRouter);
