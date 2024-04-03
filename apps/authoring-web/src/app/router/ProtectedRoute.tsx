import { ReactNode } from "react";
import MainLayout from "../layouts/Dashboardlayout/component/MainLayout";

type ProtectedRouteProps = {
  children: ReactNode;
  category: string;
  subCategory: string;
  isHeader?: boolean;
  isSideBar?: boolean;
  hasSearch?: boolean;
  hasLogo?: boolean;
  name?: string;
};

export const ProtectedRoute = ({
  children,
  category,
  subCategory,
  isHeader = true,
  isSideBar = true,
  hasSearch = true,
  name = "",
  hasLogo = false,
}: ProtectedRouteProps) => {
  return (
    <MainLayout
      hasSearch={name === "navigation" ? false : hasSearch}
      isHeader={isHeader}
      isSideBar={isSideBar}
      hasLogo={hasLogo}>
      {children}
    </MainLayout>
  );
};
