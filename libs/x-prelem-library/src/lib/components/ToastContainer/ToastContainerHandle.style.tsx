import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    toastContainer: {
      width: "457px",
      "& .Toastify__toast": {
        "&.Toastify__toast-body": {
          paddingLeft: "10px",
          width: "100%",
        },
        "&.Toastify__toast > button > svg": {
          marginTop: "18px",
          height: "24px",
          width: "24px",
          color: "#a0a3bd",
        },
        "&.Toastify__toast--error": {
          borderLeft: `7px solid ${theme.palette.prelemType1?.NOTIFICATION?.ERROR?.BACKGROUND}`,
          background: theme.palette.prelemType1?.NOTIFICATION?.ERROR?.COLOR,
          color: theme.palette.prelemType1?.NOTIFICATION?.ERROR?.BACKGROUND,
          borderRadius: "5px",
        },
        "&.Toastify__toast--success": {
          borderLeft: `7px solid ${theme.palette.prelemType1?.NOTIFICATION?.SUCCESS?.BACKGROUND}`,
          background: theme.palette.prelemType1?.NOTIFICATION?.SUCCESS?.COLOR,
          color: theme.palette.prelemType1?.NOTIFICATION?.SUCCESS?.BACKGROUND,
          borderRadius: "5px",
        },
        "&.Toastify__toast--warning": {
          borderLeft: `7px solid ${theme.palette.prelemType1?.NOTIFICATION?.WARNING?.BACKGROUND}`,
          background: theme.palette.prelemType1?.NOTIFICATION?.WARNING?.COLOR,
          color: theme.palette.prelemType1?.NOTIFICATION?.WARNING?.BACKGROUND,
          borderRadius: "5px",
        },
        "&.Toastify__toast--info": {
          borderLeft: `7px solid ${theme.palette.prelemType1?.NOTIFICATION?.INFO?.BACKGROUND}`,
          background: theme.palette.prelemType1?.NOTIFICATION?.INFO?.COLOR,
          color: theme.palette.prelemType1?.NOTIFICATION?.INFO?.BACKGROUND,
          borderRadius: "5px",
        },
      },
    },
  };
});
