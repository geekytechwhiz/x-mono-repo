export type ContentProps = {
  Author?: string;
  ContentType?: string;
  Count?: string;
  Description?: string;
  EditorialItemPath?: string;
  PublishedDate?: string;
  SEODescription?: string;
  SEOTitle?: string;
  SEOImage?: object;
  Thumbnail?: object;
  Title?: string;
};

export type TagMagic = {
  [key: string]: string[];
};
export const ContentGalleryTypes = [
  "ALL",
  "ServiceCard",
  "ImageGallery",
  "VideoGallery",
  "Gallery",
  "Accolades",
  "Article",
  "VOD",
  "Quiz",
  "Poll",
  "Event",
];

export const ContentGalleryTypes1 = [
  "ImageGallery",
  "VideoGallery",
  "Gallery",
  "Article",
  "VOD",
  "Quiz",
  "Poll",
  "Event",
];
