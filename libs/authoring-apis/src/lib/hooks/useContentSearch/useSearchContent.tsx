/* eslint-disable no-debugger */
import { useQuery } from "@apollo/client";
import { updateContentList } from "@platformx/authoring-state";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SearchCourseListQueries } from "../../graphQL/queries/courseQueries";
import { SearchContentListQueries } from "../../graphQL/queries/searchQueries";
import { sortedData } from "../../utils/helper";
import { mapFetchALL } from "../useContentListing/mapper";

const ROW_SIZE = 20;

interface UseContentSearchProps {
  contentType: string;
  locationState: any;
  filter: string;
  startIndex: number;
  reloadContent: any;
}

interface UseContentSearchResult {
  loading: boolean;
  error: any;
  fetchMore: () => void;
  refetch: () => void;
}

const useContentSearch = ({
  contentType,
  locationState,
  filter,
  startIndex,
}: UseContentSearchProps): UseContentSearchResult => {
  const [contents, setContents] = useState<any>([]);
  const dispatch = useDispatch();
  const variables: any = mapFetchALL(locationState, filter, contentType, {
    start: startIndex,
    rows: ROW_SIZE,
  });

  const variableCourse: any = { ...variables, filter: "Course", isListing: true };

  // const variableCourse: any = { filter: "Course", isListing: true };

  const fetchQuery =
    contentType?.toLocaleLowerCase() === "course"
      ? SearchCourseListQueries.FETCH_COURSE_LIST
      : SearchContentListQueries.FETCH_CONTENT_TYPE_LIST;

  const { loading, error, data, fetchMore, refetch } = useQuery(fetchQuery, {
    variables: contentType?.toLocaleLowerCase() === "course" ? variableCourse : variables,
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    const sortedContent = sortedData(
      data?.authoring_getContentTypeItems || data?.authoring_recentContents || [],
    );

    if (sortedContent) {
      const serializableData = sortedContent.map((item) => ({
        ...item,
      }));

      setContents(sortedContent);
      dispatch(updateContentList(serializableData));
    }
  }, [data]);

  const fetchMoreContent = async () => {
    try {
      const result = await fetchMore({
        variables: {
          ...variables,
          pagination: {
            start: contents.length,
            rows: ROW_SIZE,
          },
        },
      });

      const fetchMoreData = result.data?.authoring_getContentTypeItems || [];
      const combinedData: any = [...contents, ...fetchMoreData];
      dispatch(updateContentList(combinedData));
      setContents(combinedData);
    } catch (err) {
      console.error(err);
    }
  };
  const refresh = async () => {
    await refetch(variables);
  };
  return {
    loading,
    error,
    fetchMore: fetchMoreContent,
    refetch: refresh,
  };
};

export default useContentSearch;
