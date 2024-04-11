import { makeStyles } from "@mui/styles";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles((theme: any) => ({
  commonPreviewPageRender: {
    "&.contentPreviewPage": {
      "& .eventPageContent .eventsParent": {
        height: "100vh !important",
      },
      "& .eventPageContent .eventsummaryWrapper": {
        height: "100vh !important",
      },
      "& .xloader": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      },
      "& .headerBackground": {
        height: "60px",
      },
    },
  },
  commonPreviewWrapper: {
    "&.commonPreviewWrapper": {
      "& .leftPannelAndIframeWrapper": {
        [`@media(max-width:${ThemeConstants.SM}px)`]: {
          display: "block",
        },
        display: "flex",
      },
      "& .backArrow": {
        padding: "18px 16px",
        display: "flex",
      },
      "& .leftMenuPanel": {
        width: "60px",
        height: "100vh",
        [`@media(max-width:${ThemeConstants.SM}px)`]: {
          width: "100%",
          height: "46px",
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
          boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)",
        },
        "& .tabsItemsWrapper": {
          [`@media(max-width:${ThemeConstants.SM}px)`]: {
            display: "flex",
          },
        },
        "& .tabsItemIcons": {
          padding: "18px 18px",
          [`@media(max-width:${ThemeConstants.SM}px)`]: {
            padding: "9px 18px",
          },
        },
      },
      "& .rightIframePanelWrapper": {
        width: "100%",
        marginLeft: 0,
        boxShadow: `rgba(0, 0, 0, 0.1) -2px 0px 2px`,
        overflowY: "auto",
      },
      "& .rightIframePanel": {
        display: "flex",
        margin: " 0 auto",
        transition: "width 0.3s",
        "& .prelemResponsivePreview": {
          color: "red",
          [`@media(max-width:${ThemeConstants.EM}px)`]: {
            borderRadius: "0 !important",
          },
        },
      },
    },
  },
}));
