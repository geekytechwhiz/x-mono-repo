import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  icon: {
    width: "16px",
    marginRight: "10px",
  },
  assetnew: {
    "&.Platform-x-Menu-paper": {
      boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
      borderRadius: "7px",
      marginTop: "5px",
    },
    "&.Platform-x-Menu-list": {
      borderRadius: "4px",
      boxShadow: "0 0 2px 0 rgba(115, 114, 114, 0.14)",
      border: "solid 1px rgba(112, 112, 112, 0.1)",
    },
    ".Platform-x-MenuItem-root": {
      ".Platform-x-SvgIcon-root": {
        fontSize: 20,
        marginRight: "10px",
        verticalAlign: "middle",
      },
      paddingLeft: "18px",
      fontSize: "16px",
      textTransform: "capitalize",
    },
  },
}));
