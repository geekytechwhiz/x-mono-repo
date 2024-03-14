import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useLoaderStyle = makeStyles((theme: Theme) => ({
  box: {
    display: "flex",
    marginTop: "10px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("xs")]: {
      flexDirection: "row-reverse",
    },
  },
  container: {
    background: "#ffffff",
    alignItems: "flex-start",
    marginBottom: "10px",
    borderRadius: "6px",
    justifyContent: "space-between",
  },
  padding10: {
    padding: "10px",
  },
  boxmargin: {
    marginLeft: "52px",
    marginTop: "5px",
  },
  marginauto: {
    margin: "auto",
  },
  margin10: {
    marginRight: "10px",
    marginLeft: "10px",
  },
  skelatonmargin: {
    [theme.breakpoints.up("xs")]: {
      marginTop: "8%",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "20%",
    },
  },
}));
