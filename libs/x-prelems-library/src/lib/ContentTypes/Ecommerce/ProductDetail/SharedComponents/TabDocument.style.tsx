import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productDetailTabWrapper: {
      "&.full-row-tabcontainer": {
        width: "100%",
        "& .product-detail-tab-item": {
          background: theme.palette.prelemType3.TAB.VARIANT1.TITLE_BACKGROUND,
          color: theme.palette.prelemType3.TAB.VARIANT1.TITLE,
          textTransform: "capitalize",
          marginRight: "5px",
          border: "none",
          fontFamily: theme.fontFamily.secondary,
          height: "55px",
          minWidth: "200px",
          padding: "16px",
          [theme.breakpoints.down("md")]: {
            "&.Platform-x-ButtonBase-root.Platform-x-Tab-root": {
              padding: "13px 10px",
              minWidth: "108px !important",
              wordWrap: "break-word",
              width: "33%",
            },
          },
        },
        "& button.Mui-selected": {
          backgroundColor: theme.palette.prelemType3.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND,
          color: theme.palette.prelemType3.TAB.VARIANT1.TITLE_ACTIVE,
          "& span": {
            background: "transparent !important",
          },
        },
        "& .product-detail-tabs .MuiTabs-indicator": {
          display: "none",
        },
        "& .tab-detail-wrapper": {
          background: theme.palette.prelemType3.BACKGROUND,
          color: theme.palette.prelemType3.PARAGRAPH,
          borderTop: `1px solid ${theme.palette.prelemType3.LINE}`,
          borderBottom: `1px solid ${theme.palette.prelemType3.LINE}`,
          minHeight: "150px",
        },
        "& .tab-detail": {
          padding: "0px 110px",
          [theme.breakpoints.up("sm")]: {
            padding: "50px !important",
            height: "395px !important",
          },
          [theme.breakpoints.only("md")]: {
            padding: "50px !important",
            height: "395px !important",

            ".Platform-x-ButtonBase-root.Platform-x-Tab-root.Mui-selected": {
              width: "108px",
            },
          },
        },
        "& .Platform-x-Tabs-indicator": {
          backgroundColor: "transparent !important",
        },
        [theme.breakpoints.down("sm")]: {
          ".product-detail-tab-wrapper .product-detail-tab-item:first-child": {
            marginLeft: "0px",
          },
        },
      },
    },
  };
});
