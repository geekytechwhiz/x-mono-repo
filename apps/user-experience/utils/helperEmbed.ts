import { fetchContent } from "./helperFunctions";

const getEmbedResponse = async (pageName, slug, locale, host) => {
  const response = await fetchContent(pageName, slug, locale, host);
  switch (pageName) {
    case "article":
      return response?.data?.data?.fetchArticleContent;
    case "quiz":
      return response?.data?.data?.fetchQuizContent;
    case "poll":
      return response?.data?.data?.fetchPoll;
    case "event":
      return response?.data?.data?.fetchEventContent;
    case "video":
      return response?.data?.data?.fetchVodByContent;
    default:
      return {};
  }
};

export { getEmbedResponse };
