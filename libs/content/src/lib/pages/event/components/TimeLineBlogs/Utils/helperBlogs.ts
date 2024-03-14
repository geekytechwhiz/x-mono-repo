import { format } from "date-fns";
import { commonPutApiCall } from "@platformx/authoring-apis";
import { nullToString } from "@platformx/utilities";

const updateApiUrl = `${process.env.NX_BLOG_API_URI}blogging/update`;

export const timeSince = (publishDate: any) => {
  if (publishDate) {
    const date = new Date(publishDate);
    const curDate = new Date();
    const seconds = Math.floor((curDate.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return `${Math.floor(interval)}years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)}months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)}d ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      //return Math.floor(interval) + " h ago";
      return format(new Date(date), "H:mm");
    }
    interval = seconds / 60;
    if (interval > 1) {
      //return Math.floor(interval) + " m ago";
      return format(new Date(date), "H:mm");
    }
    return `${Math.floor(seconds) >= 0 ? Math.floor(seconds) : 0}s ago`;
  }
  return "";
};

export const updateBlogApiCall = async (blogData: any = {}) => {
  const descriptionData = !blogData?.BlogAuthorName
    ? `<span style="word-wrap: break-word" class="onlydesc">${
        nullToString(blogData?.BlogTextArea) + nullToString(blogData.mediaUrl)
      } </span>`
    : `<span style="word-wrap: break-word" class="onlydesc">${nullToString(
        blogData?.BlogTextArea,
      )} </span>`;
  const data = {
    title: blogData?.BlogTitle,
    description: descriptionData,
    content_type: "Blog",
    event_path: blogData.eventPath,
    page: blogData.eventPath,
    assets: blogData.assetstosend,
    item_path: blogData.contentTypeData,
    embeded: [{ code: blogData?.BlogEmbed }],
    // authors: [username],
    authors: blogData?.BlogAuthorName ? [blogData?.BlogAuthorName] : [],
    key_highlighter: [
      {
        highlighter: blogData?.BlogKeyHighlighter,
        time: blogData?.BlogTimeStamp,
      },
    ],
    is_published: true,
    created_date: blogData.savedBlogData?.created_date,
    is_soft_delete: false,
    created_by: blogData.savedBlogData?.created_by,
    last_published_date: new Date(),
    last_published_by: blogData.username,
    modified_date: new Date(),
    modified_by: blogData.username,
  };

  return await commonPutApiCall(`${updateApiUrl}/${blogData.savedBlogId}`, data);
};

/**
 * fallBack image
 */
export const defaultFallBackImage = () => {
  const gcpUrl = process.env.NX_GCP_URL;
  const BucketName = process.env.NX_BUCKET_NAME;
  const defaultImage = process.env.NX_DEFAULT_IMAGE;
  return `${gcpUrl}/${BucketName}/${defaultImage}`;
};
