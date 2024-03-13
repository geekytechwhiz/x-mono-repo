import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    container: {
      "&.main-container": {
        "& .leftGrid": {
          paddingRight: "20px",
        },
      },
    },
  };
});
