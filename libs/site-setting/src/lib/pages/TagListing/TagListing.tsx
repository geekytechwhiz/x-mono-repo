import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CATEGORY_CONTENT, CONTENT_TYPES, fetchTagList } from "@platformx/authoring-apis";
import { ContentListingHeader } from "@platformx/content";
import { Card } from "@platformx/utilities";

export const TagListing = () => {
  const [refreshState] = useState(false);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  const fetchTag = async () => {
    try {
      const { authoring_getTagItems = [] }: any = await fetchTagList({
        searchCategory: "",
        searchString: "",
      });
      setTags(authoring_getTagItems);
    } catch (error) {
      setTags([]);
    }
  };

  useEffect(() => {
    fetchTag();
  }, []);

  const makeContentData2 = (item: any) => {
    const listItemDetails = {
      tagName: "tagscategories",
      title: item.category,
      description: Array.isArray(item.tags)
        ? item.tags.slice(0, 4).join(", ")
        : "sample description",
      lastModifiedDate: "2024-02-20T06:34:52.542Z",
      status: "published",
      lastModifiedBy: "Sooraj Shukla",
    };
    return listItemDetails;
  };

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
        <Box sx={{ padding: "0 10px 0 15px" }}>
          <Box>
            {tags?.length > 0 &&
              tags?.map((item: any, index: any) => {
                return (
                  <Box key={index}>
                    <Card
                      dataList={makeContentData2(item)}
                      deleteContent={() => {}}
                      preview={() => {}}
                      view={() => {}}
                      edit={() => {}}
                      siteList={[]}
                      contentType={""}
                      CustomMenuList={
                        <div></div>
                        // <ContentTypeMenuList
                        //   item={makeContentData2(item)}
                        //   deleteContent={() => {}}
                        //   duplicate={() => {}}
                        //   preview={() => {}}
                        //   unPublish={() => {}}
                        //   view={() => {}}
                        //   edit={() => {}}
                        //   fetchContentDetails={() => {}}
                        // />
                      }
                    />
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
