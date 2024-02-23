import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { IframeDetails } from "./IframeDetails";

const CreateCourse = () => {
  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/content/course");
  };

  return (
    <>
      <Header />
      <IframeDetails returnBack={returnBack} />
    </>
  );
};
export default CreateCourse;
