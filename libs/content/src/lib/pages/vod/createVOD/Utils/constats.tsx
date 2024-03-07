import { VODIcon, MenuIcon2, MenuIcon4, MenuIcon8 } from "@platformx/utilities";

export const DEF_VOD = {
  DsapceVideoUrl: "",
  Thumbnail: "",
  Title: "",
  Description: "",
  Tags: [],
};

const createVodFlatIcon = [
  {
    id: "VideoAndThumbnail",
    iconName: VODIcon,
    tooltip: "Video And Thumbnail",
  },
  {
    id: "ImageAndThumbnail",
    iconName: MenuIcon2,
    tooltip: "Image And Thumbnail",
  },
  {
    id: "titleDescription",
    iconName: MenuIcon4,
    tooltip: "Title & description",
  },
  {
    id: "tags",
    iconName: MenuIcon8,
    tooltip: "Choose Tags",
  },
];

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

export default createVodFlatIcon;
