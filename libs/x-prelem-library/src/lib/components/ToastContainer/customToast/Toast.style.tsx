import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  toaster: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& .title_description": {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      marginLeft: "10px",
      "& .title": {
        margin: "0px",
      },
      "& .description": {
        margin: "0px",
      },
    },
  },
}));
