import { makeStyles } from "@mui/styles";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles(() => {
  return {
    container: {
      "&.main-container": {
        transition: "all 0.3s",
        alignItems: "center",
        padding: "12px 20px",
        display: "flex",
        minHeight: "72px",
        background: "#ffffff",
        border: "1px solid #ced3d9",
        borderRadius: "4px",
        marginBottom: "14px",
        [`@media(max-width:${ThemeConstants.EM}px)`]: {
          padding: "5px 10px",
        },
        "& .member-image": {
          minWidth: "44px",
          minHeight: "44px",
          maxWidth: "44px",
          maxHeight: "44px",
          overflow: "hidden",
          borderRadius: "5px",
          marginRight: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          [`@media(max-width:${ThemeConstants.EM}px)`]: {
            marginRight: "10px",
            display: "none",
          },
        },
        "& .date-time-mobile": {
          "&:after": {
            content: "''",
            position: "absolute",
            color: "white",
            left: "0px",
            top: "0",
            bottom: "0",
            margin: "auto",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#2d2d39",
          },
          position: "relative",
          display: "none",
          order: "inherit",
          marginLeft: "10px",
          paddingLeft: "14px",
          [`@media(max-width:${ThemeConstants.EM}px)`]: {
            display: "flex",
            order: "3",
            paddingLeft: "10px",
          },
        },
        "& .date-time-web": {
          display: "inline-flex",
          padding: "0 30px",
          minWidth: "182px",
          marginRight: "30px",
          minHeight: "40px",
          alignItems: "center",
          borderLeft: "1px solid #ced3d9",
          maxWidth: "170px",
          justifyContent: "center",
          textAlign: "center",
          [`@media(max-width:${ThemeConstants.EM}px)`]: {
            display: "none",
          },
        },
        "&:hover": {
          boxShadow: "0px 9px 21px rgba(0, 0, 0, 0.07)",
          transition: "all 0.3s",
          borderColor: "#14142B",
        },
      },
    },
  };
});
