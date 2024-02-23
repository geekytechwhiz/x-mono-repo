import AddImage from "./lib/components/AddImage/AddImage";
import AutoCompleteMultiSelect from "./lib/components/AutoCompleteMultiSelect/AutoCompleteMultiSelect";
import AutoTextArea from "./lib/components/AutoTextArea/AutoTextArea";
import { CommonBoxWithNumber } from "./lib/components/CommonBoxWithNumber/CommonBoxWithNumber";
import ContentGridLoader from "./lib/components/ContentGridLoader";
import DatePicker from "./lib/components/DatePicker/DatePicker";
import DuplicateContentPopup from "./lib/components/DuplicateContentPopup/DuplicateContentPopup";
import Error from "./lib/components/Error/Error";
import Icons from "./lib/components/Icons";
import { ErrorTooltip } from "./lib/components/ErrorTooltip/ErrorTooltip";
import ToastContainerHandle from "./lib/components/ToastContainer/ToastContainerHandle";
// import Gallery from './lib/components/Gallery/Gallery'
import { MiniHeader } from "./lib/components/Header/MiniHeader";
import LanguageDropDown from "./lib/components/LanguageDropDown/LanguageDropDown";
import { Loader } from "./lib/components/Loader";
//import ContentListLoader from "./lib/components/Loader/ContentListLoader";
import General_community from "./lib/assets/svg/General_community.svg";
import News_community from "./lib/assets/svg/News_community.svg";
import ContentListDesktopLoader from "./lib/components/Loader/ContentListDesktopLoader";
import ContentListMobileLoader from "./lib/components/Loader/ContentListLoaderMobile";
import { NoContentFound } from "./lib/components/NoContentFound/NoContentFound";
import NoSearchResult from "./lib/components/NoSearchResult/NoSearchResult";
import {
  default as DeletePopup,
  default as PlateformXDialog,
} from "./lib/components/Popups/PlateformXDialog";
import PlateformXDialogSuccess from "./lib/components/Popups/SuccessPopup";
import RadioControlLabel from "./lib/components/RadioControlLabel";
import { RadioLabelWithSubheading } from "./lib/components/RadioLabelWithSubheading";
import SkeltonLoader from "./lib/components/Skeleton-loader/skeleton";
import BasicSwitch from "./lib/components/Switch/Switch";
import TaskNotFound from "./lib/components/TaskNotFound/TaskNotFound";
import TextBox from "./lib/components/TextBox/TextBox";
import {
  ShowToastError,
  ShowToastSuccess,
} from "./lib/components/ToastNotification/ToastNotification";
// import { XDialog } from './lib/components/XDialog/XDialog'
import XLoader from "./lib/components/XLoader/XLoader";
//import ArticleListDesktopLoader from "./lib/components/contentListLoaderDesktop";
import {
  AUTH_INFO,
  AUTH_URL,
  LOGOUT_URL,
  NEW_LOGOUT_URL,
  REDIRECT_AUTH_URL,
} from "./lib/constants/AuthConstant";
import { USERNAME_EMAIL_EXIST } from "./lib/constants/CommonConstants";
import useAccess from "./lib/hooks/useAccess/useAccess";
import usePlatformAnalytics from "./lib/hooks/usePlatformAnalytics/usePlatformAnalytics";
import { usePrelemImpression } from "./lib/hooks/usePrelemImpression/usePrelemImpression";
import useUserSession from "./lib/hooks/useUserSession/useUserSession";
import { ArticleMapper } from "./lib/mappers/articleMapper";

