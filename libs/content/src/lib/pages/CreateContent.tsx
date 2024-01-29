import { useLocation } from "react-router";
import { DynamicContentType } from "../components/DynamicComponentBuilder/DynamicContentType";
import { CreateQuiz } from "../pages/quiz/CreateQuiz";
import { CreateArticle } from "./article/CreateArticle";

export const CreateContent = () => {
  const location = useLocation();
  const contentType = location.state;

  switch (contentType) {
    case "profile":
      return <DynamicContentType contentType={contentType}></DynamicContentType>;
    case "quiz":
      return <CreateQuiz></CreateQuiz>;
    case "article":
      return <CreateArticle />;
    default:
      return <>DynamicContent</>;
  }
};
