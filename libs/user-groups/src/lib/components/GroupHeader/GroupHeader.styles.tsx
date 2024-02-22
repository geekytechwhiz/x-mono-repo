import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #D9DBE9",
  },
  logoContainer: {
    border: "1px solid #D9DBE9",
    padding: "5px",
    display: "flex",
    borderRadius: "5px",
    alignItems: "center",
    cursor: "pointer",
  },
}));
