import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useCreatesiteStepStyle = makeStyles((theme: Theme) => ({
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

  innercontainer: {
    display: "flex",
    marginTop: "8px",
    marginLeft: "8px",
  },

  modalboxtypo: {
    // width: calc(100% - 68px),
    paddingRight: "24px",
    marginLeft: "20px",
  },
  sitedropdownicon: {
    width: "10%",
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
    justifyContent: "end",
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
  createcontainnew: {
    height: "107px",
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    alignItems: "center",
    marginLeft: "35px",
  },
  typowidth: {
    maxWidth: "324px",
  },
  typowidthstep4: {
    maxWidth: "494px",
  },
  siteicon: {
    textAlign: "center",
  },
  siteiconnew: {
    textAlign: "center",
    marginTop: "25px",
  },
  siteiconinner: {
    marginBottom: "30px",
    marginRight: "10px",
  },
  boxscroll: {
    overflowY: "scroll",
    height: "320px",
    marginTop: "25px",
  },
  themebox: {
    display: "flex",
    flexDirection: "row",
    height: "130px",
    marginTop: "10px",
  },
  step2container: {
    width: "614px",
    height: "478px",
    borderRadius: "5px",
    backgroundColor: "#FFF",
    border: "1px solid #D9DBE9",
    marginTop: "75px",
  },
  step2typo: {
    color: "#4E4B66",
    maxWidth: "492px",
  },
  typoheader: {
    marginLeft: "34px",
  },
  step2img: {
    width: "100%",
  },
  skeletonstep2box: {
    marginTop: "24px",
    paddingLeft: "20px",
    paddingTop: "12px",
    marginBottom: "24px",
  },
  step2skeleton: {
    marginTop: "6px",
  },
  step2container2: {
    width: "610px",
    height: "135px",
    border: "1px solid #D9DBE9",
    borderRadius: "5px",
    backgroundColor: "#FFF",
    marginTop: "10px",
    marginLeft: "72px",
  },
  step2innercontainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "14px 1px",
  },
  imgbox: {
    width: "100%",
  },
  skeletonboxstep2: {
    marginTop: "24px",
    paddingLeft: "20px",
    paddingTop: "12px",
    marginBottom: "24px",
  },
  skeletonloader: {
    marginTop: "6px",
  },
  skeletonloadernew: {
    marginTop: "6px",
    marginLeft: "47px",
  },
  step2containerbox2: {
    width: "610px",
    height: "135px",
    border: "1px solid #D9DBE9",
    borderRadius: "5px",
    backgroundColor: "#FFF",
    marginTop: "10px",
    marginLeft: "72px",
  },
  colorsboxstep2: {
    display: "flex",
    gap: "5px",
  },
  secondarytexstep2: {
    display: "flex",
    marginRight: "86px",
  },
  box1: {
    display: "flex",
    justifyContent: "center",
  },
  typotext: {
    display: "flex",
    gap: "30px",
    color: "#6E7191",
  },
  textleft: {
    marginLeft: "6px",
  },
  platxlogo: {
    padding: "5px 90px 5px 154px",
  },
  applyflex: {
    display: "flex",
    marginTop: "2px",
    marginLeft: "75px",
  },
  headertypo: {
    marginLeft: "34px !important",
  },
  backbtn: {
    marginRight: "19px",
    marginTop: "34px",
  },
  btnbox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  selected: {
    borderRadius: "5px",
  },
  skipbtn: {
    display: "flex",
    marginTop: "42px",
  },
  fonttypo: {
    display: "flex",
    gap: "30px",
    color: "#6E7191",
  },
  innertypo: {
    display: "flex",
    gap: "30px",
  },
  textpadding: {
    padding: "30px",
    paddingLeft: "0px",
  },
  textpaddingnew: {
    padding: "30px",
    paddingLeft: "35px",
  },
  maincontain: {
    display: "flex",
    justifyContent: "center",
  },
  boxmargin: {
    marginRight: "80px",
  },
  boxadd: {
    display: "inline-flex",
    gap: "31px",
  },
}));
