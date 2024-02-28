import {
  getServerSidePropsMethodForCourseAndXO,
  prelemBaseEndpointObj,
  snowplowSchemaUrl,
} from "../../utils/helperFunctions";
import { CourseComponent } from "../../components/Course/CourseComponent";
import ErrorBoundaryHeaderFooterWrapper from "../../components/Common/HOC/ErrorBoundaryHeaderFooterWrapper";

export async function getServerSideProps(context) {
  return await getServerSidePropsMethodForCourseAndXO(context);
}

const Course = (props: any) => {
  const { pageProps = {} } = props;
  const { route = {}, site_host } = pageProps;

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  return (
    <ErrorBoundaryHeaderFooterWrapper {...props}>
      <CourseComponent secondaryArgs={{ prelemBaseEndpoint, ...snowplowSchemaUrl() }} />
    </ErrorBoundaryHeaderFooterWrapper>
  );
};

export default Course;
