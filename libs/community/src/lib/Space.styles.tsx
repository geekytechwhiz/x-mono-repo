import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      "&.main-container": {
        "& .spaceHeader": {
          [theme.breakpoints.up("xs")]: {
            padding: "10px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "20px 20px 0 20px",
          },
        },
        "& .spaceListing": {
          height: "calc(100vh - 140px)",
          overflowY: "auto",
          "& .spacelistCard": {
            [theme.breakpoints.up("xs")]: {
              padding: "10px",
            },
            [theme.breakpoints.up("md")]: {
              padding: "20px 20px 0 20px",
            },
          },
        },
      },
    },
  };
});
