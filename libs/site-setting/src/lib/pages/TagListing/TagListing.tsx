/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  useContentListing,
  fetchTagList,
} from "@platformx/authoring-apis";
import ContentListingHeader from "libs/content/src/lib/components/ContentListingHeader/ContentListingHeader";
import ContentListing from "libs/content/src/lib/components/ContentListing/ContentListing";
import {
  Card,
  capitalizeFirstLetter,
  capitalizeWords,
  convertToLowerCase,
  formatContentTitle,
} from "@platformx/utilities";
import ContentTypeMenuList from "libs/content/src/lib/components/MenuList/ContentTypeMenuList";

export const TagListing = () => {
  const [refreshState] = useState(false);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  const contentArray = [
    {
      title: "Content",
      description: "Article, vod, Quiz, Poll, Event",
      last_modified_by: "Sooraj Shukla",
      status: "draft",
      tag_name: "tagscategories",
      modification_date: "2024-02-20T06:34:52.542Z",
      last_modification_date: "2024-02-20T06:34:52.542Z",
    },
    {
      title: "Country",
      description: "India, Australia, America, Newzwland",
      last_modified_by: "Sooraj Shukla",
      status: "published",
      tag_name: "tagscategories",
      modification_date: "2024-02-20T06:34:52.542Z",
      last_modification_date: "2024-02-20T06:34:52.542Z",
    },
    {
      analytics_enable: false,
      seo_enable: false,
      short_description: "Person",
      workflow_status: "draft",
      title: "Lanugage",
      description: "Hindi, English, German, French..",
      page: "new-quiz-1708410864141",
      current_page_url: "/new-quiz-1708410864141",
      parent_page_url: "/",
      last_modified_by: "Sooraj Shukla",
      author: "Sooraj Shukla",
      user_action_info: {
        publishByDetails: {
          name: "Sooraj",
          email: "",
          timeZone: "Asia/Kolkata",
          pubUnpubDateTime: "2024-02-20T06:34:54.873Z",
        },
        unpublishByDetails: {
          email: "",
          name: "",
          timeZone: "Asia/Kolkata",
          pubUnpubDateTime: "",
        },
      },
      status: "published",
      is_published: true,
      tag_name: "tagscategories",
      modification_date: "2024-02-20T06:34:52.542Z",
      last_modification_date: "2024-02-20T06:34:52.542Z",
      page_state: "published",
      last_published_date: "",
      published_date: "2024-02-20T06:34:54.873Z",
    },
    {
      analytics_enable: false,
      seo_enable: false,
      tags: ["Quiz", "MS Dhoni"],
      short_description: "Trending",
      options_compound_fields: [],
      name: "new-quiz-1708410864141",
      title: "Person",
      description: "Sachin, virat, Ronaldo, Amitabh",
      last_modified_by: "Sooraj Shukla",
      author: "Sooraj Shukla",
      user_action_info: {
        publishByDetails: {
          name: "Sooraj",
          email: "",
          timeZone: "Asia/Kolkata",
          pubUnpubDateTime: "2024-02-20T06:34:54.873Z",
        },
        unpublishByDetails: {
          email: "",
          name: "",
          timeZone: "Asia/Kolkata",
          pubUnpubDateTime: "",
        },
      },
      status: "published",
      is_published: true,
      tag_name: "tagscategories",
      modification_date: "2024-02-20T06:34:52.542Z",
      last_modification_date: "2024-02-20T06:34:52.542Z",
      page_state: "published",
      last_published_date: "",
      published_date: "2024-02-20T06:34:54.873Z",
    },
    {
      analytics_enable: false,
      seo_enable: false,
      tags: ["Quiz", "MS Dhoni"],
      short_description: "New quiz",
      workflow_status: "draft",
      options_compound_fields: [],
      schduled_publish_trigger_datetime: null,
      schduled_unPublish_trigger_datetime: null,
      name: "new-quiz-1708410864141",
      title: "Trending",
      description: "Style, Instagram, Modal, Bollywood",
      page: "new-quiz-1708410864141",
      current_page_url: "/new-quiz-1708410864141",
      parent_page_url: "/",
      last_modified_by: "Sooraj Shukla",
      author: "Sooraj Shukla",
      user_action_info: {
        publishByDetails: {
          name: "Sooraj",
          email: "",
          timeZone: "Asia/Kolkata",
          pubUnpubDateTime: "2024-02-20T06:34:54.873Z",
        },
        unpublishByDetails: {
          email: "",
          name: "",
          timeZone: "Asia/Kolkata",
          pubUnpubDateTime: "",
        },
      },
      status: "published",
      is_published: true,
      tag_name: "tagscategories",
      modification_date: "2024-02-20T06:34:52.542Z",
      last_modification_date: "2024-02-20T06:34:52.542Z",
      page_state: "published",
      last_published_date: "",
      published_date: "2024-02-20T06:34:54.873Z",
    },
  ];

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

  const makeContentData = (item: any) => {
    // title, status, tagName, description, lastModifiedBy, lastModifiedDate

    const listItemDetails = {
      tagName: convertToLowerCase(item.tag_name),
      title: capitalizeFirstLetter(item.title),
      description: item.description,
      lastModifiedDate:
        item.last_modification_date || item?.modificationDate || item?.last_modified_date,
      status: item.status,
      lastModifiedBy: capitalizeWords(
        formatContentTitle(item?.last_modified_by?.replace("undefined", "")),
      ),
    };
    return listItemDetails;
  };

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
                        <ContentTypeMenuList
                          item={makeContentData2(item)}
                          deleteContent={() => {}}
                          duplicate={() => {}}
                          preview={() => {}}
                          unPublish={() => {}}
                          view={() => {}}
                          edit={() => {}}
                          fetchContentDetails={() => {}}
                        />
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
