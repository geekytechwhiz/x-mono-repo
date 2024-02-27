import { Dashboard } from "@platformx/dashboard";
import { CreateUser, UserListing } from "@platformx/user-management";
// import PrelemComponent from "../components/PrelemLibrary/PrelemComponent";
import { Content, CreateContent } from "@platformx/content";
import { SitePage } from "@platformx/site-page";
import { CreateUserGroup, UserGroupListing } from "@platformx/user-groups";
import { WorkflowDetails, WorkflowManagement } from "@platformx/workflow-management";
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
    path: "/create/user-groups",
    element: (
      <ProtectedRoute name='quiz' subCategory='' category='community'>
        <CreateUserGroup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update/user-groups",
    element: (
      <ProtectedRoute name='user-groups' subCategory='' category='community'>
        <CreateUserGroup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/community/user-groups",
    element: (
      <ProtectedRoute name='quiz' subCategory='' category='community'>
        <UserGroupListing />
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
  {
    path: "/content/quiz",
    element: (
      <ProtectedRoute category='dashboard' subCategory='dashboard' name='dashboard'>
        <Content />
      </ProtectedRoute>
    ),
  },
];
