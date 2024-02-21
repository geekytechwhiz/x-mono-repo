import { makeStyles } from "@material-ui/core";

export const useStoryStyle = makeStyles((theme) => ({
  pageContainer: {
    [theme.breakpoints.up("xs")]: {
      padding: "15px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "0px, 250px",
    },
  },

  contentContainer: {
    maxWidth: "67%",
    position: "relative",
    width: "100%",
    margin: "auto",
    height: "calc(100vh - 160px)",
  },
  contentContainernew: {
    maxWidth: "57%",
    position: "relative",
    width: "100%",
    margin: "auto",
    height: "calc(100vh - 160px)",
  },
  boxin: {
    display: "flex",
    padding: "10px",
    alignItems: "flex-start",
    gap: "10px",
    margin: "0px 0px 20px 20px",
    borderRadius: "5px",
    border: "1px solid #D9DBE9",
    cursor: "pointer",
    "&:active": {
      border: "1px solid #4B9EF9",
    },
  },
  selected: {
    border: "1px solid #4B9EF9",
  },
  boxintypo: {
    flexDirection: "row",
  },
  borderbox: {
    display: "flex",
    width: "60px",
    height: "62px",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
    borderRadius: "5px",
    background: "#FCFCFC",
  },
  borderboxnew: {
    backgroundColor: "#4B9EF9",
    color: "white",
  },
  contenttypeicon: {
    "& img": {
      filter: "brightness(0) invert(1)",
    },
  },
  containerbox: {
    display: "flex",
  },
  gcontainer: {
    position: "relative",
    top: "30%",
  },
  typobreak: {
    wordBreak: "break-all",
  },
  typobreakn: {
    wordBreak: "break-all",
    color: "#4B9EF9",
  },
  typobreaknew: {
    wordBreak: "break-all",
  },
  backicon: {
    display: "flex",
    padding: "3px",
  },

  modalbread: {
    padding: "30px",
    backgroundColor: "#FCFCFC",
    borderRadius: "16px",
  },
  assetyesicon: {
    [theme.breakpoints.down("md")]: {
      left: "262px",
    },
    position: "absolute",
    float: "left",
    left: "20px",
    bottom: "20px",
    cursor: "pointer",
  },
  assetnoicon: {
    position: "absolute",
    right: "20px",
    cursor: "pointer",
    bottom: "20px",
  },
  sitecontenttypo: {
    marginLeft: "30px",
    marginTop: "5px",
  },
  keyrighticon: {
    paddingRight: "6px",
    marginTop: "5px",
  },
  settingicon: {
    marginRight: "15px",
  },
  borderbottomtype: {
    borderBottom: "1px solid #D9DBE9",
    marginTop: "5px",
    height: "56px",
  },
  dialogboxin: {
    padding: "15px",
    display: "flex",
    borderBottom: "1px solid #D9DBE9",
    position: "relative",
  },
  boxbtn: {
    display: "flex",
    position: "absolute",
    right: "10px",
    bottom: "10px",
  },
  modalbox: {
    cursor: "pointer",
    position: "relative",
    top: "10px",
    right: "15px",
  },
  btn: {
    marginRight: "10px !important",
  },
  modalboxone: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
  },
  textupload: {
    color: "#6E7191",
    marginTop: "5px",
  },
  modalboxnew: {
    marginTop: "5px",
    width: "100%",
    borderBottom: "1px solid #D9DBE9",
  },
  modaltypo: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5px",
  },
  btnmodal: {
    marginTop: "15px !important",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B9EF9 !important",
    borderRadius: "5px",
    color: "#FFF !important",
  },

  dialograpper: {
    backgorund: "white",
    ".Platform-x-Dialog-paper": {
      maxWidth: "100%",
      overflowX: "hidden",
      minHeight: "590px",
      [theme.breakpoints.up("xs")]: {
        padding: "20px",
      },
      [theme.breakpoints.up("md")]: {
        padding: "25px",
      },
    },
    "@media screen and (min-height: 650px )": {
      minHeight: "640px",
    },
    "@media screen and (max-height: 600px) and (orientation: landscape)": {
      overflowY: "scroll",
      minHeight: "350px",
    },
    [theme.breakpoints.up("md")]: {
      overflowx: "scroll",
    },
  },
  assetboxone: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "100px",
  },
  assetmodalback: {
    [theme.breakpoints.down("md")]: {
      height: "600px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "280px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    height: "600px",
    backgroundColor: "#EFF0F6",
  },

  fileuploadicon: {
    marginTop: "25px",
    marginLeft: "42px",
  },
}));
