export interface Menus {
  Label: string;
  Description: string;
  URL: string;
  Submenu: [];
  content_type_value: {
    Image: string;
    Title: string;
    Description?: string;
    RedirectionUrl?: string;
    ContentType: string;
    Internal: boolean;
    CreatedDate: string;
    Author: string;
  };
  MegaMenu?: boolean;
  Menu_Id: number;
  Internal: boolean;
  IsCurrentTab: boolean;
  menuicon: string;
}

export interface IHeader {
  search: string;
  language: string;
  // HeaderLogo: string;
  userInfo: { name: string; img: string };
  Menus: Menus[];
  cta_title: string;
  cta_url: string;
  header_logo: string;
}

export interface HeaderProps {
  data?: any;
  homePageUrl: string;
  logoutButtonHandle?: any;
  langCode: string;
  isCartIconEnable?: boolean;
  isProductUpdateCount?: any;
  navigateToCartPage?: any;
  gcpUrl?: string;
  bucketName?: string;
  onLogin?: () => void;
  handleChangePassword?: () => void;
  handleMyProfile?: () => void;
  isLoginEnabled?: boolean;
  userData?: any;
  secondaryArgs?: any;
  isAuthoring?: boolean;
  authData?: any;
  isEcomPage?: any;
}
