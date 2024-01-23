import { useLocation } from "react-router";
import { DynamicContentType } from "../components/DynamicComponentBuilder/DynamicContentType";
import { CreateQuiz } from "../pages/quiz/CreateQuiz";
import CreateEvent from "./event/CreateEvent";

export const CreateContent = () => {
  const location = useLocation();
  const contentType = location.state;

  switch (contentType) {
    case "profile":
      return <DynamicContentType contentType={contentType}></DynamicContentType>;

    case "quiz":
      return <CreateQuiz></CreateQuiz>;

    case "event":
      return <CreateEvent />;

    default:
      return <>DynamicContent</>;
  }
};
