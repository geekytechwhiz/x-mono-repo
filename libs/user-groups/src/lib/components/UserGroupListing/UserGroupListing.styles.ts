import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  headContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 10px",
  },
  cardContainer: {
    padding: "0px 10px 10px 10px",
    height: "calc(100vh - 140px)",
    overflowY: "auto",
  },
}));
