/* eslint-disable react-hooks/rules-of-hooks */
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  useContentListing,
  useContentSearch,
  usePage,
} from "@platformx/authoring-apis";
import { RootState } from "@platformx/authoring-state";
import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ContentListing from "../ContentListing/ContentListing";
import ContentListingHeader from "../ContentListingHeader/ContentListingHeader";

const ContListingContainer = ({ contentType }: { contentType: string }) => {
  const navigate = useNavigate();
  const startIndex = 0;
  const location = useLocation();
  const [isSpinning, setIsSpinning] = useState(false);

  const [filterValue, setFilterValue] = useState("ALL");
  const { contentArray } = useSelector((state: RootState) => state.content);
  const { loading, refetch, fetchMore } = useContentSearch({
    contentType,
    locationState: location,
    filter: filterValue,
    startIndex,
    reloadContent: false,
  });

  const {
    deleteContent,
    duplicate,
    preview,
    unPublish,
    view,
    edit,
    fetchContentDetails,
    duplicateToSite,
  } = useContentListing("ALL");
  const { editPage, previewPage, handleDeleteData, handlePageDelete, viewPage } = usePage();

  const memoizedMethods = useMemo(
    () => ({
      deleteContent: useMemo(() => deleteContent, []),
      duplicate: useMemo(() => duplicate, []),
      preview: useMemo(() => preview, []),
      unPublish: useMemo(() => unPublish, []),
      view: useMemo(() => view, []),
      edit: useMemo(() => edit, []),
      fetchContentDetails: useMemo(() => fetchContentDetails, []),
      duplicateToSite: useMemo(() => duplicateToSite, []),
    }),
    [
      deleteContent,
      duplicate,
      preview,
      unPublish,
      view,
      edit,
      fetchContentDetails,
      duplicateToSite,
    ],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsSpinning(true);
      await refetch();
      setIsSpinning(false);
    };

    fetchData();
  }, [contentType]);

  const createContentNew = () => {
    navigate(`/content/create`, { state: contentType?.trim()?.toLowerCase() });
  };

  const handleFilter = (filter: string) => {
    setFilterValue(filter);
  };

  const handleRefresh = () => {
    setIsSpinning(true);
    refetch();
  };

  const handleFetchMore = async () => {
    await fetchMore();
  };

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

      <ContentListing
        contentList={contentArray}
        deleteContent={memoizedMethods.deleteContent}
        dataList={contentArray}
        fetchMore={handleFetchMore}
        preview={memoizedMethods.preview}
        unPublish={memoizedMethods.unPublish}
        view={memoizedMethods.view}
        edit={memoizedMethods.edit}
        loading={loading}
        duplicate={memoizedMethods.duplicate}
        fetchContentDetails={memoizedMethods.fetchContentDetails}
        duplicateToSite={memoizedMethods.duplicateToSite}
        viewPage={viewPage}
        previewPage={previewPage}
        editPage={editPage}
        handleDeleteData={handleDeleteData}
        handlePageDelete={handlePageDelete}
      />
    </>
  );
};

export default memo(ContListingContainer);
