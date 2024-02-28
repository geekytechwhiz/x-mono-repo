import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ContentSectionWrapper: {
      "&.ContentSectionBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        width: "100%",
        padding: "60px 0 0 0",
        "& .tabsWp": {
          "& .Platform-x-ButtonBase-root": {
            padding: "16px 12px",
            minWidth: "91px",
            border: "0",
            marginRight: "10px",
            color: theme.palette.prelemType1.TITLE,
            textTransform: "uppercase",
            "&.Mui-selected": {
              background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND,
              color: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE,
            },
          },
        },
      },
    },
  };
});
