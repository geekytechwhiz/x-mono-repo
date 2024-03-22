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
    [theme.breakpoints.down("sm")]: {
      marginLeft: "46px",
    },
    height: "107px",
    textalign: "center",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "40px",
    alignItems: "center",
    marginLeft: "155px",
  },
  createcontainnew: {
    height: "107px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "35px",
    marginTop: "20px",
  },
  typowidth: {
    maxWidth: "324px",
  },
  typowidthstep4: {
    maxWidth: "494px",
  },
  siteicon: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      padding: "9px",
      gap: "9px",
    },
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  siteiconnew: {
    textAlign: "center",
    marginTop: "25px",
    display: "flex",
    padding: "15px",
    justifyContent: "center",
  },
  siteiconinner: {
    [theme.breakpoints.down("sm")]: {
      width: "143px",
    },
    marginBottom: "30px",
    marginRight: "10px",
    marginLeft: "30px",
  },
  siteiconinnerc: {
    [theme.breakpoints.down("sm")]: {
      width: "143px",
      marginTop: "20px",
    },
  },
  boxscroll: {
    overflowY: "scroll",
    height: "320px",
    marginTop: "25px",
  },
  gridcls: {
    [theme.breakpoints.down("sm")]: {
      paddingRight: "10px",
    },
    marginTop: "13px !important",
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
    [theme.breakpoints.down("md")]: {
      padding: "14px",
    },
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
    [theme.breakpoints.down("sm")]: {
      width: "204px !important",
      height: "10px",
    },
    marginTop: "6px",
    width: "300px",
    height: "10px",
  },
  skeletonloadernew: {
    [theme.breakpoints.down("sm")]: {
      width: "105px !important",
      height: "10px",
    },
    marginTop: "6px",
    marginLeft: "47px",
  },
  step2containerbox2: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "341px",
      height: "270px",
      paddingRight: "10px",
      marginLeft: "10px",
    },
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
    [theme.breakpoints.down("sm")]: {
      padding: "5px 11px 5px 11px",
    },
    padding: "5px 90px 5px 154px",
  },
  applyflex: {
    [theme.breakpoints.down("sm")]: {
      gap: "9px",
      marginLeft: "38px",
    },
    display: "flex",
    marginTop: "2px",
    marginLeft: "75px",
  },
  headertypo: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px !important",
    },
    marginLeft: "34px !important",
  },
  backbtn: {
    marginRight: "19px",
    marginTop: "34px",
  },
  btnbox: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
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
    [theme.breakpoints.down("sm")]: {
      padding: "30px 46px 30px 9px",
    },
    padding: "30px",
  },
  textpaddingnew: {
    [theme.breakpoints.down("sm")]: {
      padding: "30px 72px 30px 9px",
    },
    padding: "30px",
    paddingLeft: "35px",
  },
  maincontain: {
    display: "flex",
    justifyContent: "center",
    padding: "8px",
  },
  boxmargin: {
    marginRight: "80px",
  },
  boxadd: {
    display: "inline-flex",
    gap: "31px",
  },
  xlogobox: {
    [theme.breakpoints.down("sm")]: {
      padding: "5px 8px 5px 8px",
    },
    padding: "5px 90px 5px 154px",
  },
  skipbtncolor: {
    color: "#4B9EF9",
  },
  skeletons: {
    display: "flex",
    justifyContent: "center",
  },
  typospace: {
    display: "inline-flex",
    gap: "33px",
  },
  maininnercontain: {
    [theme.breakpoints.down("sm")]: {
      width: "327px",
    },
    width: "540px",
    height: "64px",
    borderRadius: "5px",
    backgroundColor: "#FFF",
    boxShadow: "0px 49px 57px 0px rgba(0, 0, 0, 0.30)",
    marginTop: "73px",
  },
  step3boxn: {
    display: "flex",
    justifyContent: "center",
  },
  step3imgn: {
    [theme.breakpoints.down("sm")]: {
      width: "277px",
      height: "361px",
    },
    width: "462px",
    height: "424px",
    backgroundColor: "#FFF",
    marginTop: "-8px",
  },
  imgwidthstep3: {
    width: "100%",
  },
  step3justify: {
    display: "flex",
    justifyContent: "center",
  },
  step4boxn: {
    width: "100%",
    marginTop: "20px",
  },
  accordianbox: {
    boxShadow: "none !impotant",
  },
  accordiansum: {
    padding: "0px 10px 0px 0px !important",
  },
  accordiandeatail: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    padding: "8px 0px 0px 0px !important",
  },
  step5boxbtn: {
    backgroundColor: "#4B9EF9 !impotant",
    color: "#FFF !important",
  },
  step5boxh: {
    marginTop: "15px",
  },
  step5contain: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "17px",
      gap: "0px",
      display: "block",
    },

    marginTop: "17px",
    display: "flex",
    justifyContent: "space-around",
  },
  accordianborder: {
    [theme.breakpoints.down("sm")]: {
      width: "337px",
    },

    borderBottom: "1px solid #D9DBE9",
    width: "512px",
    height: "1px",
    marginTop: "20px",
  },
  step5imgtag: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5px",
  },
  imgtag: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  imgwidth: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  step2btnbreak: {
    marginTop: "10px",
    width: "160px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  step4blur: {
    marginBottom: "5px",
    position: "relative",
    backgroundRepeat: "no-repeat",
    padding: "10px",
    backgroundPosition: "10px bottom",
  },
  step4blur1: {
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "10px bottom",
    },
    marginBottom: "5px",
    position: "relative",
    backgroundRepeat: "no-repeat",
    padding: "10px",
    backgroundPosition: "10px top",
  },
  step4imgtc: {
    position: "relative",
  },
  step4imgtc1: {
    position: "absolute",
    top: "45px",
    left: "-23px",
  },
  step4innerimg1: {
    position: "relative",
    marginTop: "67px",
  },
  step4innerimgupdate: {
    [theme.breakpoints.down("sm")]: {
      width: "143px",
    },
  },
  step4innerimg2: {
    [theme.breakpoints.down("sm")]: {
      left: "-43px",
    },
    position: "absolute",
    top: "110px",
    left: "88px",
  },
  step4innerimg3: {
    position: "absolute",
    bottom: "29px",
    left: "-39px",
  },
  blurboximg1: {
    position: "absolute",
    left: "2px",
    bottom: "46px",
  },
  blurboximg2: {
    [theme.breakpoints.down("sm")]: {
      left: "-46px",
    },
    position: "absolute",
    right: "-42px",
    top: "44px",
  },
  commontop: {
    marginTop: "2px",
  },
  commontopm: {
    marginTop: "16px",
    marginRight: "0px !important",
  },
  step2margin: {
    marginTop: "20px",
  },
  step5margin: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px !important",
    },
  },

  step5addbtn: {
    backgroundColor: "#4B9EF9 !important",
    color: "#FFF !important ",
    marginRight: "-10px !important",
  },
  stepmockval: {
    gap: "5px !important",
  },
  step5typoxcat: {
    color: "#D32F2F",
    textAlign: "end",
  },
}));
