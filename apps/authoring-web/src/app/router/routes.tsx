import { Dashboard } from "@platformx/dashboard";
import { CreateUser, UserListing } from "@platformx/user-management";
// import PrelemComponent from "../components/PrelemLibrary/PrelemComponent";
import { CreateContent } from "@platformx/content";
import { SitePage } from "@platformx/site-page";
import { WorkflowDetails, WorkflowManagement } from "@platformx/workflow-management";
import { XPoll } from "@platformx/x-poll";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteConfig } from "./routes.type";

export const routes: RouteConfig[] = [
  // {
  //   path: "/",
  //   element: (
  //     <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
  //       {" "}
  //       <Dashboard />{" "}
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/dashboard",
    // element: <Dashboard />,
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        {" "}
        <Dashboard />{" "}
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
  {
    path: "/Sitepage",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        {" "}
        <SitePage />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-management/user-list",
    element: (
      <ProtectedRoute category='user-list' subCategory='user-list' name='user-list'>
        {" "}
        <UserListing></UserListing>
      </ProtectedRoute>
    ),
  },
  {
    path: "/workflow/workflow-list",
    element: (
      <ProtectedRoute name='article' subCategory='article' category='content'>
        <WorkflowManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workflow/workflow-details",
    element: (
      <ProtectedRoute name='article' subCategory='article' category='content'>
        <WorkflowDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "user-management/user-create",
    element: (
      <ProtectedRoute
        name='user'
        category='UserManagement'
        subCategory=''
        isHeader={false}
        isSideBar={false}>
        <CreateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create",
    element: (
      <ProtectedRoute name='quiz' subCategory='quiz' category='content'>
        <CreateContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/poll",
    element: (
      <ProtectedRoute name='poll' subCategory='poll' category='content'>
        <XPoll contentType='poll' id='jio-users-1705996546088' langCode='en' host='localhost' />
      </ProtectedRoute>
    ),
  },
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
