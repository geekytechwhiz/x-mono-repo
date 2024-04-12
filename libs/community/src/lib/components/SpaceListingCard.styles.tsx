import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    "space-lising-card-menu": {
      "&.menu-item-tab": {
        [theme.breakpoints.up("em")]: {
          display: "none",
        },
      },
    },
  };
});
