import { useLocation } from "react-router";
import { CreateQuiz } from "../pages/quiz/CreateQuiz";
import { DynamicContentType } from "../components/DynamicComponentBuilder/DynamicContentType";
import { CreateCourse } from "@platformx/course";

export const CreateContent = () => {
  const location = useLocation();
  const contentType = location.state;

  switch (contentType) {
    case "profile":
      return <DynamicContentType contentType={contentType}></DynamicContentType>;

    case "quiz":
      return <CreateQuiz></CreateQuiz>;
    case "course":
      return <CreateCourse></CreateCourse>;
    default:
      return <>DynamicContent</>;
  }
};
