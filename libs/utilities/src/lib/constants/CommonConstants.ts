export const linkCopy = "linkCopy";
export const errorRequest = "errorRequest";

export const ratios = {
  hero: "3 / 1",
  landscape: "16 / 9",
  card2: "4 / 3",
  square: "1 / 1",
  card1: "2 / 3",
  portrait: "9 / 16",
};
export const breakpoints = [
  { breakpoint: 1440, ratio: "landscape" },
  { breakpoint: 1280, ratio: "landscape" },
  { breakpoint: 1024, ratio: "portrait" },
  { breakpoint: 768, ratio: "portrait" },
  { breakpoint: 600, ratio: "square" },
  { breakpoint: 320, ratio: "square" },
];

export const DASHBOARD_KEYS = {
  SITE_PAGE: "Sitepage",
  DASHBOARD: "dashboard",
  BOOST_PAGE: "boostpage",
  SCHEDULED_PUBLISH: "SCHEDULED_PUBLISH",
  SCHEDULED_UNPUBLISH: "SCHEDULED_UNPUBLISH",
  DESC: "DESC",
  ALL: "ALL",
  ZERO: 0,
};

export const SORT_ORDER = "DESC";
export const DefaultLocale = "en";
export const CATEGORY_CONTENT = "content";
export const CATEGORY_PAGE = "Page";
export const SORTED_ORDER = "ASC";
export const MENU_STATE_DRAFT = "DRAFT";
export const MENU_TAGGING = "Navigation";
export const USERNAME_EMAIL_EXIST = "Username already exist!";
export const CONTENT_TYPES = ["article", "quiz", "poll", "event"];
export const SITE_PAGE = "SitePage";

export const CONTENT_TYPE_WITH_ABSOLUTEURL = ["VOD", "Course", "Product"];
export const CONTENT_TYPE = {
  PAGE: "page",
  ARTICLE: "article",
  VOD: "vod",
  POLL: "poll",
  QUIZ: "quiz",
  EVENT: "event",
  PROFILE: "profile",
};
export const SNOWPLOW = {
  NA: "NA",
  GERMAN: "German",
  FRENCH: "French",
  ENGLISH: "English",
  SNOWPLOW: "snowplow",
  TRACKID: "selfDescribingEvent",
  IMPRESSIONTYPE: "Page Impression",
  SNOWPLOWLABEL: "snowplow - Page Impression",
  REGISTERFORM: "Rendering",
  CONTENT_TYPE: {
    PAGE: "Page",
    EVENT: "Event",
    VIDEO: "Video",
    ARTICLE: "Article",
    POLL: "Poll",
    QUIZ: "Quiz",
  },
};

export const MAPPING = {
  Article: "Article",
  Poll: "Poll",
  Quiz: "Quiz",
  Event: "EventLandingPage",
  Vod: "VideoLandingPage",
  Header: "Header",
  Footer: "Footer",
};
export const HIDE_HEADER_FOOTER = ["Poll", "Quiz", "Event"];
