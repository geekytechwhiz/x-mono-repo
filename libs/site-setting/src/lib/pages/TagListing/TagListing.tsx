/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CATEGORY_CONTENT, CONTENT_TYPES, fetchTagList } from "@platformx/authoring-apis";
import { ContentListingHeader } from "@platformx/content";
import { Card } from "@platformx/utilities";
import TagMenu from "./TagMenu";

const newres = {
  data: {
    getTagItems: [
      {
        tag_name: "Football",
        tag_value: "en",
        category: "Games",
        doc_path: "football-1710422602091",
        lastModifiedBy: "upendra k",
        status: "published",
        lastModificationDate: "2024-03-14T13:29:26.839Z",
        type: "SiteTags",
      },
      {
        tag_name: "Sania Mirza",
        tag_value: "en",
        category: "Sports Person",
        doc_path: "saniamirza-1710416642629",
        lastModifiedBy: "upendra k",
        status: "draft",
        lastModificationDate: "2024-03-14T11:44:10.134Z",
        type: "SiteTags",
      },
      {
        tag_name: "Rohit Sharma",
        tag_value: "en",
        category: "Sports Person",
        doc_path: "rohitsharma-1710416366600",
        lastModifiedBy: "upendra k",
        status: "unpublished",
        lastModificationDate: "2024-03-14T11:41:59.398Z",
        type: "SiteTags",
      },
      {
        tag_name: "sachin",
        tag_value: "en",
        category: "Sports Person",
        doc_path: "sachin-1710415270572",
        lastModifiedBy: "upendra k",
        status: "published",
        lastModificationDate: "2024-03-14T11:21:17.430Z",
        type: "SiteTags",
      },
      {
        tag_name: "Advertising",
        tag_value: "Advertising",
        category: "Industries",
        doc_path: "",
        lastModifiedBy: "api",
        status: "published",
        lastModificationDate: "2024-03-14T13:20:42.668Z",
        type: "SystemTags",
      },
      {
        tag_name: "wind surfing",
        tag_value: "wind surfing",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:52:44.574Z",
        type: "SystemTags",
      },
      {
        tag_name: "weight lifting",
        tag_value: "weight lifting",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:52:26.954Z",
        type: "SystemTags",
      },
      {
        tag_name: "water skiing",
        tag_value: "water skiing",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:52:09.439Z",
        type: "SystemTags",
      },
      {
        tag_name: "volleyball",
        tag_value: "volleyball",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:51:50.406Z",
        type: "SystemTags",
      },
      {
        tag_name: "tennis",
        tag_value: "tennis",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:51:33.951Z",
        type: "SystemTags",
      },
      {
        tag_name: "taekwondo",
        tag_value: "taekwondo",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:51:18.830Z",
        type: "SystemTags",
      },
      {
        tag_name: "table tennis",
        tag_value: "table tennis",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:51:02.273Z",
        type: "SystemTags",
      },
      {
        tag_name: "swimming",
        tag_value: "swimming",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:50:46.702Z",
        type: "SystemTags",
      },
      {
        tag_name: "surfing",
        tag_value: "surfing",
        category: "Sports",
        doc_path: "[]",
        lastModifiedBy: "kuma.manish@hcl.com",
        status: "published",
        lastModificationDate: "2023-12-18T09:50:30.999Z",
        type: "SystemTags",
      },
    ],
  },
};

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

  // useEffect(() => {
  //   fetchTag();
  // }, []);

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
            {newres.data.getTagItems?.length > 0 &&
              newres.data.getTagItems?.map((item: any, index: any) => {
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
      </Box>
    </Box>
  );
};
