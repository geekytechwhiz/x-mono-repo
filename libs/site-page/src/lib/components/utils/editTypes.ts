/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

export type AnalyticsInfo = {
  PageAnalytics: boolean;
};
export type PageInformation = {
  PageName: string;
  PageDescription: string;
  PageTags: any;
  PageURL: string;
  PageViewer: string;
  PageCaching: boolean;
  PageMobileFriendly: boolean;
};
export type PageSeoInformation = {
  SeoTitle: string;
  SeoDescription: string;
  SeoKeywords: string[];
  PageURL: string;
  SeoBlockIndexing: boolean;
};
export type PageSocialShareInformation = {
  SocialOgTitle: string;
  SocialOgDescription: string;
  SocialOgSiteName: string;
  SocialOgType: string;
  SocialOgURL: string;
  SocialOgLocale: string;
  SocialOgImage: string;
};
export type PageTwitterInformation = {
  SocialOgTwitterTitle: string;
  SocialOgTwitterDescription: string;
  SocialOgTwitterImage: string;
  SocialOgTwitterURL: string;
  SocialTwitterCardSize: string;
};
export type BrightCoveProps = {
  index: string;
  videoObj: {
    AccountID: string;
    PlayerID: string;
    VideoID: string;
  };
  handleSave(
    sectionToUpdate: string,
    data: {
      AccountID: string;
      PlayerID: string;
      VideoID: string;
    },
    index: string,
  ): void;
  sectionToUpdate?: string;
  setPageId: () => void;
};
type AddSectionDisplay = {
  showAtTop: boolean;
  showAtBottom: boolean;
};
type ShowIconsStateObjectType = {
  showCreate: boolean;
  showVisible: boolean | undefined;
  showCopy: boolean;
  showUp: boolean;
  showDown: boolean;
  showReset: boolean | undefined;
  showDelete: boolean;
  showSettings: boolean;
};
type ContentProps = {
  id: string;
  valdation: {
    maxlength: string;
    required: string;
  };
};
export type PrelemCardProps = {
  keyIndex: string;
  prelemInfo: string;
  showIconsState: ShowIconsStateObjectType;
  handleClick(
    prelemIndex?: string,
    operation?: string,
    prelemRef?: React.Ref<HTMLDivElement>,
    schemaArray?: ContentProps[],
  ): void;
  showAddSection: AddSectionDisplay;
  addSectionTouchPointClick(prelemPosition: string, position: string): void;
  prelemEditState: boolean;
  handlePrelemEditSubmit: (
    editStateValue: string,
    obj: object,
    schemaArray?: ContentProps[],
    prelemRef?: React.Ref<HTMLDivElement>,
    index?: string,
    buttonsKeysPopulatedObj?: object,
  ) => void;
  documentPath: string;
  prelemDataReset: boolean;
  onToggleContentGallery(
    activeTab?: string,
    imageVideoContentGallery?: boolean,
    slotNumber?: number,
  ): void;
  selectedContentForButton: string;
};
// type ImageDetails = {
//   Name: string;
//   Url: string;
//   Title: string;
//   Description: string;
//   Attribution: boolean;
// };
type ImageProps = {
  Thumbnail: string;
  Title: string;
  Description: string;
  Url: string;
  bitStreamId: string;
  ext: string;
  Visibility: string;
  original_image_relative_path: string;
  MetaFields: any;
};
export type PrelemImagesProps = {
  index: string;
  handleSave(sectionToUpdate: string, data: any, index: string): void;
  sectionToUpdate: string;
  published_images;
  original_image: any;
};
export type SeoInfo = {
  showContent: boolean;
  share: boolean;
  structureData: any;
};
export type PrelemSeoProps = {
  handleSave(sectionToUpdate: string, data: any, index?: number): void;
  seoEnabled?: boolean;
  setPageId?: any;
  structureData?: any;
  selectedPrelemIndex: number;
};
type TestimonialData = {
  TestimonialText?: string;
  AuthorName?: string;
  AuthorDesignation?: string;
};
export type TestimonialProps = {
  handleSave(sectionToUpdate: string, data: any, index?: string): void;
  sectionToUpdate: string;
  data: TestimonialData[];
  setPageId: () => void;
};
export type TwitterProps = {
  index: string;
  twitterHandle: string;
  handleSave(sectionToUpdate: string, data: string, index: string): void;
  sectionToUpdate?: string;
  setPageId: () => void;
};
type VideoDetails = {
  Name: string;
  Url: string;
  Title: string;
  Description: string;
  Attribution: boolean;
  Transcript: boolean;
  CC: boolean;
};
type VideoProps = {
  Url: string;
  Thumbnail?: string;
  Title: string;
  Description: string;
};
export type PrelemVideoProps = {
  index: string;
  playerFlow: string;
  videoInstance;
  handleSave(sectionToUpdate: string, data: VideoDetails, index?: string): void;
  sectionToUpdate: string;
  setPageId: () => void;
};
export type PrelemInstance = {
  PrelemId: string;
  Tags: [];
  PreviewThumbnail: string;
  Description: string;
  DocumentType: string;
  DocumentPath: string;
  DocumentCreationPath: null;
  DevelopedBy: string;
  DevelopedDate: string;
  SeoEnabled: boolean;
  AnalyticsEnabled: boolean;
  IsHidden: boolean;
  IsModified?: boolean;
};

export type PrelemPreviewFrameType = {
  children: React.ReactNode;
  device: string;
  prelemid: string;
};
