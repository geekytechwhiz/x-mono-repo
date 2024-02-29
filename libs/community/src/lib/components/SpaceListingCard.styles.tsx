import { makeStyles } from "@material-ui/core";

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
