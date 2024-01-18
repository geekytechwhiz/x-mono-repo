import { Dashboard } from '@platformx/dashboard'
import { CreateUser, UserListing } from '@platformx/user-management'
import { ProtectedRoute } from './ProtectedRoute'
import { RouteConfig } from './routes.type'
import { XImageRender } from '@platformx/x-image-render'

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute
        category="dashboard"
        subCategory="dashboard"
        name="dashboard"
      >
        {' '}
        <Dashboard />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute
        category="dashboard"
        subCategory="dashboard"
        name="dashboard"
      >
        {' '}
        <Dashboard />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/page-list',
    element: (
      <ProtectedRoute
        category="page-list"
        subCategory="page-list"
        name="page-list"
      >
        {' '}
        <XImageRender />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/user-management/user-list',
    element: (
      <ProtectedRoute
        category="user-list"
        subCategory="user-list"
        name="user-list"
      >
        {' '}
        <UserListing></UserListing>
      </ProtectedRoute>
    ),
  },
  {
    path: 'user-management/user-create',
    element: (
      <ProtectedRoute
        name="user"
        category="UserManagement"
        subCategory=""
        isHeader={false}
        isSideBar={false}
      >
        <CreateUser />
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
]
