import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "10px",
    display: "flex",
    padding: "10px",
    border: "1px solid #D9DBE9",
    borderRadius: "5px",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
  },
  groupIconContainer: {
    display: "flex",
    justifyContent: "center",
  },
  editIcon: {
    cursor: "pointer",
  },
}));
