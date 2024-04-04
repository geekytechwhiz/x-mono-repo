import { SORT_ORDER } from "../../utils/constants";
import { formatUrl } from "../../utils/helper";
import { ArticleMapper, getSubDomain } from "@platformx/utilities";

export const mapFetchALL = (
  state: any,
  filter: string,
  contentType: string,
  pagination: { start: number; rows: number },
) => {
  return {
    searchTerm: state?.searchTerm,
    tags: state?.tags,
    dateFilter: {
      from: state?.fromDate,
      to: state?.toDate,
    },
    created_by: state?.author,
    contentType: contentType,
    pageFilter: filter,
    sort: SORT_ORDER,
    pagination: pagination,
    isSuggestive: false,
  };
};

export const mapUnPublishContent = (contentType: string, page: string) => {
  return {
    contentType: contentType,
    input: {
      page: page,
      status: "depublish",
    },
  };
};

export const mapDeleteContent = (
  contentType: string,
  selectedContent: { page: any; current_page_url: any; parent_page_url: any },
) => {
  const contentInfo = {
    page: selectedContent?.page,
    current_page_url: selectedContent?.current_page_url,
    parent_page_url: selectedContent?.parent_page_url,
  };
  return {
    contentInfo: contentInfo,
    contentType: contentType,
  };
};

