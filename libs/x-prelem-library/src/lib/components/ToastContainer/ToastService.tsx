import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuccessToast, ErrorToast, WarningToast, InfoToast } from "./customToast";

const toastPosition = "bottom-left";

const convertFontSize = (mag = "") => {
  return (
    <span
      style={{
        fontSize: "18px",
      }}>
      {mag}
    </span>
  );
};

const ToastService = {
  defaultToast: (message: any, id = "") =>
    toast(convertFontSize(message), {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
    }),

  SuccessToast: (message: string) =>
    toast.success(<SuccessToast title={"Success"} description={message} />),

  failToast: (message: any) => toast.error(<ErrorToast title={"Error"} description={message} />),

  warnToast: (message: any) => toast.warn(<WarningToast title={"Warning"} description={message} />),

  infoToast: (message: any) => toast.info(<InfoToast title={"Info"} description={message} />),

  dismissToast: (toastId = "") => toast.dismiss(toastId),
};

export default ToastService;
