import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    cookiePolicyWrapper: {
      "&.cookiePolicyBg": {
        background: theme?.palette?.prelemType3?.BACKGROUND,
        width: "100%",
        height: "fit-content",
        minHeight: "100px",
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: "10px 40px",
        zIndex: 9999,
        "& .link": {
          color: theme?.palette?.prelemType3?.LINK,
        },
        "& .checkedColor": {
          width: "18px",
          margin: 0,
          marginRight: theme.spacing(1.5),
        },
        "& .description": {
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(2.5),
        },
      },
    },
  };
});
