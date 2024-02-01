/* eslint-disable no-debugger */

import { useUserSession } from "@platformx/utilities";
import { memo, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { AUTH_URL } from "../utils/authConstants";
import { routes } from "./routes";
import { useDynamicRoutes } from "../hooks/useDynamicRoutes/useDynamicRoutes";
import { MenuData } from "../hooks/useDynamicRoutes/menuData";

function AppRouter() {
  const location = useLocation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();

  const navigate = useNavigate();
  const { handleSignIn } = useAuthentication();
  const generatedRoutes = useDynamicRoutes(MenuData, routes);
  // const [searchParams] = useSearchParams();

  // const code = searchParams.get("code");

  useEffect(() => {
    if (location.search.includes("code") && Object.entries(userInfo || {}).length === 0) {
      handleSignIn(location.search.split("code=")[1]);
    } else if (location.search.includes("code") && Object.entries(userInfo || {}).length !== 0) {
      const { selected_site } = userInfo;
      const lang = userInfo.preferred_sites_languages?.[selected_site] || "en";

      if (selected_site?.toLowerCase() === "system") {
        navigate(`/${selected_site}/${lang}/sites/site-listing`);
      } else {
        navigate(`/dashboard`); // TODO `/${selected_site}/${lang}/dashboard`);
      }
    } else if ((!location.search && location.pathname === "/") || location.pathname === "/error") {
      window.location.replace(AUTH_URL);
    } else if (Object.entries(userInfo || {}).length !== 0) {
      const { selected_site } = userInfo;
      const lang = userInfo.preferred_sites_languages?.[selected_site] || "en";

      if (selected_site?.toLowerCase() === "system") {
        navigate(`/${selected_site}/${lang}/sites/site-listing`);
      } else {
        navigate(`/dashboard`); // TODO `/${selected_site}/${lang}/dashboard`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (Object.entries(userInfo || {}).length < 1) {
  //   return <XLoader type='linear' />;
  // }
  return (
    <Routes>
      {generatedRoutes?.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default memo(AppRouter);
