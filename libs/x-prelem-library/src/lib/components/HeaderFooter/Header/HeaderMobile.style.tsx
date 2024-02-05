import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    xMobileheader: {
      "&.xMobileHeaderWrapper": {
        background: theme.palette.header.VARIANT1.BACKGROUND,
        "& .xMobileTopSection": {
          display: "flex",
          padding: "13.5px 3%",
          alignItems: "center",
          "& h4": {
            color: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .menuCloseIcon": {
          cursor: "pointer",
          width: "auto",
        },
        "& .menuListWrapper": {
          justifyContent: "center",
        },
        "& .listButtonItemGap": {
          paddingTop: "0px",
          paddingBottom: "0px",
          "& svg": {
            fill: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .listButtonTextGap": {
          marginTop: "0px",
          marginBottom: "0px",
          "& a": {
            color: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .alignSubMenuItem": {
          textAlign: "center",
          padding: "0 16px",
        },
        "& .alignSubMenuText": {
          textAlign: "left",
          paddingLeft: "10px",
          margin: 0,
          "& h5": {
            color: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .btnOutlined": {
          whiteSpace: "nowrap",
          marginRight: "20px",
          width: "200px",
          textTransform: "none",
          background: theme.palette.header.VARIANT1.BUTTON.BACKGROUND_COLOR,
          color: theme.palette.header.VARIANT1.BUTTON.COLOR,
          borderColor: theme.palette.header.VARIANT1.BUTTON.BORDER_COLOR,
          "&:hover": {
            background: theme.palette.header.VARIANT1.BUTTON.BACKGROUND_COLOR_HOVER,
            color: theme.palette.header.VARIANT1.BUTTON.COLOR_HOVER,
            borderColor: theme.palette.header.VARIANT1.BUTTON.BORDER_COLOR_HOVER,
          },
        },
      },
    },
    xMobileheaderTopSection: {
      "&.mobileHeaderTop": {
        "& .ecommercePanel": {
          margin: "15px 10px 10px 10px",
          "& svg": {
            fill: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .menuIcon": {
          padding: 0,
          color: theme.palette.header.VARIANT1.TITLE,
          "& svg": {
            fill: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .pointer": {
          cursor: "pointer",
        },
        "& .headerTopToolbar": {
          padding: 0,
        },
        "& .toolbarInnerWrapper": {
          flexGrow: 1,
        },
        "& .headerFlagIcon": {
          marginRight: "10px",
        },
      },
    },
  };
});
