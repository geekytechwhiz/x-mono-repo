export type PollComponentProps = {
  pageData: {
    page: string;
    title: string;
    description: string;
    analytics_enable: boolean;
    document_path: string;
    settings?: {
      keywords?: string[];
      seo_blockIndexing?: boolean;
      analytics_enable?: boolean;
    };
  };
  secondaryArgs?: any;
};

type AnalyticsProps = {
  pageId: string;
  pageTitle: string;
  pageDesc: string;
  pageTags: string;
  isAuthoring: boolean;
  isSeoEnabled?: boolean;
  isAnalyticsEnabled?: boolean;
};
export type PollPrelemProps = {
  results: any[];
  content: any;
  onSubmit: any;
  showLoading: boolean;
  analytics: AnalyticsProps;
  authoringHelper: {
    isAuthoring: boolean;
  };
  secondaryArgs: any;
};
