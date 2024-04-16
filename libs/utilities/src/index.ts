import General_community from "./lib/assets/svg/General_community.svg";
import News_community from "./lib/assets/svg/News_community.svg";
import AutoCompleteMultiSelect from "./lib/components/AutoCompleteMultiSelect/AutoCompleteMultiSelect";
import AutoTextArea from "./lib/components/AutoTextArea/AutoTextArea";
import { CommonBoxWithNumber } from "./lib/components/CommonBoxWithNumber/CommonBoxWithNumber";
import ContentGridLoader from "./lib/components/ContentGridLoader";
import DatePicker from "./lib/components/DatePicker/DatePicker";
import DuplicateContentPopup from "./lib/components/DuplicateContentPopup/DuplicateContentPopup";
import Error from "./lib/components/Error/Error";
import ErrorBoundary from "./lib/components/ErrorBoundary";
import { ErrorTooltip } from "./lib/components/ErrorTooltip/ErrorTooltip";
import { MiniHeader } from "./lib/components/Header/MiniHeader";
import Icons from "./lib/components/Icons";
import LanguageDropDown from "./lib/components/LanguageDropDown/LanguageDropDown";
import { Loader } from "./lib/components/Loader";
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
import ChartSkeltonLoader from "./lib/components/Skeleton-loader/chartSkelton";
import SkeltonLoader from "./lib/components/Skeleton-loader/skeleton";
import BasicSwitch from "./lib/components/Switch/Switch";
import TaskNotFound from "./lib/components/TaskNotFound/TaskNotFound";
import TextBox from "./lib/components/TextBox/TextBox";
import ToastContainerHandle from "./lib/components/ToastContainer/ToastContainerHandle";
import {
  ShowToastError,
  ShowToastSuccess,
} from "./lib/components/ToastNotification/ToastNotification";
import {
  AUTH_INFO,
  AUTH_URL,
  LOGOUT_URL,
  NEW_LOGOUT_URL,
  REDIRECT_AUTH_URL,
} from "./lib/constants/AuthConstant";

import XAnimatedLoader from "./lib/assets/gif/Common-Loader-dark.gif";
import PlaceOrderGIf from "./lib/assets/gif/placeOrderSuccess.gif";
import DeleteGif from "./lib/assets/gif/delete.gif";
import loadergif from "./lib/assets/gif/holi-loader.gif";
import ProgressiveLoader from "./lib/assets/gif/progressiveLoader2.gif";
import liveIcon from "./lib/assets/gif/red_blinking_gif.gif";
import CommonContentRender from "./lib/components/CommonPreview/CommonContentRender";
import CommonPreview from "./lib/components/CommonPreview/CommonPreview";
import ArticleListMobileLoader from "./lib/components/Loader/article-list-loader-mobile";
import CommonPlateformXDialog from "./lib/components/Modal/CommonPlateformXDialog";
import NoResultsFound from "./lib/components/NoResultsFound";
import {
  Answers,
  ColorPallet,
  ErrorHandleAutoTextArea,
  ErrorHandleTextBox,
  FormikField,
  MultiSelect,
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

import LoadingTextModal from "./lib/components/LoadingTextModal";
import NotificationBox from "./lib/components/NotificationBox/NotificationBox";
import Submit from "./lib/components/Submit/Submit";
import { ToolTip } from "./lib/components/Tooltip/ToolTip";
import XDialog from "./lib/components/XDialog/XDialog";
import { USERNAME_EMAIL_EXIST } from "./lib/constants/CommonConstants";
import { usePageImpression } from "./lib/hooks/customHook/PageImpressionHook";
import useAccess from "./lib/hooks/useAccess/useAccess";
import usePlatformAnalytics from "./lib/hooks/usePlatformAnalytics/usePlatformAnalytics";
import { usePrelemImpression } from "./lib/hooks/usePrelemImpression/usePrelemImpression";
import useUserSession from "./lib/hooks/useUserSession/useUserSession";
import i18next from "./lib/i18next";
import { ArticleMapper } from "./lib/mappers/articleMapper";
import ThemeConstants from "./lib/themes/authoring/lightTheme/lightThemeVariable";
import LightTheme from "./lib/themes/authoring/theme";
import prelemTypes from "./lib/themes/prelems/globalStyle";
import PrelemTheme from "./lib/themes/prelems/prelemTheme";
import {
  capitalizeFirstLetter,
  getCurrentLang,
  getFormattedImageUrl,
  getSubDomain,
  getUniqueTimeZone,
  handleHtmlTags,
  onBackButtonEvent,
  trimString,
  unloadCallback,
} from "./lib/utils/helperFns";
import { doneInsituEditing, initInsituEditing } from "./lib/utils/insituEditing";

const InterRegular = require("./lib/fonts/Inter/Inter-Regular.woff2") as string;

export * from "./lib/assets/footer";
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
  Answers,
  ArticleListMobileLoader,
  ArticleMapper,
  AutoCompleteMultiSelect,
  AutoTextArea,
  BasicSwitch,
  ChartSkeltonLoader,
  ColorPallet,
  CommonBoxWithNumber,
  CommonContentRender,
  CommonPlateformXDialog,
  CommonPreview,
  ContentGridLoader,
  ContentListDesktopLoader,
  ContentListMobileLoader,
  DatePicker,
  DeleteGif,
  DeletePopup,
  DuplicateContentPopup,
  Error,
  ErrorBoundary,
  ErrorHandleAutoTextArea,
  ErrorHandleTextBox,
  ErrorTooltip,
  FormikField,
  General_community,
  Icons,
  InterRegular,
  LOGOUT_URL,
  LanguageDropDown,
  LightTheme,
  Loader,
  LoadingTextModal,
  MiniHeader,
  MultiSelect,
  NEW_LOGOUT_URL,
  News_community,
  NoContentFound,
  NoResultsFound,
  NoSearchResult,
  NotificationBox,
  PlateformXDialog,
  PlateformXDialogSuccess,
  PrelemTheme,
  ProgressiveLoader,
  REDIRECT_AUTH_URL,
  RadioControlLabel,
  RadioLabelWithSubheading,
  SectionWrapper,
  ShowToastError,
  ShowToastSuccess,
  SkeltonLoader,
  StructureDataDialog,
  Submit,
  TaskNotFound,
  TextArea,
  TextBox,
  ThemeConstants,
  TitleSubTitle,
  ToastContainerHandle,
  ToolTip,
  USERNAME_EMAIL_EXIST,
  XAnimatedLoader,
  XButton,
  XCheckBox,
  XDatePicker,
  XDialog,
  XFileUpload,
  XSwitch,
  XTable,
  XTextArea,
  capitalizeFirstLetter,
  doneInsituEditing,
  getCurrentLang,
  getFormattedImageUrl,
  getSubDomain,
  getUniqueTimeZone,
  handleHtmlTags,
  i18next,
  initInsituEditing,
  liveIcon,
  loadergif,
  onBackButtonEvent,
  prelemTypes,
  trimString,
  unloadCallback,
  useAccess,
  usePageImpression,
  usePlatformAnalytics,
  usePrelemImpression,
  useUserSession,
  workflowKeys,
  PlaceOrderGIf,
};
