import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => ({
  switchBoxContainer: {
    "& .switchRootClass": {
      margin: "0px 0px 0px 10px",
      paddingRight: "25px",
    },
  },
}));
