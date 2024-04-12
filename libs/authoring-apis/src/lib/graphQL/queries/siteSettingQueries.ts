import { gql } from "@apollo/client";

export const FETCH_FOOTER_SETTING = gql`
  query FETCH_FOOTER_SETTING($pagePath: String!) {
    authoring_getSitedetails(siteConfig: SiteFooter, page: $pagePath)
  }
`;

export const FETCH_MEDIA_HANDLE = gql`
  query FETCH_SITE_SETTING($pagePath: String!) {
    authoring_getSitedetails(page: $pagePath, siteConfig: SiteMediaHandle)
  }
`;

export const FETCH_COOKIE_POLICY = gql`
  query FETCH_COOKIE_POLICY($pagePath: String!) {
    authoring_getSitedetails(page: $pagePath, siteConfig: SiteCookiePolicy)
  }
`;

export const FETCH_COUNTRY = gql`
  query FETCH_COUNTRY($start: Int!, $rows: Int!, $searchCategory: String!) {
    authoring_getTagsList(
      pagination: { start: $start, rows: $rows }
      searchCategory: $searchCategory
    ) {
      category
      tags
    }
  }
`;

export const FETCH_HEADER_SETTING = gql`
  query FETCH_HEADER_SETTING($page: String!) {
    authoring_getSitedetails(siteConfig: SiteHeaderSettings, page: $page)
  }
`;

export const FETCH_GLOBAL_SETTING = gql`
  query FETCH_GLOBAL_SETTING($page: String!) {
    authoring_getSitedetails(siteConfig: SiteBranding, page: $page)
  }
`;

export const FETCH_MULTISITE_LISTING = gql`
  query FETCH_MULTISITE_LISTING(
    $pagination: authoring_Paginate!
    $pageFilter: authoring_PageFilter!
    $sort: authoring_sortOption!
  ) {
    authoring_getMultiSiteListItems(pageFilter: $pageFilter, pagination: $pagination, sort: $sort)
  }
`;

export const FETCH_ADMIN_DOMAIN = gql`
  query FETCH_ADMIN_DOMAIN {
    admin: authoring_getAdminDomainList(siteConfig: Admin)
    domain: authoring_getAdminDomainList(siteConfig: Domain)
  }
`;

export const FETCH_USER_SITE = gql`
  query FETCH_USER_SITE($user_id: String!, $content_type: String!) {
    authoring_getUserSitePermissionList(user_id: $user_id, content_type: $content_type)
  }
`;

export const FETCH_TAG_LISTING = gql`
  query FETCH_TAG_LISTING(
    $searchCategory: String!
    $searchString: String!
    $start: Int!
    $rows: Int!
  ) {
    authoring_getTagItems(
      pagination: { start: $start, rows: $rows }
      sort: DESC
      searchCategory: $searchCategory
      searchString: $searchString
      pageFilter: ALL
      isDraft: true
    )
  }
`;

export const FETCH_CATEGORY = gql`
  query FETCH_CATEGORY(
    $searchCategory: String!
    $searchString: String!
    $start: Int!
    $rows: Int!
  ) {
    authoring_getTagItems(
      pagination: { start: $start, rows: $rows }
      sort: DESC
      searchCategory: $searchCategory
      searchString: $searchString
      pageFilter: ALL
      isDraft: false
      isCategory: true
    )
  }
`;
