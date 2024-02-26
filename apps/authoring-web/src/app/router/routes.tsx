import { Dashboard } from "@platformx/dashboard";
import NavTreeCreation from "@platformx/nav-menu";

import { Content, ContentPreview, CreateContent } from "@platformx/content";
import { CreateCourse } from "@platformx/course";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteConfig } from "./routes.type";

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        {" "}
        <Dashboard />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/article",
    element: (
      <ProtectedRoute category='content' subCategory='article' name='article'>
        {" "}
        <Content></Content>{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/quiz",
    element: (
      <ProtectedRoute category='content' subCategory='quiz' name='quiz'>
        {" "}
        <Content></Content>{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/poll",
    element: (
      <ProtectedRoute category='content' subCategory='article' name='poll'>
        {" "}
        <Content></Content>{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/event",
    element: (
      <ProtectedRoute category='content' subCategory='event' name='event'>
        {" "}
        <Content></Content>{" "}
      </ProtectedRoute>
    ),
  },

  {
    path: "/site-page",
    element: (
      <ProtectedRoute category='page' subCategory='SitePage' name='SitePage'>
        {" "}
        <Dashboard />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/page-list",
    element: (
      <ProtectedRoute category='page-list' subCategory='page-list' name='page-list'>
        {" "}
        {/* <XImageRender />{" "} */}
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
  //   path: "/Sitepage",
  //   element: (
  //     <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
  //       {" "}
  //       {/* <SitePage />{" "} */}
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/user-management/user-list",
  //   element: (
  //     <ProtectedRoute category='user-list' subCategory='user-list' name='user-list'>
  //       {" "}
  //       <UserListing></UserListing>
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/workflow/workflow-list",
  //   element: (
  //     <ProtectedRoute name='article' subCategory='article' category='content'>
  //       <WorkflowManagement />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/workflow/workflow-details",
  //   element: (
  //     <ProtectedRoute name='article' subCategory='article' category='content'>
  //       <WorkflowDetails />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "user-management/user-create",
  //   element: (
  //     <ProtectedRoute
  //       name='user'
  //       category='UserManagement'
  //       subCategory=''
  //       isHeader={false}
  //       isSideBar={false}>
  //       <CreateUser />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/content/create",
    element: (
      <ProtectedRoute name='quiz' subCategory='quiz' category='content'>
        <CreateContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/navtree",
    element: (
      <ProtectedRoute
        name='navigation'
        category='menu'
        subCategory=''
        isSideBar={false}
        isHeader={false}>
        <NavTreeCreation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/preview",
    element: (
      <ProtectedRoute name='quiz' subCategory='quiz' category='content'>
        <ContentPreview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-course",
    element: (
      <ProtectedRoute
        name='course'
        subCategory=''
        category='content'
        isHeader={false}
        isSideBar={false}>
        <CreateCourse />
      </ProtectedRoute>
    ),
  },

  // {
  //   path: "/site-setting/media-handle",
  //   element: (
  //     <ProtectedRoute name='medis=a' category='SiteSetting' subCategory='MediaHandle'>
  //       <MediaHandle />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/site-setting/global-setting",
  //   element: (
  //     <ProtectedRoute category='SiteSetting' subCategory='GlobalSetting'>
  //       <GlobalSetting />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/site-setting/feature-flag",
  //   element: (
  //     <ProtectedRoute category='SiteSetting' subCategory='GlobalSetting'>
  //       <FeatureFlagSetting />
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
];
