import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      "&.main-container": {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        "& .titleStyles": {
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.up("xs")]: {
            marginBottom: "15px",
          },
          [theme.breakpoints.up("md")]: {
            marginBottom: 0,
          },
          "& h3": {
            textTransform: "uppercase",
          },
        },
        "& .rightSidePart": {
          display: "flex",
          alignItems: "center",
          position: "relative",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            justifyContent: "space-between",
          },
          "& .spaceSearch": {
            [theme.breakpoints.up("md")]: {
              padding: "0 12px",
            },
          },
          "& .rightSidePartAddIcon": {
            marginRight: "5px",
          },
        },
      },
    },
  };
});
