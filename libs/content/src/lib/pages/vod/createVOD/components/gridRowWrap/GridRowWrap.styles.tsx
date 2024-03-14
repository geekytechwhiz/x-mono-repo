import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => ({
  gridWrapRight: {
    [theme.breakpoints.up("xs")]: {
      paddingRight: "10px",
    },
    [theme.breakpoints.up("sm")]: {
      paddingRight: "55px",
    },
  },
}));