import ThemeConstants from "./lib/themes/authoring/lightTheme/lightThemeVariable";
import LightTheme from "./lib/themes/authoring/theme";
// import PrelemsDarkThemeConstants from "./lib/themes/prelems/DarkTheme";
// import PrelemsFeyenoordThemeConstants from "./lib/themes/prelems/Feyenoord";
// import PrelemsFifaThemeConstants from "./lib/themes/prelems/Fifa";
// import PrelemsHockeyAustraliaThemeConstants from "./lib/themes/prelems/HockeyAustralia";
// import PrelemsLightThemeConstants from "./lib/themes/prelems/LightTheme";
import PrelemTheme from "./lib/themes/prelems/prelemTheme";
// import { LanguageList } from "./lib/utils/helperConstants";
import NoResultsFound from "./lib/components/NoResultsFound";
import {
  Answers,
  ColorPallet,
  ErrorHandleAutoTextArea,
  ErrorHandleTextBox,
  FormikField,
  SectionWrapper,
  TextArea,
  TitleSubTitle,
  XButton,
  XCheckBox,
  XDatePicker,
  XFileUpload,
  XSwitch,
  XTable,
  XTextArea,
  workflowKeys,
} from "./lib/components/SchemaComponents";
import StructureDataDialog from "./lib/components/StructuresDataDialog/StructureDataDialog";
import XDialog from "./lib/components/XDialog/XDialog";
import prelemTypes from "./lib/themes/prelems/globalStyle";
import { getUniqueTimeZone } from "./lib/utils/helperFns";
import i18next from "./lib/utils/i18next";

const InterRegular = require("./lib/fonts/Inter/Inter-Regular.woff2") as string;

export * from "./lib/assets/footer";
export * from "./lib/assets/gif";
export * from "./lib/assets/header";
export * from "./lib/assets/images";
export * from "./lib/assets/pngIcons";
export * from "./lib/assets/svg";
export * from "./lib/assets/svg/icon";
export * from "./lib/components";
export * from "./lib/components/CardSkeleton/CardSkeleton";
export * from "./lib/components/SchemaComponents";
export * from "./lib/components/ToastNotification/ToastNotification";
export * from "./lib/constants/AuthConstant";
export * from "./lib/constants/CommonConstants";
export * from "./lib/hooks/useAccess/useMapPermissions";
export * from "./lib/layouts/TwoColumns/TwoColumnLayout";
export * from "./lib/mappers/articleMapper";
export * from "./lib/themes/authoring/theme";
export * from "./lib/themes/prelems/prelemTheme";
export * from "./lib/utils/helper";
export * from "./lib/utils/helperConstants";
export * from "./lib/utils/helperFns";
export * from "./lib/utils/interface";

export {
  AUTH_INFO,
  AUTH_URL,
  AddImage,
  Answers,
  ArticleMapper,
  AutoCompleteMultiSelect,
  AutoTextArea,
  BasicSwitch,
  ColorPallet,
  CommonBoxWithNumber,
  // CommonImageRender,
  ContentGridLoader,
  ContentListDesktopLoader,
  ContentListMobileLoader,
  DatePicker,
  DeletePopup,
  DuplicateContentPopup,
  Error,
  ErrorHandleAutoTextArea,
  ErrorHandleTextBox,
  ErrorTooltip,
  FormikField,
  General_community,
  // Gallery,
  InterRegular,
  LOGOUT_URL,
  LanguageDropDown,
  LightTheme,
  Loader,
  MiniHeader,
  NEW_LOGOUT_URL,
  News_community,
  NoContentFound,
  NoResultsFound,
  NoSearchResult,
  PlateformXDialog,
  PlateformXDialogSuccess,
  PrelemTheme,
  REDIRECT_AUTH_URL,
  RadioControlLabel,
  RadioLabelWithSubheading,
  SectionWrapper,
  ShowToastError,
  ShowToastSuccess,
  SkeltonLoader,
  StructureDataDialog,
  TaskNotFound,
  TextArea,
  TextBox,
  ThemeConstants,
  TitleSubTitle,
  ToastContainerHandle,
  // TitleSubTitle,
  USERNAME_EMAIL_EXIST,
  XButton,
  XCheckBox,
  XDatePicker,
  // ArticleListDesktopLoader,
  XDialog,
  XFileUpload,
  XLoader,
  XSwitch,
  XTable,
  XTextArea,
  getUniqueTimeZone,
  i18next,
  prelemTypes,
  useAccess,
  usePlatformAnalytics,
  usePrelemImpression,
  useUserSession,
  workflowKeys,
  Icons,
};
