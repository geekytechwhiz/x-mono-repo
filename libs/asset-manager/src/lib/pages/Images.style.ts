import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useImagesStyle = makeStyles((theme: Theme) => ({
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
  filtericon: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "8px",
    },
    border: "1px solid #14142B",
    width: "42px",
    marginTop: "2px",
    height: "46px",
    alignItems: "center",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
  },
  filtericonadd: {
    padding: "10px",
  },
  deleteicon: {
    border: "1px solid #14142B",
    width: "42px",
    marginTop: "2px",
    height: "46px",
    alignItems: "center",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
  },
  deletenewicon: {
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
    delteiconinner: {
      padding: "10px",
    },
  },
  imagecontainer: {
    [theme.breakpoints.down("md")]: {
      paddingRight: "0px",
    },
    marginTop: "8px",
    overflow: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    width: "98%",
    // height: '500px',
    paddingRight: "5px",
    paddingLeft: "5px",
    spacing: 2,
    rowSpacing: 4,
    height: "calc(100vh - 162px)",
    overflowY: "auto",
    "& .infinite-scroll-component__outerdiv": {
      width: "inherit",
    },
  },
  imagecontainers: {
    [theme.breakpoints.down("md")]: {
      paddingRight: "0px",
      marginLeft: "0px",
      marginRight: "0px",
    },
    marginTop: "8px",
    overflow: "auto",
    marginLeft: "8px",
    marginRight: "8px",
    width: "98%",
    paddingRight: "15px",
    spacing: 2,
    rowSpacing: 4,
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

  boxover: {
    height: "461px",
    overflow: "scroll",
    overflowX: "hidden",
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
  editdatacontainer: {
    [theme.breakpoints.down("md")]: {
      padding: "0px 14px",
    },
    marginTop: "10px",
    gap: "20px",
    padding: "10px 20px",
  },
  editmaincontin: {
    borderBottom: "1px solid #ced3d9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editcontain2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btncanceledit: {
    marginRight: "12px !important",
  },
  textlignment: {
    [theme.breakpoints.down("md")]: {
      padding: "8px !important",
      textAlign: "right !important",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "10px 0px !important",
      textAlign: "left !important",
    },
  },
  assetsearch: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginRight: "7px",
  },
  iconbtn: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    position: "relative",
    left: "110px",
  },
  folderadd: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "column",
      height: "250px",
      alignItems: "center",
      padding: "30px",
      borderRadius: "5px",
      background: "#F7F7FC",
      margin: "8px 8px 8px 8px",
      overflow: "hidden",
      position: "relative",
      objectFit: "cover",
    },
    display: "flex",
    justifyContent: "flex-start",
    // flexDirection: 'column',
    alignItems: "center",
    // height: '200px',
    borderRadius: "5px",
    background: "#F7F7FC",
    margin: "8px 8px 8px 8px",
    overflow: "hidden",
    position: "relative",
    objectFit: "cover",
    width: "inherit",
  },
  folderaddstep: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "column",
      height: "250px",
    },
    display: "flex",
    justifyContent: "flex-start",
    // flexDirection: 'column',
    alignItems: "center",
    // height: '200px',
    borderRadius: "5px",
    background: "#F7F7FC",
    margin: "8px 8px 8px 8px",
    overflow: "hidden",
    position: "relative",
    width: "inherit",
  },
  floatleft: {
    float: "left",
  },
  folderlisting: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      padding: "0px 16px",
      height: "79px",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column",
      height: "200px",
      padding: "42px 5px 42px 5px",
    },
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    height: "200px",
    borderRadius: "5px",
    background: "#F7F7FC",
    margin: "0px",
    overflow: "hidden",
    width: "100%",
    padding: "42px",
    cursor: "pointer",
  },
  skelaton1: {
    borderRadius: "5px",
    margin: "8px 8px 8px 8px",
    width: "inherit",
  },
  folderskelaton: {
    [theme.breakpoints.down("sm")]: {
      height: "79px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "200px",
    },
    [theme.breakpoints.up("md")]: {
      height: "250px",
    },
    borderRadius: "5px",
    width: "100%",
  },
  folderlistingstd: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "column",
      height: "250px",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      width: "336px",
      height: "119px",
      padding: "0 16px",
    },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "5px",
    background: "#F7F7FC",
    margin: "0px",
    overflow: "hidden",
    width: "300px",
    padding: "42px",
    cursor: "pointer",
  },
  folderlistingstep: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "45px",
      width: "45px",
    },
    display: "flex",
    justifyContent: "flex-start",
    // flexDirection: 'column',
    alignItems: "center",
    // height: '200px',
    borderRadius: "5px",
    background: "#F7F7FC",
    margin: "0px",
    overflow: "hidden",
    height: "250px",
    width: "100%",
  },

  sitedropdownicon: {
    width: "10%",
  },
  modaltypoin: {
    marginTop: "10px !important",
  },
  typeoexisttest: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "20px",
      textAlign: "left",
      marginTop: "0px",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      textAlign: "center",
      marginTop: "0px",
    },
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: '0px',
    // },
    textAlign: "center",
    marginTop: "9px",
  },
  sitescontent: {
    display: "flex",
    width: "90%",
    justifyContent: "space-between",
    marginLeft: "30px",
    marginTop: "5px",
  },
  breadcum: {
    display: "flex",
    alignItems: "center",
  },
  breadcumtypo: {
    marginLeft: "10px",
    textTransform: "capitalize",
  },
  boxicon: {
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: "40px",
    flexDirection: "column",
  },
  modalassetbox: {
    display: "flex",
    alignItems: "flex-start",
    borderRadius: "5px",
    border: "1px solid #D9DBE9",
    background: "#FFF",
    marginTop: "10px",
    marginLeft: "8px",
    padding: "12px",
    marginRight: "8px",
  },
  circularpro: {
    width: "24px !important",
    height: "24px !important",
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
  beofrecircul: {
    display: "flex",
    alignItems: "center",
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
  sitesearchform: {
    marginTop: "5px",
  },

  boxsize: {
    height: "420px",
    padding: " 0px 30px",
    borderRadius: "5px",
  },
  viewtypography: {
    display: "flex",
    textDecoration: "underline",
    marginTop: "15px",
    marginLeft: "25px",
    borderBottom: "1px solid #D9DBE9",
  },
  typographyadmin: {
    display: "flex",
    marginTop: "83px",
    textDecoration: "underline",
    marginLeft: "20px",
    cursor: "pointer",
  },
  toptypography: {
    display: "flex",
    marginTop: "15px",
    justifyContent: "space-between",
  },
  inputbox: {
    width: "350px",
    height: "68px",
    borderRadius: "5px",
    marginTop: "10px",
    marginLeft: "25px",
    border: "1px solid #D9DBE9",
    cursor: "pointer",
  },
  avatarbox: {
    width: "38px !important",
    height: "38px !important",
    textTransform: "uppercase",
    backgroundColor: "#4B9EF9 !important",
  },
  imageType: {
    textTransform: "capitalize",
    marginLeft: "15px",
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
  modalboxone: {
    display: "flex",
    width: "100%",
    height: "590px",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    padding: "20px",
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
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      paddingLeft: "0px",
    },
    marginLeft: "5px",
    paddingLeft: "10px",
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
}));
