import { CreateCourse } from "@platformx/course";
import { useParams } from "react-router-dom";
import { DynamicContentType } from "../components/DynamicComponentBuilder/DynamicContentType";
import { CreateVod } from "../pages/vod/createVOD/CreateVod";
import { CREATE_CONTENT } from "../utils/Constants";
import { CreatePoll } from "./Polls/CreatePoll";
import { CreateArticle } from "./article/CreateArticle";
import CreateEvent from "./event/CreateEvent";
import { CreateQuiz } from "./quiz/CreateQuiz";

export const CreateContent = () => {
  const { contentType } = useParams();

  switch (contentType) {
    case CREATE_CONTENT.PROFILE:
      return <DynamicContentType contentType={contentType.split("-")[1]}></DynamicContentType>;
    case CREATE_CONTENT.QUIZ:
      return <CreateQuiz></CreateQuiz>;
    case CREATE_CONTENT.VOD:
      return <CreateVod></CreateVod>;
    case CREATE_CONTENT.POLL:
      return <CreatePoll></CreatePoll>;
    case CREATE_CONTENT.EVENT:
      return <CreateEvent />;
    case CREATE_CONTENT.COURSE:
      return <CreateCourse></CreateCourse>;
    case CREATE_CONTENT.ARTICLE:
      return <CreateArticle />;

    default:
      return <>Content you are looking for is not available</>;
  }
};
