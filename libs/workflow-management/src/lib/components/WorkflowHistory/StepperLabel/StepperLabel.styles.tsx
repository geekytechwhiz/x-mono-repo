import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down(ThemeConstants.SM)]: {
      justifyContent: "flex-start",
    },
  },
  innerContainer: {
    marginLeft: "45px",
    display: "flex",
    flexDirection: "column",
    width: "100px",
    textAlign: "left",
    gap: "4px",
    [theme.breakpoints.down(ThemeConstants.SM)]: {
      marginLeft: "0px",
    },
    [theme.breakpoints.down(ThemeConstants.MD)]: {
      width: "100%",
    },
  },
  labelOne: {
    color: "#A0A3BD",
  },
  labelCompleted: {
    backgroundColor: "#DEF5D9",
    color: "#0FA069",
    padding: "4px 8px",
    borderRadius: "5px",
    width: "max-content",
  },
  labelPending: {
    backgroundColor: "#EFF0F6",
    color: "#A0A3BD",
    padding: "4px 8px",
    borderRadius: "5px",
  },
  labelProgress: {
    backgroundColor: "#D7ECFD",
    color: "#4B9EF9",
    padding: "4px 8px",
    borderRadius: "5px",
  },
}));
