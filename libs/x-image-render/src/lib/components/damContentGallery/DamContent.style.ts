import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";
import { ThemeConstants } from "@platformx/utilities";

const useDamContent = makeStyles(() => {
  const theme = useTheme();
  return {
    parentGrid: {
      background: ThemeConstants.WHITE_COLOR,
      [theme.breakpoints.up("xs")]: {
        display: "block",
      },
      [theme.breakpoints.up("em")]: {
        display: "none",
      },
      [theme.breakpoints.up("lg")]: {
        padding: "14px 32px 10px 15px",
        top: "50px !important",
      },
    },
    marginLeft: {
      marginLeft: "6px",
    },
    damDropdown: {
      [theme.breakpoints.up("xs")]: {
        padding: "8px",
      },
      [theme.breakpoints.up("em")]: {
        padding: "8px 16px 10px 16px",
      },
    },
  };
});

export default useDamContent;
