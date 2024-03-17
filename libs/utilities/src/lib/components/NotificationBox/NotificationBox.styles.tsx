import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => ({
  notificationContainer: {
    position: "relative",
    color: "#14142b",
    display: "none",
    alignTtems: "center",
    [theme.breakpoints.up("xs")]: {
      margin: "0 10px",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 30px",
    },
  },
}));
