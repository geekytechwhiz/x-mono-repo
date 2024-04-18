/* eslint-disable react-hooks/rules-of-hooks */
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  useContentActions,
  useContentSearch,
  usePage,
} from "@platformx/authoring-apis";
import { makeCreateContentPath } from "@platformx/utilities";
import { memo, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateNewPage from "../../pages/page/CreateNewPage";
import ContentListing from "../ContentListing/ContentListing";
import ContentListingHeader from "../ContentListingHeader/ContentListingHeader";

const ContListingContainer = ({ contentType }: { contentType: string }) => {
  const navigate = useNavigate();
  const startIndex = 0;
  const location = useLocation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDialogOpen, setOpenCreatePage] = useState(false);
  const [filterValue, setFilterValue] = useState("ALL");
  const { loading, refetch, fetchMore } = useContentSearch({
    contentType,
    locationState: location?.state,
    filter: filterValue,
    startIndex,
    reloadContent: false,
  });
  const closeButtonHandle = () => {
    setOpenCreatePage(false);
  };

  const {
    deleteContent,
    duplicate,
    preview,
    unPublish,
    view,
    edit,
    editPage,
    fetchContentDetails,
    duplicateToSite,
    loading: deleteLoading,
  } = useContentActions("ALL");
  const { handlePageDelete, loading: deletePageLoading } = usePage();

  const memoizedMethods = useMemo(
    () => ({
      deleteContent: useMemo(() => deleteContent, [deleteContent]),
      duplicate: useMemo(() => duplicate, [duplicate]),
      preview: useMemo(() => preview, [preview]),
      unPublish: useMemo(() => unPublish, [unPublish]),
      view: useMemo(() => view, [view]),
      edit: useMemo(() => edit, [edit]),
      editPage: useMemo(() => editPage, [editPage]),
      fetchContentDetails: useMemo(() => fetchContentDetails, [fetchContentDetails]),
      duplicateToSite: useMemo(() => duplicateToSite, [duplicateToSite]),
      handlePageDelete: useMemo(() => handlePageDelete, [handlePageDelete]),
    }),
    [
      deleteContent,
      duplicate,
      preview,
      unPublish,
      view,
      edit,
      editPage,
      fetchContentDetails,
      duplicateToSite,
      handlePageDelete,
    ],
  );

  useEffect(() => {
    setFilterValue("ALL");
    const fetchData = async () => {
      setIsSpinning(true);
      await refetch();
      setIsSpinning(false);
    };

    fetchData();
  }, [contentType]);

  const createContentNew = () => {
    if (contentType?.trim()?.toLowerCase() === "sitepage") {
      setOpenCreatePage(true);
    } else {
      const navigateTo = makeCreateContentPath(contentType);
      navigate(navigateTo, {
        state: contentType?.trim()?.toLowerCase(),
      });
    }
  };

  const handleFilter = (filter: string) => {
    setFilterValue(filter);
  };

  const handleRefresh = async () => {
    setIsSpinning(true);
    await refetch();
    setIsSpinning(false);
  };

  const handleFetchMore = async () => {
    await fetchMore();
  };

  return (
    <>
      <ContentListingHeader
        handleFilter={handleFilter}
        title={
          contentType?.toLocaleLowerCase() === "all"
            ? "Result"
            : contentType?.toLocaleLowerCase() === "sitepage"
              ? "Pages"
              : contentType
        }
        category={CATEGORY_CONTENT}
        subCategory={CONTENT_TYPES}
        handleAddNew={createContentNew}
        handleRefresh={handleRefresh}
        animationState={isSpinning}
        filterValue={filterValue}
      />

      <ContentListing
        content={contentType}
        deleteContent={memoizedMethods.deleteContent}
        deletePage={handlePageDelete}
        fetchMore={handleFetchMore}
        preview={memoizedMethods.preview}
        unPublish={memoizedMethods.unPublish}
        view={memoizedMethods.view}
        edit={memoizedMethods.edit}
        editPage={memoizedMethods.editPage}
        loading={loading}
        deleteContentLoading={deleteLoading}
        deletePageLoading={deletePageLoading}
        duplicate={memoizedMethods.duplicate}
        fetchContentDetails={memoizedMethods.fetchContentDetails}
        duplicateToSite={memoizedMethods.duplicateToSite}
      />

      <CreateNewPage
        isDialogOpen={isDialogOpen}
        closeButtonHandle={closeButtonHandle}></CreateNewPage>
    </>
  );
};

export default memo(ContListingContainer);
