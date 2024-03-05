import React from "react";

export interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState?: boolean;
  gcpUrl?: string;
  bucketName?: string;
  sitename?: string;
  multiSlot?: any;
  currentPageURL?: string;
}
export interface PrelemBaseEndpoint {
  PublishEndPoint: string;
  APIEndPoint: string;
  deliveryEndPoint: string;
  language?: string;
  buttonBaseUrl?: string;
  device?: string;
}
export interface Analytics {
  pageId?: string;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}

export interface AuthoringHelper {
  innerRef: React.RefObject<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  isAuthoring: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
  authoringHoverShow?: boolean;
  isModalShow?: boolean;
}
// interface MultiSlot {
//   onToggleContentGallery?: (contentType: string, imageVideoContentGallery: boolean) => void;
// }
export interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath?: string;
  ImageDescription?: string;
  Thumbnail?: {
    Description?: string;
    Title?: string;
    AltText?: string;
    Attribution?: boolean;
    Url?: string;
    Name?: string;
    ObjectType?: string;
    Color?: string;
    ext?: string;
  };
  tags?: string;
  ContentType?: string;
  PublishedBy?: string;
  PublishedDate?: string;
  background_content?: any;
}
