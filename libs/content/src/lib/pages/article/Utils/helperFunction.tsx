import {
  ShowToastError,
  dateFormat,
  getSubDomain,
  handleHtmlTags,
  trimString,
} from "@platformx/utilities";
import { t } from "i18next";

export const ArticleInitialState = {
  CommonFields: {
    page: "",
    title: "",
    description: "",
    category: "Article",
    site_name: "",
    parent_page_url: "/",
    current_page_url: "",
    developedby: "",
    page_state: "",
    is_edit: false,
    seo_enable: true,
    analytics_enable: true,
    robot_txt: false,
    sitemap: false,
    analytics: "",
    others: "",
    structure_data: "",
    createdBy: "",
    creationDate: "",
    modificationDate: "",
    tags: [],
    page_createdby: "",
    page_lastmodifiedby: "",
    settings: {
      socialog_url: "",
      socialog_twitter_url: "",
      socialog_type: "article",
      socialog_sitename: "",
      seo_title: "",
      socialog_title: "",
      socialog_twitter_title: "",
      socialog_description: "",
      socialog_twitter_description: "",
      socialog_image: "",
      socialog_twitter_image: "",
      keywords: [],
      seo_keywords: [],
      seo_description: "",
      seo_blockIndexing: true,
    },
    IsConfirm: false,
    is_featured: false,
  },
  ObjectFields: {
    page_name: "",
    banner: "",
    sub_title: "",
    content_type: "Article",
    page_tags: [],
    link_tags: [],
    article_content: {},
    tag: [],
    links: [],
    published_images: [],
    original_image: {},
  },
};

