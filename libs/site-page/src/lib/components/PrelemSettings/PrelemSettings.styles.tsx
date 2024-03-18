import { makeStyles } from "@mui/styles";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = (props = "") =>
  makeStyles(() => ({
    blackRoundIcon: {
      margin: "8px",
      width: props === "summary" ? "25px" : "40px",
      height: props === "summary" ? "25px" : "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    imageBoxInner: {
      position: "absolute",
      top: "0",
      width: props === "summary" ? "60%" : "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#7470708a",
      borderRadius: "5px 5px 0 0",
    },
    imageBox: {
      position: "relative",
      display: "flex",
      marginBottom: "16px",
      "& img": {
        width: "100%",
        height: "147px",
      },
    },
    uploadImageBox: {
      borderRadius: "5px 5px 0 0",
      height: "147px",
      cursor: "pointer",
      backgroundColor: ThemeConstants.PRIMARY_COLOR[400],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    TwiterInfoBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "60%",
    },
    TwiterInfoImageBox: {
      display: "flex",
      borderRadius: "5px",
      border: "1px solid #EFF0F6",
      backgroundColor: ThemeConstants.WHITE_COLOR,
      position: "relative",
    },
    imageTitle: {
      width: "40%",
      wordBreak: "break-all",
      flexDirection: "column",
      display: "flex",
    },
  }));
