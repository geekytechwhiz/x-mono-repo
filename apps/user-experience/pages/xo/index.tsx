import { getServerSidePropsMethodForCourseAndXO } from "../../utils/helperFunctions";
import { XOComponent } from "../../components/XO/XOComponent";
import ErrorBoundaryHeaderFooterWrapper from "../../components/Common/HOC/ErrorBoundaryHeaderFooterWrapper";

export async function getServerSideProps(context) {
  return await getServerSidePropsMethodForCourseAndXO(context);
}

const XO = (props: any) => {
  return (
    <ErrorBoundaryHeaderFooterWrapper {...props}>
      <XOComponent />
    </ErrorBoundaryHeaderFooterWrapper>
  );
};

export default XO;
