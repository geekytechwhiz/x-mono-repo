/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CATEGORY_CONTENT, CONTENT_TYPES, fetchTagList } from "@platformx/authoring-apis";
import { ContentListingHeader } from "@platformx/content";
import { Card, ContentListDesktopLoader, NoSearchResult } from "@platformx/utilities";
import TagMenu from "./TagMenu";
import InfiniteScroll from "react-infinite-scroll-component";

export const TagListing = () => {
  const [refreshState] = useState(false);
  const navigate = useNavigate();
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState<any>(0);
  const [isFetchMore, setFetchMore] = useState(true);
  const ROWS = 10;

  const fetchTag = async (nextIndex) => {
    // setLoading(true);
    try {
      const { authoring_getTagItems = [] }: any = await fetchTagList({
        searchCategory: "",
        searchString: "",
        start: nextIndex,
        rows: ROWS,
      });
      // setTags(authoring_getTagItems);
      setTags((prev) => [...prev, ...authoring_getTagItems]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const makeContentData = (item: any) => {
    const listItemDetails = {
      tagName: "tagscategories",
      title: item.tag_name,
      description: item.category,
      lastModifiedDate: item.lastModificationDate,
      status: item.status,
      lastModifiedBy: item.lastModifiedBy,
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
        title='Tags Categories'
        category={CATEGORY_CONTENT}
        subCategory={CONTENT_TYPES}
        handleAddNew={() => navigate("/site-setting/create-tags")}
        animationState={refreshState}
        handleRefresh={() => {}}
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
                tags?.map((item: any, index: any) => {
                  const data = makeContentData(item);
                  return (
                    <Box key={index}>
                      <Card
                        dataList={data}
                        deleteContent={viewCategory}
                        view={viewCategory}
                        edit={viewCategory}
                        siteList={[]}
                        contentType={""}
                        CustomMenuList={<TagMenu dataList={data} view={viewCategory} />}
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
