import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  previewTabsButtons: {
    "& button": {
      minWidth: "60px !important",
      minHeight: "100%",
      color: "#14142B",
      "&.Mui-selected": {
        backgroundColor: "#F7F7FC",
        color: "#14142B",
      },
    },
  },
}));
