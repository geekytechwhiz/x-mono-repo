import { Box } from "@mui/system";
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  deleteTag,
  fetchTagListing,
  publishTag,
} from "@platformx/authoring-apis";
import { ContentListingHeader } from "@platformx/content";
import {
  Card,
  ContentListDesktopLoader,
  NoSearchResult,
  ShowToastError,
  ShowToastSuccess,
} from "@platformx/utilities";
import { t } from "i18next";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import TagMenu from "./TagMenu";

export const TagListing = () => {
  const [refreshState] = useState(false);
  const navigate = useNavigate();
  const [tags, setTags] = useState<any>([]);
  const [startIndex, setStartIndex] = useState<any>(0);
  const [isFetchMore] = useState(true);
  const ROWS = 10;

  const fetchTag = async (nextIndex) => {
    try {
      const { authoring_getTagItems = [] }: any = await fetchTagListing({
        searchCategory: "",
        searchString: "",
        start: nextIndex,
        rows: ROWS,
      });
      setTags((prev) => [...prev, ...authoring_getTagItems]);
    } catch (error) {
      setTags([]);
    }
  };
  const fetchMore = () => {
    const nextIndex = startIndex + ROWS;
    setStartIndex(() => nextIndex);
    fetchTag(nextIndex);
  };

  const viewCategory = (ctg) => {
    navigate(`/site-setting/tags/${ctg.description}`);
  };

  const editTag = (ctg) => {
    navigate(`/site-setting/create-tags/${ctg.doc_path}`);
  };

  const handleRefresh = () => {
    setStartIndex(() => 0);
    setTags(() => []);
    fetchTag(0);
  };

  const handleDelete = async (ctg) => {
    try {
      //const res =
      await deleteTag({
        tagName: ctg.doc_path,
        category: ctg.category,
      });
      ShowToastSuccess(`${t("tag")} ${t("deleted_toast")}`);
      setStartIndex(() => 0);
      setTags(() => []);
      fetchTag(0);
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    }
  };

  const onUnpublish = async (ctg) => {
    try {
      //const res =
      await publishTag({
        input: {
          page: ctg.doc_path,
          category: ctg.category,
          status: "depublish",
          is_schedule: false,
          schedule_date_time: "",
        },
      });
      ShowToastSuccess(`${t("tag")} ${t("unpublished_toast")}`);
      setStartIndex(() => 0);
      setTags(() => []);
      fetchTag(0);
    } catch (err) {
      ShowToastError(t("api_error_toast"));
    }
  };

  const makeContentData = (item: any) => {
    const listItemDetails = {
      tagName: "tagscategories",
      title: item.tag_name,
      description: item.category,
      category: item.category,
      lastModifiedDate: item.lastModificationDate,
      status: item.status,
      lastModifiedBy: item.lastModifiedBy,
      doc_path: item.doc_path,
      type: item.type,
    };
    return listItemDetails;
  };

  useEffect(() => {
    fetchTag(0);
  }, []);

  return (
    <Box>
      <ContentListingHeader
        handleFilter={() => {}}
        title='tags_categories'
        category={CATEGORY_CONTENT}
        subCategory={CONTENT_TYPES}
        handleAddNew={() => navigate("/site-setting/create-tags")}
        animationState={refreshState}
        handleRefresh={handleRefresh}
        filterValue='ALL'
      />
      <Box id='scrollableDiv' sx={{ height: "calc(100vh - 140px)", overflowY: "auto" }}>
        <InfiniteScroll
          dataLength={tags?.length}
          next={fetchMore}
          hasMore={isFetchMore}
          loader={<ContentListDesktopLoader />}
          endMessage={<NoSearchResult />}
          scrollableTarget='scrollableDiv'
          style={{ overflowX: "hidden" }}>
          <Box sx={{ padding: "0 10px 0 15px" }}>
            <Box>
              {tags?.length > 0 &&
                tags?.map((item: any) => {
                  const data = makeContentData(item);
                  return (
                    <Box key={item.title}>
                      <Card
                        dataList={data}
                        deleteContent={handleDelete}
                        view={viewCategory}
                        edit={editTag}
                        siteList={[]}
                        contentType={""}
                        CustomMenuList={
                          <TagMenu
                            dataList={data}
                            view={viewCategory}
                            edit={editTag}
                            onUnpublish={onUnpublish}
                            deleteContent={handleDelete}
                          />
                        }
                      />
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};
