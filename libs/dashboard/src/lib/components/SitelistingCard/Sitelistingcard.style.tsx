import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  head: {
    border: "1px solid #CED3D9",
    borderRadius: "3px",
  },
  body: {
    overflowY: "auto",
    maxHeight: "347px",
    padding: "0 15px",
    // minHeight: '359px',
  },
  mainbox: {
    padding: "15px",
  },
  boxtypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnpub: {
    backgroundColor: "#D7ECFD",
  },
  innercontainb: {
    padding: "13px",
    width: "100%",
    height: "52px",
    backgroundColor: "#F7F7FC",
  },
  contentbox: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 20px 20px 5px",
    borderBottom: "1px solid #D9DBE9",
  },
  boxhead: {
    display: "inline-flex",
    gap: "10px",
    marginTop: "10px",
  },
  typocolor: {
    color: "#6E7191",
  },
  typocolor2: {
    color: "#4B9EF9",
  },

  righttypobox: {
    wordWrap: "break-word",
    color: "#4B9EF9",
  },
  leftboxtype: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  scrollbox: {
    marginTop: "15px",
    overflowY: "scroll",
    height: "307px",
    float: "left",
    width: "100%",
  },
  innercontainerbox1: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "34px",
  },
  innercontainerbox2: {
    width: "25%",
    alignItems: "center",
    display: "flex",
    gap: "10px",
  },
  innertypo: {
    width: "100%",
  },
}));
