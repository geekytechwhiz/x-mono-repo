import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  dialogContentStyle: {
    display: "flex",
    justifyContent: "center",
    overflowY: "scroll",
    padding: "15px",
  },
  innerBoxContent: {
    order: 1,
    flexGrow: 0,
    maxWidth: "610px",
  },
  publishTagsWp: {
    marginTop: "35px",
    width: "-webkit-fill-available",
    "& li": {
      display: "inline-block",
    },
  },
  publishImgUploadBox: {
    position: "relative",
    borderRadius: "4px",
    marginTop: "14px",
    marginBottom: "14px",
  },
  imgBox: {
    position: "absolute",
    top: "0",
    width: "100%",
    height: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7470708a",
    borderRadius: "4px",
  },
  cachedIconBox: {
    borderRadius: "5px",
    backgroundColor: "#fff",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  editIconBox: {
    borderRadius: "5px",
    backgroundColor: "#fff",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  cloudIconBox: {
    width: "inherit",
    height: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#EFF0F6",
    borderRadius: "inherit",
  },
  dividerStyle: {
    width: "-webkit-fill-available",
    height: "0px",
    marginTop: "35px",
  },
}));
