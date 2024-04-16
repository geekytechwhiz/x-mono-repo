import {
  AllIcon,
  ArticleIcon,
  EventsIcon,
  PagesIcon,
  PollIcon,
  QuizIcon,
  VODIcon,
} from "@platformx/utilities";

export const tagData = [
  { title: "Fifa" },
  { title: "Cricket" },
  { title: "Australia" },
  { title: "Fifa" },
  { title: "Cricket" },
  { title: "Australia" },
];

export const categoryData = [
  { title: "All", icon: <img alt='settings' src={AllIcon} />, category: "ALL", id: "all" },
  {
    title: "Pages",
    icon: <img alt='settings' src={PagesIcon} />,
    category: "Sitepage",
    id: "pages",
  },
  {
    title: "Article",
    icon: <img alt='settings' src={ArticleIcon} />,
    category: "Article",
    id: "article",
  },
  // {
  //   title: 'VOD (Video on Demand)',
  //   icon: <img alt='settings' src={ VODIcon,
  //   category: 'Vod',
  //   id: 'vod_demand',
  // }, #TODO For X-live
  { title: "Quiz", icon: <img alt='settings' src={QuizIcon} />, category: "Quiz", id: "quiz" },
  { title: "Poll", icon: <img alt='settings' src={PollIcon} />, category: "Poll", id: "poll" },
  {
    title: "Events",
    icon: <img alt='settings' src={EventsIcon} />,
    category: "Event",
    id: "event",
  },
];
export const iconMap = {
  SitePage: <img alt='settings' src={PagesIcon} />,
  Article: <img alt='settings' src={ArticleIcon} />,
  Poll: <img alt='settings' src={PollIcon} />,
  Quiz: <img alt='settings' src={QuizIcon} />,
  Vod: <img alt='settings' src={VODIcon} />,
};
export const AutoCompleteData = [
  {
    Title: "Most Expensive Car Just Sold for an All-Time Record of $142 Million",
    ContentType: "Pages",
  },
  {
    Title: "Marico: A pioneer in giving back to society",
    ContentType: "SitePage",
  },
  {
    Title: "Mutual Funds raise cash holdings amid uncertainties",
    ContentType: "SitePage",
  },
  {
    Title: "Most Expensive Car Just Sold for an All-Time Record of $142 Million",
    ContentType: "SitePage",
  },
  {
    Title: "Marico: A pioneer in giving back to society",
    ContentType: "SitePage",
  },
  {
    Title: "Mutual Funds raise cash holdings amid uncertainties",
    ContentType: "SitePage",
  },
  {
    Title: "Most Expensive Car Just Sold for an All-Time Record of $142 Million",
    ContentType: "Poll",
  },
  {
    Title: "Marico: A pioneer in giving back to society",
    ContentType: "Poll",
  },
  {
    Title: "Mutual Funds raise cash holdings amid uncertainties",
    ContentType: "Poll",
  },
];
