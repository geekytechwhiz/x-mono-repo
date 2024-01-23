import {
  MenuIcon1,
  MenuIcon2,
  MenuIcon3,
  MenuIcon4,
  MenuIcon5,
  MenuIcon6,
  MenuIcon7,
  MenuIcon8,
} from "@platformx/utilities";

const createEventFlatIcon = [
  {
    id: "ImageAndThumbnail",
    iconName: MenuIcon8,
    tooltip: "Image And Thumbnail",
  },
  {
    id: "titleDescription",
    iconName: MenuIcon2,
    tooltip: "Title & description",
  },
  {
    id: "eventTimeAndLocation",
    iconName: MenuIcon3,
    tooltip: "Event Timings & Location",
  },
  {
    id: "schedulePublish",
    iconName: MenuIcon1,
    tooltip: "Schedule Publish",
  },
  {
    id: "tags",
    iconName: MenuIcon4,
    tooltip: "Choose Tags",
  },
  {
    id: "socialShare",
    iconName: MenuIcon5,
    tooltip: "Social Share",
  },
  {
    id: "Analytics",
    iconName: MenuIcon6,
    tooltip: "Analytics",
  },
  {
    id: "seo",
    iconName: MenuIcon7,
    tooltip: "Seo",
  },
];

export const PAGE_EXIST_POP_UP = {
  saveAsDraftTitle: "event_already_exists",
  saveAsDraftDescription: "are_you_sure_you_want_to_continue?",
  saveAsDraftCloseText: "no",
  saveAsDraftConfirmText: "yes",
};
export const SAVE_AS_DRAFT_POP_UP = {
  saveAsDraftTitle: "saved_As_draft",
  saveAsDraftDescription: "your_event_has_been_saved_successfully",
  saveAsDraftCloseText: "edit",
  saveAsDraftConfirmText: "go_to_event_listing",
};

export const PUBLISH_POP_UP = {
  publishTitle: "congratulations",
  publishDescription:
    "your_Event_has_been_sent_for_publishing_&_will_be_published_in_a_few_seconds",
  publishCloseText: "go_to_listing",
  publishConfirmText: "view_event",
};

export const PATH = "path";
export const DRAFT = "DRAFT";
export const EVENT = "Event";
export const PUBLISHED = "PUBLISHED";
export const IMAGE_URL = "imageURL";
export const IMAGES = "Images";
export const SOCIAL_SHARE_IMG_URL = "socialShareImgURL";
export const SOCIAL_SHARE = "socialShare";
export const CANCEL = "cancel";
export const SEO = "Seo";
export const seo = "seo";
export const SCROLL = "scroll";
export const BEFORE_UNLOAD = "beforeunload";
export const POP_STATE = "popstate";
export const RESIZE = "resize";
export const CATEGORY_CONTENT = "content";

export default createEventFlatIcon;
