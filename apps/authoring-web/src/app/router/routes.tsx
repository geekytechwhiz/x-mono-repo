import { Dashboard } from "@platformx/dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteConfig } from "./routes.type";
export const routes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/prelem",
  //   element: (
  //     <ProtectedRoute
  //       category='dashboard'
  //       subCategory='dashboard'
  //       name='dashboard'
  //       isSideBar={false}
  //       isHeader={false}>
  //       <PrelemComponent />
  //     </ProtectedRoute>
  //   ),
  // },

  // {
  //   path: "/content",
  //   element: <ProtectedRoute category="content" subCategory="content" name="page" >  <Content></Content> </ProtectedRoute>,

  // },
  // {
  //   path: "/dashboard",
  //   element: <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" >  Dashboard </ProtectedRoute>,

  // },
  // {
  //   path: "content/article",
  //   element: (
  //     <ProtectedRoute name='article' subCategory='article' category='content'>
  //       <Content />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/error",
  //   element: <Error errorCode={404} errorMessage="Page not found" />,
  // }
];
