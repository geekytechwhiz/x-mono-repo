import { gql } from "@apollo/client";

export const SearchCourseListQueries = {
  FETCH_COURSE_LIST: gql`
    query FETCH_COURSE_LIST(
      $pagination: authoring_Paginate!
      $filter: authoring_CONTENT_FILTER!
      $isListing: Boolean!
    ) {
      authoring_recentContents(
        pagination: $pagination

        searchTerm: ""

        filter: $filter
        isListing: $isListing
      )
    }
  `,
};