const getUpdatedStructuredData = (
  contentType: string,
  content: {
    page?: string;
    background_content?: { objectType: any; Url: any; Color: any };
    display_scores?: any;
    questions?: any;
    result_range_1?: any;
    result_range_2?: any;
    result_range_3?: any;
    result_range_4?: any;
    banner: any;
    sub_title?: any;
    banner_image?: any;
    thumbnail_image?: any;
    actual_address?: any;
    event_end_date?: any;
    event_start_date?: any;
    virtual_address?: any;
    google_api_address?: any;
    question_background_content?: any;
    description: any;
    poll_question?: any;
    poll_result?: any;
    options_compound_fields: any;
    end_date?: any;
    analytics_enable?: any;
    category?: any;
    createdBy?: any;
    is_edit?: any;
    others?: any;
    robot_txt?: any;
    seo_enable?: any;
    settingsProperties?: any;
    short_description?: any;
    short_title?: any;
    site_name?: any;
    sitemap?: any;
    tags?: any;
    published_images?: any;
    original_image?: any;
    keywords?: any;
    current_page_url?: any;
    title?: any;
    status?: any;
  },
  language: string,
) => {
  if (contentType.toLowerCase() === "Article".toLowerCase()) {
    return ArticleMapper.updateStructureData(
      content,
      content.banner,
      content.keywords,
      content.current_page_url,
    );
  } else if (contentType.toLowerCase() === "Poll".toLowerCase()) {
    const PollStructureData = {
      "@context": "https://schema.org",
      "@type": "VoteAction",
      name: content?.title,
      description: content?.description,
      url:
        content.status === "PUBLISHED"
          ? `${getSubDomain()}/${language}/` +
            `poll/${content?.title?.replace(/[^A-Z0-9]+/gi, "-")?.toLowerCase()}`
          : content.title?.replace(/[^A-Z0-9]+/gi, "-")?.toLowerCase(),
      startTime: new Date().toISOString(),
      option: content.options_compound_fields?.map((ans: { option_text: any }) => ans.option_text),
    };
    return PollStructureData;
  } else {
    return {};
  }
};
export const mapDuplicateContent = (
  contentType: string,
  title: any,
  IsDuplicate: boolean,
  selectedContent: any,
  username: string,
  language: string,
) => {
  let url = "";
  let updatedSelectedContent = selectedContent;
  if (title) {
    url = formatUrl(title);
    updatedSelectedContent = {
      ...selectedContent,
      page: title,
      title: title,
      last_modifiedBy: username,
    };
  } else {
    url = updatedSelectedContent?.page;
  }
  const commonFields = {
    background_content: {
      objectType: updatedSelectedContent?.background_content?.objectType,
      Url: updatedSelectedContent?.background_content?.Url,
      Title: "",
      Thumbnail: updatedSelectedContent?.background_content?.Url,
      Color: updatedSelectedContent?.background_content?.Color,
    },
    display_scores: updatedSelectedContent?.display_scores,
  };
  const tempObjField =
    contentType === "Quiz"
      ? {
          ...commonFields,
          questions: updatedSelectedContent?.questions,
          result_range_1: updatedSelectedContent?.result_range_1,
          result_range_2: updatedSelectedContent?.result_range_2,
          result_range_3: updatedSelectedContent?.result_range_3,
          result_range_4: updatedSelectedContent?.result_range_4,
        }
      : contentType === "Article"
        ? {
            banner: updatedSelectedContent?.banner,
            sub_title: updatedSelectedContent?.sub_title,
          }
        : contentType === "Event"
          ? {
              banner_image: updatedSelectedContent?.banner_image,
              thumbnail_image: updatedSelectedContent?.thumbnail_image,
              actual_address: updatedSelectedContent?.actual_address,
              event_end_date: updatedSelectedContent?.event_end_date,
              event_start_date: updatedSelectedContent?.event_start_date,
              virtual_address: updatedSelectedContent?.virtual_address,
              google_api_address: updatedSelectedContent?.google_api_address,
            }
          : {
              ...commonFields,
              question_background_content: updatedSelectedContent?.question_background_content,
              poll_description: updatedSelectedContent?.description,
              poll_question: updatedSelectedContent?.poll_question,
              poll_result: updatedSelectedContent?.poll_result,
              poll_title: updatedSelectedContent?.page,
              options_compound_fields: updatedSelectedContent?.options_compound_fields,
              start_date: new Date(),
              end_date: updatedSelectedContent?.end_date,
            };
  const contentToSend = {
    CommonFields: {
      analytics: "",
      analytics_enable: updatedSelectedContent?.analytics_enable,
      category: updatedSelectedContent?.category,
      createdBy: updatedSelectedContent?.createdBy,
      creationDate: new Date().toISOString(),
      current_page_url: `/${url}`,
      description: updatedSelectedContent?.description,
      is_edit: updatedSelectedContent?.is_edit,
      modificationDate: new Date().toISOString(),
      others: updatedSelectedContent?.others,
      page: url,
      // page_lastmodifiedby: updatedSelectedContent?.createdBy,
      page_state: "DRAFT",
      parent_page_url: "/",
      robot_txt: updatedSelectedContent?.robot_txt,
      seo_enable: updatedSelectedContent?.seo_enable,
      settings: updatedSelectedContent?.settingsProperties,
      short_description: updatedSelectedContent?.short_description,
      short_title: updatedSelectedContent?.short_title,
      site_name: updatedSelectedContent?.site_name,
      sitemap: updatedSelectedContent?.sitemap,
      structure_data: JSON.stringify(
        getUpdatedStructuredData(contentType, updatedSelectedContent, language),
      ),
      tags: updatedSelectedContent?.tags,
      title: url,
      IsConfirm: IsDuplicate,
      page_lastmodifiedby: username,
    },
    ObjectFields: {
      ...tempObjField,
      published_images: updatedSelectedContent?.published_images,
      original_image: updatedSelectedContent?.original_image,
    },
  };

  return {
    ...contentToSend,
  };
};

export const pageObjectMapper = (props: any) => {
  const {
    document_type,
    document_title,
    description,
    created_by,
    last_modified_by,
    document_path,
  } = props;
  return {
    tagName: document_type?.toLowerCase(),
    pageName: document_title,
    title: document_title,
    description: description,
    author: created_by,
    lastModifiedDate: last_modified_by,
    status: "draft",
    path: document_path,
    page: document_title,
    scheduledPublishTriggerDateTime: "",
    scheduledUnPublishTriggerDateTime: "",
    lastPublishedDate: "",
    lastModifiedBy: last_modified_by,
    publishedBy: "",
    publishedDate: "",
    currentPageUrl: `/${document_title}`,
    parentPageUrl: "/",
    name: document_title,
    page_state: "draft",
    is_published: false,
    current_page_url: `/${document_title}`,
  };
};
