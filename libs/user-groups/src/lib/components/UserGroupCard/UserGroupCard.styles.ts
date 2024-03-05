import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "10px",
    display: "flex",
    padding: "10px",
    border: "1px solid #D9DBE9",
    borderRadius: "5px",
    alignItems: "center",
    "&:hover": {
      border: "1px solid #121212",
    },
  },
  innerContainer: {
    alignItems: "center",
  },
  groupIconContainer: {
    display: "flex",
    justifyContent: "center",
  },
  labelContainer: {
    marginLeft: "10px",
  },
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  description: {
    color: "#89909a",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    paddingLeft: "20px",
  },
  tags: {
    padding: "3px 5px",
    border: "1px solid",
    borderRadius: "3px",
    margin: "3px",
    color: "#89909a",
  },
  dots: {
    display: "flex",
    alignItems: "end",
  },
  editIcon: {
    cursor: "pointer",
  },
}));
