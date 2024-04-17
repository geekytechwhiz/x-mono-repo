/* eslint-disable no-unused-vars */
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useContentGlleryStyle = makeStyles((theme: Theme) => ({
  container: {
    height: "100%",
    position: "absolute",
    width: "100%",
    backgroundSize: "cover",
    left: 0,
    top: 0,
    borderRadius: "5px",
    maxWidth: "100%",
  },
  cardmedia: {
    position: "absolute",
    top: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    // height: { xs: "920px", sm: "506px", md: "650px" },
    color: "#FFFFFF",
  },
  cardcontent: {
    position: "relative",
    color: "#ffffff",
    backgroundColor: "transparent",
    mt: { xs: 0, sm: 0, md: 4, lg: 8 },
    paddingBottom: "10px !important",
    width: "100%",
    height: "100%",
    padding: "20px !important",
  },
  contentbox: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    width: "64px",
    height: "64px",
    margin: "auto",
  },
  contentcardwrap: {
    position: "absolute",
    bottom: "0",
  },
  contentboxwrap: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    borderBottom: "2px solid",
    paddingBottom: "6px",
    width: "fit-content",
  },
  contentwrap: {
    color: "inherit",
    margin: "3px 0",
    textTransform: "capitalize",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "block",
    position: "relative",
    wordBreak: "break-word",
  },
  boxlastcontent: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
  },
  communitybox: {
    display: "flex",
    alignItems: "center",
  },
  communspan: {
    marginLeft: "8px",
    marginTop: "10px",
  },
  communitytypo: {
    pl: "16px",
    marginTop: "14px",
    marginBottom: "14px",
  },
  expandicon: {
    position: "absolute",
    right: "24px",
    marginTop: "-12px",
  },
  boxdam: {
    display: "flex",
    alignItems: "center",
  },
  imagespan: {
    marginLeft: "8px",
  },
  contenttypecardbox: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    m: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fetchresulttypo: {
    marginTop: "200px",
    marginBottom: "100px",
    textAlign: "center",
  },
  noresultfoundtypo: {
    height: "calc(100vh - 169px)",
    overflowY: "scroll",
  },
  containercard: {
    cursor: "pointer",
    position: "relative",
    // height: { xs: 'auto', md: '240px', borderRadius: '5px' },
    float: "left",
    width: "100%",
    height: "auto",
    aspectRatio: "1/1",
    //   '&:hover': {
    //     backgroundColor: '#0000009e',
    // },
  },
  leftsidebarbox: {
    marginTop: "-26px !important",
  },
  leftcontent: {
    // display: { xs: 'block', em: 'none' },
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  containbox: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "end",
    borderRadius: "5px",
    zIndex: 1,
    "&:hover": {
      backgroundColor: "#0000009e",
    },
    innercontain: {
      height: "100%",
      width: "100%",
    },
  },
  damtypo: {
    color: "#ced3d9",
    textTransform: "capitalize",
    marginBottom: "1px",
  },
  communityMenu: {
    transform: "none !important",
  },
  infinitescroll: {
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    "& .infinite-scroll-component__outerdiv": {
      width: "inherit",
    },
  },
}));
export default useContentGlleryStyle;
