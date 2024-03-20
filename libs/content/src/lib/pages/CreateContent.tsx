import { CreateCourse } from "@platformx/course";
import { useParams } from "react-router-dom";
import { DynamicContentType } from "../components/DynamicComponentBuilder/DynamicContentType";
import { CreateQuiz } from "../pages/quiz/CreateQuiz";
import { CreateVod } from "../pages/vod/createVOD/CreateVod";
import { CreatePoll } from "./Polls/CreatePoll";
import { CreateArticle } from "./article/CreateArticle";
import CreateEvent from "./event/CreateEvent";

export const CreateContent = () => {
  const { contentType } = useParams();

  switch (contentType) {
    case "profile":
      return <DynamicContentType contentType={contentType}></DynamicContentType>;

    case "quiz":
      return <CreateQuiz></CreateQuiz>;
    case "vod":
      return <CreateVod></CreateVod>;
    case "poll":
      return <CreatePoll></CreatePoll>;

    case "event":
      return <CreateEvent />;

    case "course":
      return <CreateCourse></CreateCourse>;

    case "article":
      return <CreateArticle />;

    default:
      return <>DynamicContent</>;
  }
};
