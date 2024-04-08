import { makeStyles } from "@mui/styles";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles(() => ({
  container: {
    [`@media(min-width:${ThemeConstants.XS}px)`]: {
      display: "flex",
    },
    [`@media(min-width:${ThemeConstants.SM}px)`]: {
      display: "flex",
    },
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
    position: "relative",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: ThemeConstants.WHITE_COLOR,
    color: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    left: 0,
    paddingLeft: "16px",
  },
  backIcon: {
    marginRight: "10px",
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ced3d9",
    borderRadius: "24px",
  },
}));
