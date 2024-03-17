export type PageInfo = {
    content: any;
    prelemMetaArray: any[];
    pageSettings?: any;
    pageModel?: any;
    PageName?: string;
    PageDescription?: string;
    PageTags?: string[];
    PageURL?: string;
    PageViewer?: string;
    PageCaching?: boolean;
    PageMobileFriendly?: boolean;
    SeoTitle?: string;
    SeoDescription?: string;
    SeoKeywords?: string[];
    SeoBlockIndexing?: boolean;
    SocialOgTitle?: string;
    SocialOgDescription?: string;
    SocialOgSiteName?: string;
    SocialOgType?: string;
    SocialOgURL?: string;
    SocialOgLocale?: string;
    SocialOgImage?: string;
    SocialOgTwitterTitle?: string;
    SocialOgTwitterDescription?: string;
    SocialOgTwitterImage?: string;
    SocialOgTwitterURL?: string;
    SocialTwitterCardSize?: string;
  };
  
  export type PageState = {
    pageInfo: PageInfo;
    prelemsValidationObject: any;
    prelemMetaArray: any[];
    pageModel: any;
    insertPrelemAt: number;
    scrollIndex: number;
    pageSettings: any;
    publishedPages: any[];
    showSaveWarning: boolean;
    callSave: boolean;
  };
  
  export type PrelemInstance = {
    PrelemId: string;
    PrelemName: string;
    SeoEnabled: boolean;
    AnalyticsEnabled: boolean;
    InstanceId: string;
    DocumentPath: string;
    DocumentCreationPath: string;
    DocumentType: string;
    IsHidden?: boolean;
    IsModified?: boolean;
    StructuredData: string;
    content?: any;
    DefaultStructureDataForReset: string;
  };
  