export const handleTagOnChange = (
  event,
  tagArr,
  setTagArr,
  tagArrRef,
  socialOgTags,
  setSocialOgTags,
) => {
  let tagsArray = [...tagArr] || [];

  if (event.target.checked && tagsArray?.length > 14) {
    event.target.checked = false;
    ShowToastError(t("allowed_tags_toast"));
  } else {
    if (event.target.checked) {
      tagsArray = [...tagArr, event.target.value];
    } else {
      tagsArray.splice(tagArr.indexOf(event.target.value), 1);
    }
    setTagArr(tagsArray);
    tagArrRef.current = {
      ...tagArrRef.current,
      tags: tagsArray,
    };
    setSocialOgTags({ ...socialOgTags, tagsSocialShare: tagsArray });
    //   unsavedChanges.current = true;
  }
};
export const articleInitialObj = (username) => {
  const newArticle = {
    CommonFields: {
      page: "",
      title: "",
      description: "",
      category: "Article",
      site_name: "PlatX",
      parent_page_url: "/",
      current_page_url: "",
      developedby: username,
      page_state: "",
      is_edit: false,
      seo_enable: true,
      analytics_enable: true,
      robot_txt: false,
      sitemap: false,
      analytics: "",
      others: "",
      structure_data: "",
      createdBy: username,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      tags: [],
      page_createdby: username,
      page_lastmodifiedby: username,
      settings: {},
    },
    ObjectFields: {
      page_name: "",
      banner: "",
      sub_title: "",
      content_type: "Article",
      page_tags: [],
      link_tags: [],
      article_content: {},
      tag: [],
      links: [],
      published_images: [],
      original_image: {},
    },
  };
  return newArticle;
};
export const updateImageData = (imgObj, content, setState, state, selectedImage) => {
  const { published_images, original_image } = imgObj || {};
  const banner = original_image?.bitStreamId;
  const sub_title = original_image?.Title;
  const relativeUrl = `${original_image?.original_image_relative_path}.${original_image?.ext}`;
  setState({
    ...state,
    CommonFields: {
      ...state.CommonFields,
      settings: {
        ...state.CommonFields.settings,
        socialog_image: relativeUrl,
      },
    },
    ObjectFields: {
      ...state.ObjectFields,
      banner,
      published_images,
      original_image,
      sub_title,
    },
  });
};
export const resetImageSelected = (setContent, setSelectedImage) => {
  setContent({
    Url: "",
    Title: "",
    Description: "",
    bitStreamId: "",
  });
  setSelectedImage({
    Thumbnail: "",
    Title: "",
    Description: "",
    bitStreamId: "",
  });
};
export const handleImage = (
  image,
  setSelectedImage,
  setContent,
  setShowMediaOption,
  setArticleInstance,
  articleInstance,
) => {
  setSelectedImage(image);

  setContent({
    Url: image.Thumbnail,
    Title: image.Title,
    Description: image.Description,
    bitStreamId: image.bitStreamId,
  });
  setShowMediaOption(true);
  setArticleInstance({
    ...articleInstance,
    ObjectFields: {
      ...articleInstance.ObjectFields,
      banner: image.Thumbnail,
    },
  });
  // updateField({ Banner: image.Thumbnail });
  // handleEnableArticlePreview('banner', image.Thumbnail);
};
export const updateStructureData = (content, banner, keywords, pageUrl) => {
  let articleStructureData = {};
  articleStructureData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: trimString(handleHtmlTags(content?.title), 100),
    Description: trimString(handleHtmlTags(content?.description), 200),
    keywords: keywords,
    image: banner,
    url: `${getSubDomain()}/en/article/${pageUrl}`,
    datePublished: dateFormat(),
    dateModified: dateFormat(new Date().toISOString()),
    author: [
      {
        "@type": "Person",
        name: content.page_createdby,
      },
    ],
  };

  return articleStructureData;
};
export const validateDetails = (articleInstance, tagArrRef, isPublish = false) => {
  const articleCommonFields = articleInstance?.CommonFields || {};
  const articleObjectFields = articleInstance?.ObjectFields || {};
  const { title, description } = articleCommonFields;
  const { banner } = articleObjectFields || {};
  const tags = JSON.parse(JSON.stringify(tagArrRef.current));

  if (banner?.length <= 0) {
    ShowToastError(t("banner_error"));
    return true;
  } else if (title.length <= 0) {
    ShowToastError(`${t("title")} ${t("is_required")}`);
    return true;
  } else if (description.length <= 0) {
    ShowToastError(`${t("description")} ${t("is_required")}`);
    return true;
  } else if (isPublish && tags.tags.length <= 0) {
    ShowToastError(t("tag_error"));
    return true;
  } else {
    return false;
  }
};
export const updateSettings = (articleInstance, tagArrRef, socialOgTags, pageUrl = "") => {
  const articleCommonFields = articleInstance?.CommonFields || {};
  const { title, description, settings } = articleCommonFields;
  const { socialog_title, socialog_description, socialog_image } = settings || {};
  const articleSettings = {
    socialog_url: `${getSubDomain()}/en/article/${pageUrl}`,
    socialog_twitter_url: `${getSubDomain()}/en/article/${pageUrl}`,
    socialog_type: "article",
    socialog_sitename: title ? trimString(handleHtmlTags(title), 100) : "article",
    seo_title: title ? trimString(handleHtmlTags(title), 100) : "",
    socialog_title: socialog_title ? trimString(handleHtmlTags(socialog_title), 100) : "",
    socialog_twitter_title: socialog_title ? trimString(handleHtmlTags(socialog_title), 100) : "",
    socialog_description: socialog_description
      ? trimString(handleHtmlTags(socialog_description), 163)
      : "",
    socialog_twitter_description: socialog_description
      ? trimString(handleHtmlTags(socialog_description), 163)
      : "",
    socialog_image: socialog_image,
    socialog_twitter_image: socialog_image,
    keywords: socialOgTags.tagsSocialShare,
    seo_keywords: tagArrRef.current.tags,
    seo_description: description ? trimString(handleHtmlTags(description), 163) : "",
    seo_blockIndexing: true,
  };
  return articleSettings;
};
export const requestToSendArticle = (
  pageState,
  pageUrl,
  IsDuplicate,
  articleInstance,
  tagArrRef,
  socialOgTags,
  updateStructureDataArticle,
  username,
  is_featured,
) => {
  const structureData =
    articleInstance?.CommonFields?.structure_data !== ""
      ? articleInstance.CommonFields.structure_data
      : JSON.stringify(updateStructureDataArticle());
  const settings = updateSettings(articleInstance, tagArrRef, socialOgTags, pageUrl);
  const articleSettings = settings;
  const createArticleRequest = {
    CommonFields: {
      ...articleInstance.CommonFields,
      page: pageUrl,
      page_state: pageState,
      structure_data: structureData,
      IsConfirm: IsDuplicate,
      tags: tagArrRef?.current?.tags,
      current_page_url: `/${pageUrl}`,
      parent_page_url: "/",
      settings: articleSettings,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      page_createdby: username,
      page_lastmodifiedby: username,
      createdBy: username,
      is_featured,
    },
    ObjectFields: {
      ...articleInstance.ObjectFields,
    },
  };
  return createArticleRequest;
};
