export type DialogList = {
  isDuplicateValue?: boolean;
  pageNameInitial?: string;
  isDialogOpen: boolean;
  closeButtonHandle: () => void;
};

export type DialogContentProps = {
  language: string;
  setLanguage: () => void;
  isDuplicate: boolean;
  showPageUrlError: boolean;
  pageName: string;
  handlePgNameChange: (event: any) => void;
  showPageNameError: boolean;
  handleUrlChange: (event: any) => void;
  pageUrl: string;
};
