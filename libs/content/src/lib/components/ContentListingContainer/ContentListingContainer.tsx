/* eslint-disable no-debugger */
import {  useEffect,useContext } from 'react';
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  useContentListing,
  useContentSearch,
  contentTypeAPIs,
  // fetchCourseContent,
  // fetchSearchContent
} from '@platformx/authoring-apis';
import {
  ContentState,
  previewArticle
} from '@platformx/authoring-state';
import { NoSearchResult } from '@platformx/utilities';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentListing from '../ContentListing/ContentListing';
import ContentListingHeader from '../ContentListingHeader/ContentListingHeader';
const ContListingContainer = ({ contentType }: { contentType: string }) => {
  const navigate = useNavigate();
  const startIndex = 0;
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSpinning, setIsSpinning] = useState(false);

  const [filterValue, setFilterValue] = useState('ALL');
  // const { state, dispatch } = useContext(Store);

  const { loading, error, refetch, contentList, fetchMore } = useContentSearch({
    contentType,
    locationState: location,
    filter: filterValue,
    startIndex,
    reloadContent: false,
  });
  console.log("checkcontentType",contentType)
  const {
    deleteContent,
    duplicate,
    preview,
    unPublish,
    view,
    edit,
    fetchContentDetails,
    duplicateToSite,
  } = useContentListing('ALL');

  const createContentNew = () => {
    debugger;
    // dispatch(previewArticle({}));
    if(contentType==='Course')
    navigate('/content/create-course');
  else
    navigate(`/content/create`, { state: contentType?.trim()?.toLowerCase() });
  };

  // useEffect(() => {
  //   // localStorage.removeItem('articleTimerState');
  //   // localStorage.removeItem('contentTypeTimerState');

  //   // Clears content when navigation changed to diff content
  //   if (state.content.contentList.length == 0) {
  //     fetchContentSync();
  //   }
  // }, [contentType]);

  // useEffect(() => {
  //   fetchContentSync();
  // }, [location]);

  // const fetchContentSync = async () => {
  //   if (contentType === 'Course') {
  //     dispatch(
  //       await contentTypeAPIs.fetchCourseContent(contentType, location, filterValue, state)
  //     );
  //   } else {
  //     dispatch( await contentTypeAPIs.fetchSearchContent(contentType, location, filterValue, state));
  //   }
  // };

  const handleFilter = async (filter: string) => {
    setFilterValue(filter);
  };
  const handleRefresh = async () => {

    setIsSpinning(true);
    refetch();

  };


  const handleFetchMore = async () => {
    await fetchMore();
  };
  console.log('contentList', contentList?.length);

  return (
    <>
      <ContentListingHeader
        handleFilter={handleFilter}
        title={contentType}
        category={CATEGORY_CONTENT}
        subCategory={CONTENT_TYPES}
        handleAddNew={createContentNew}
        handleRefresh={handleRefresh}
        animationState={isSpinning}
      />

      {(!loading && contentList && contentList?.length > 0) && (
        <ContentListing
        content={contentType}
          contentList={contentList}
          deleteContent={deleteContent}
          dataList={contentList}
          fetchMore={handleFetchMore}
          preview={preview}
          unPublish={unPublish}
          view={view}
          edit={edit}
          loading={loading}
          duplicate={duplicate}
          fetchContentDetails={fetchContentDetails}
          duplicateToSite={duplicateToSite}
        />
      )}
      {
        !loading && contentList?.length === 0 && <NoSearchResult />
      }
    </>
  );
};
export default ContListingContainer;
