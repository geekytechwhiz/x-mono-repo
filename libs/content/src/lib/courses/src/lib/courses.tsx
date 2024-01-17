import styled from 'styled-components'

/* eslint-disable-next-line */
export interface CoursesProps {}

const StyledCourses = styled.div`
  color: pink;
`

export function Courses(props: CoursesProps) {
  return (
    <StyledCourses>
      <h1>Welcome to Courses!</h1>
    </StyledCourses>
  )
}

export default Courses
