import { makeStyles } from "@mui/styles";
// import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles((theme: any) => ({
  commonPreviewPageRender: {
    "&.contentPreviewPage": {
      "& .eventPageContent .eventsParent": {
        height: "100vh !important",
      },
      "& .eventPageContent .eventsummaryWrapper": {
        height: "100vh !important",
      },
    },
  },
}));
