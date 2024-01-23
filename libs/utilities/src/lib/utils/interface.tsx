export interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState?: boolean;
  gcpUrl?: string;
  bucketName?: string;
  sitename?: string;
}
export interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  APIEndPoint?: string;
  deliveryEndPoint?: string;
  language?: string;
}
export interface Analytics {
  pageId?: number;
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

interface AuthoringHelper {
  innerRef: any;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  isEditing: boolean;
  lastSavedStructuredData?: string;
  isModalShow?: boolean;
  authoringHoverShow?: boolean;
}
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
