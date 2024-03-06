import { makeStyles } from "@material-ui/core";
import { ThemeConstants } from "@platformx/utilities";

export const useCreateAssestsStyle = ({ isShowPreview }) =>
  makeStyles((theme) => ({
    pageContainer: {
      [theme.breakpoints.up("xs")]: {
        padding: "15px !important",
      },
      [theme.breakpoints.up("sm")]: {
        padding: "0",
      },
    },

    contentContainer: {
      maxWidth: "820px",
      margin: "auto",
      marginTop: "7px",
    },

    leftForm: {
      [theme.breakpoints.up("xs")]: {
        paddingRight: "0",
        borderRight: "0",
      },
      [theme.breakpoints.up("sm")]: {
        paddingRight: "32px",
        borderRight: "1px solid #D9DBE9",
      },
    },

    rightForm: {
      [theme.breakpoints.up("xs")]: {
        padding: "24px 0 0 0",
        borderTop: "1px solid #D9DBE9",
        marginTop: "24px",
        display: isShowPreview ? "block" : "none",
      },
      [theme.breakpoints.up("sm")]: {
        padding: "15px 0 15px 32px",
        borderTop: "0",
        marginTop: "0",
        display: "block",
      },
    },

    skeletonTitle: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
      fontSize: ThemeConstants.FONTSIZE_H7,
      lineHeight: ThemeConstants.LINE_HEIGHT_H6,
      color: "#6E7191",
    },
    pictureiconinner: {
      display: "flex",
    },
    deleteicon: {
      marginTop: "12px",
      marginLeft: "10px",
      cursor: "pointer",
    },
    toptypo: {
      padding: "13px 10px",
    },
    topalertbox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#E6EBF5",
    },
    boxfolder: {
      display: "flex",
      border: "1px solid #D9DBE9",
      padding: "14px 20px",
      justifyContent: "space-between",
      borderRadius: "5px",
    },
    gridcontain: {
      padding: "20px",
    },
    addicon: {
      height: "20px !important",
      width: "20px !important",
      margin: "0px 0px -6px 0px",
    },
    aboutUsLeft: {
      [theme.breakpoints.up("xs")]: {
        paddingRight: "0",
        borderRight: "0",
        height: "fit-content",
      },
      [theme.breakpoints.up("sm")]: {
        paddingRight: "32px",
        borderRight: "1px solid #D9DBE9",
        height: "270px",
      },
    },

    pictureIconContainer: {
      height: "57px",
      width: "57px",
      backgroundColor: "#EFF0F7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
    },

    aboutUsTextBox: {
      width: "calc(100% - 68px)",
      marginLeft: "11px",
    },

    dragIconContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },

    newLinkContainer: {
      marginTop: "35px",
      [theme.breakpoints.up("xs")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-start",
      },
    },

    addNewBtnBox: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
      fontSize: ThemeConstants.FONTSIZE_H7,
      lineHeight: "25px",
      marginLeft: "13px",
    },
    erroroutbox: {
      display: "flex",
      alignItems: "center",
      maxWidth: "820px",
      margin: "auto",
    },
    erroricon: {
      marginRight: "5px",
    },
    imagetagbox: {
      borderRadius: "5px 0px 0px 5px",
      backgroundColor: "#000",
    },
    boxwrapper: {
      display: "flex",
      position: "relative",
      gap: "10px",
      overflow: "hidden",
    },
    boxwrapper1: {
      width: "120px",
      height: "80px",
      display: "block",
      borderRadius: "5px",
      border: "1px solid #4B9EF9",
      backgroundColor: "#D7ECFD",
      padding: "0 20px 0 20px",
    },
    boxwrapper2: {
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2px",
    },
    wrapperbutton: {
      right: "-20px",
      top: "18px",
      opacity: "0.7",
    },
    commonboxtext: {
      textAlign: "center",
      color: "#4B9EF9",
    },
    createimage: {
      width: "120px",
      height: "80px",
    },
    createimage1: {
      width: "40px",
      height: "80px",
    },
    assetscrollbox: {
      [theme.breakpoints.down("xs")]: {
        maxHeight: "724px",
      },
      [theme.breakpoints.down("md")]: {
        maxHeight: "850px",
      },
      maxHeight: "571px",
      overflow: "scroll",
      overflowX: "hidden",
    },
    inputbox: {
      cursor: "pointer",
      marginTop: "5px",
    },
    closebar: {
      marginRight: "7px",
    },
    copyRightLeft: {
      [theme.breakpoints.up("xs")]: {
        paddingRight: "0",
        borderRight: "0",
        height: "fit-content",
      },
      [theme.breakpoints.up("sm")]: {
        paddingRight: "32px",
        borderRight: "1px solid #D9DBE9",
        height: "282px",
      },
    },
  }));
