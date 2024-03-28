import { XLoader, useUserSession } from "@platformx/utilities";
import { memo, useEffect } from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { MenuData } from "../hooks/useDynamicRoutes/menuData";
import { useDynamicRoutes } from "../hooks/useDynamicRoutes/useDynamicRoutes";
import { routes } from "./routes";
import { ChangePassword } from "@platformx/user-management";

function RootRouter() {
  const location = useLocation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const { handleSignIn, verifySession } = useAuthentication();
  const generatedRoutes = useDynamicRoutes(MenuData, routes);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      verifySession();
    }
  }, [location]);

  useEffect(() => {
    if (location.search.includes("code") && Object.entries(userInfo || {}).length === 0) {
      handleSignIn(location.search.split("code=")[1]);
    } else if (location.search.includes("code") && Object.entries(userInfo || {}).length !== 0) {
      const { selected_site } = userInfo;
      const lang = userInfo.preferred_sites_languages?.[selected_site] || "en";
      const redirectPath =
        selected_site?.toLowerCase() === "system" ? `sites/site-listing` : `dashboard`;
      window.location.replace(
        `${process.env.NX_BASE_URL}/${selected_site}/${lang}/${redirectPath}`,
      );
    }
  }, []);

  if (Object.entries(userInfo || {}).length < 1) {
    return <XLoader type='xloader' />;
  }
  return (
    <Routes>
      <Route path='/change-password' element={<ChangePassword />} />
      {generatedRoutes?.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default memo(RootRouter);
