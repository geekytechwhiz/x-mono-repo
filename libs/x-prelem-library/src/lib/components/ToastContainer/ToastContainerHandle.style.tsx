import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
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
        borderLeft: "7px solid #e53935",
        background: "#ffffff",
        color: "#e53935",
        borderRadius: "5px",
      },
      "&.Toastify__toast--success": {
        borderLeft: "7px solid #0fa069",
        background: "#ffffff",
        color: "#0fa069",
        borderRadius: "5px",
      },
      "&.Toastify__toast--warning": {
        borderLeft: "7px solid #E2AB30",
        background: "#ffffff",
        color: "#E2AB30",
        borderRadius: "5px",
      },
    },
  },
}));
