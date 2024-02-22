import { Dashboard } from "@platformx/dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteConfig } from "./routes.type";
import { Content, CreateContent } from "@platformx/content";
import { SitePage } from "@platformx/site-page";
import { CreateUser, UserListing } from "@platformx/user-management";
import { WorkflowDetails, WorkflowManagement } from "@platformx/workflow-management";

export const routes: RouteConfig[] = [
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
];
