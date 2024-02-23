import { useNavigate } from "react-router-dom";
import { IframeDetails } from "./IframeDetails";
import Header from "./Header/Header";

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
