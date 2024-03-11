import { makeStyles } from "@material-ui/core";

export const useCreatesiteStepStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10px",
    marginLeft: "7px",
  },
  usesearchbox: {
    width: "251px",
  },
  typoimgtext: {
    marginLeft: "15px",
  },
  containerbox: {
    display: "flex",
  },
  backicon: {
    display: "flex",
    padding: "3px",
  },
  topheader: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      float: "left",
      marginLeft: "27px",
      marginTop: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      float: "left",
      marginLeft: "10px",
      marginTop: "10px",
    },

    display: "flex",
    float: "right",
    marginRight: "27px",
  },
  topheadermodal: {
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      bottom: "16px",
      width: "94%",
    },
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      bottom: "16px",
      width: "88%",
    },
    display: "flex",
    float: "right",
    marginRight: "27px",
  },
  textcen: {
    textAlign: "center",
  },
  foldericon: {
    [theme.breakpoints.down("sm")]: {
      width: "45px",
      height: "45px",
    },
  },
  innercontainerbox: {
    margin: "0px 12px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #14142B",
    display: "flex",
    height: "46px",
    width: "42px",
    alignItem: "center",
    cursor: "pointer",
    justifyContent: "center",
  },

  boxalign: {
    [theme.breakpoints.down("md")]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  },
  innercontainer: {
    display: "flex",
    marginTop: "8px",
    marginLeft: "8px",
  },
  boxcloseinnercontain: {
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },

  modalboxtypo: {
    // width: calc(100% - 68px),
    paddingRight: "24px",
    marginLeft: "20px",
  },
  sitedropdownicon: {
    width: "10%",
  },
  boxicon: {
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: "40px",
    flexDirection: "column",
  },
  closeiconmodal: {
    right: "44px",
  },
  modalnecontain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5px",
    backgroundColor: "#FCFCFC",
    padding: "11px 20px",
  },
  modaltyponew: {
    marginLeft: "10px !important",
  },
  closeiconreop: {
    position: "absolute",
    marginTop: "13px",
    right: "0",
    top: "0",
  },
  modalbtn: {
    minWidth: "100%",
  },
  sitecontenttypo: {
    marginLeft: "30px",
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
  boxsize: {
    height: "420px",
    padding: " 0px 30px",
    borderRadius: "5px",
  },
  toptypography: {
    display: "flex",
    marginTop: "15px",
    justifyContent: "space-between",
  },
  Boxinner: {
    border: "1px solid #14142B",
    width: "38px",
    marginTop: "4px",
    height: "38px",
    alignItems: "center",
    borderRadius: "5px",
    marginRight: "10px",
  },
  boximg: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
    marginTop: "5px",
  },
  folderlistings: {
    height: "500px",
    marginTop: "8px",
    overflow: "auto",
    marginLeft: "8px",
    marginRight: "8px",
    width: "98%",
    spacing: 2,
    rowSpacing: 4,
    padding: "15px",
  },
  mockimg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  innerimagetext: {
    borderBottom: "1px solid #FFF",
    display: "inline-flex",
    color: "white",
  },
  modalbox: {
    textAlign: "right",
    cursor: "pointer",
    marginTop: "15px",
  },
  closeicon: {
    position: "absolute",
    marginTop: "15px",
    right: "34px",
  },
  modalcontain: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    paddingLeft: "10%",
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
  folderouticon: {
    margin: "0 14px 0 14px",
  },
  breadsize: {
    fontSize: "31px !impportant",
  },
  breadcrumbsFont: {
    fontSize: "31px",
  },
  createfol: {
    marginTop: "10px !important",
  },
  modalgrid: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5px",
      paddingLeft: "10px",
      backgroundColor: "#F7F7FC",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      paddingLeft: "0px",
      backgroundColor: "#F7F7FC",
      height: "0px",
    },
    marginLeft: "5px",
    paddingLeft: "10px",
    backgroundColor: "#F7F7FC",
    width: "601px",
    height: "768px",
  },

  modalcontainer: {
    marginTop: "14px",
  },
  assetmodalbox: {
    [theme.breakpoints.down("md")]: {
      marginTop: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    borderRadius: "5px",
    height: "600px",
    border: "1px solid #D9DBE9",
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
  boxasset: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },

    width: "83%",
    position: "absolute",
    top: "16px",
    left: "16px",
    alignItems: "flex-end",
    justifyContent: "space-between",
    display: "flex",
  },
  wrapperimage: {
    [theme.breakpoints.down("md")]: {
      position: "relative",
    },
    position: "absolute",
    bottom: "16px",
    left: "16px",
    width: "100%",
  },
  boxassetstep: {
    [theme.breakpoints.down("md")]: {
      top: "22px",
    },
    top: "10px",
    right: "20px",
    width: "20px",
    position: "absolute",
  },
  boxassetstep1: {
    top: "1px",
    right: "6px",
    width: "8px",
    position: "absolute",
  },

  filternewicon: {
    [theme.breakpoints.up("xs")]: {
      padding: "8px",
      height: "42px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "10px",
      height: "46px",
    },
    backgroundColor: "white",
    borderRadius: "4px",
    border: "1px solid #14142B",
    display: "flex",
    width: "42px",
    marginRight: "10px",
    alignItem: "center",
    cursor: "pointer",
    justifyContent: "center",
  },
  boxassetsteps: {
    width: "83%",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
  },
  cardName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "240px",
  },
  adjusttext: {
    [theme.breakpoints.down("md")]: {
      color: "black",
    },
    color: "white",
    bottom: "16px",
    left: "16px",
    textTransform: "capitalize",
  },
  draftbtn: {
    borderRadius: "5px",
    backgroundColor: "#FFCD41 !important",
  },
  typodoticon: {
    [theme.breakpoints.down("md")]: {
      color: "black",
    },
    cursor: "pointer",
    color: "white",
  },
  typodotsicon: {
    cursor: "pointer",
    color: "#FFF !important",
  },

  deskcontain: {
    border: "1px solid #14142B !important",
    width: "38px",
    height: "38px",
    marginTop: "4px",
    alignItems: "center",
    borderRadius: "5px",
    marginRight: "10px",
  },
  marginLeft15: {
    marginLeft: "15px !important",
    textTransform: "capitalize",
  },
  marginleftImageCard: {
    marginLeft: "5px !important",
  },
  marginTop: {
    marginTop: "5px",
    textTransform: "capitalize",
  },
  xlogo: {
    marginTop: "8px",
  },
  progrebar: {
    marginTop: "25px",
  },
  textmargin: {
    marginTop: "30px",
  },
  handsicon: {
    marginTop: "10px",
  },
  inputselect: {
    maxWidth: "510px",
  },
  cancelbtn: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: "76px",
    marginTop: "20px",
  },
  innercancel: {
    marginRight: "10px !important",
  },
  createcontain: {
    height: "107px",
    textalign: "center",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "40px",
    alignItems: "center",
    marginLeft: "99px",
  },
  typowidth: {
    maxWidth: "324px",
  },
  siteicon: {
    textAlign: "center",
  },
  siteiconinner: {
    marginBottom: "30px",
    marginRight: "10px",
  },
}));
