import styled from "styled-components";

/* eslint-disable-next-line */
export interface CourseProps {}

const StyledCourse = styled.div`
  color: pink;
`;

export function Course(props: CourseProps) {
  return (
    <StyledCourse>
      <h1>Welcome to Course!</h1>
    </StyledCourse>
  );
}

export default Course;
