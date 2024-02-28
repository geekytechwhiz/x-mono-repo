import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Error from "../error";
import { COURSES, COURSE_DETAILS, LEARNING_LIST } from "../../constants/CommonConstants";

const CourseDetail: any = dynamic(
  () => import(`platform-x-prelems/prelems/${COURSES}`).then((mod) => mod.CourseDetails),
  {
    ssr: false,
  },
);

const LearningList: any = dynamic(
  () => import(`platform-x-prelems/prelems/${COURSES}`).then((mod) => mod.LearningList),
  {
    ssr: false,
  },
);

export const CourseComponent = ({ secondaryArgs = {} }: any) => {
  const router = useRouter();
  const coursePage = router?.query?.id || "";
  const loadCoursePageOnRoute = () => {
    switch (coursePage) {
      case COURSE_DETAILS:
        return <CourseDetail secondaryArgs={secondaryArgs} courseId={router?.query?.courseId} />;
      case LEARNING_LIST:
        return <LearningList secondaryArgs={secondaryArgs} />;
      default:
        return <Error />;
    }
  };

  return <>{loadCoursePageOnRoute()}</>;
};
