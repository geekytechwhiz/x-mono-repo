import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorToast from "../CustomToast/ErrorToast";
import InfoToast from "../CustomToast/InfoToast";
import SuccessToast from "../CustomToast/SuccessToast";
import WarningToast from "../CustomToast/WarningToast";

export const ShowToastSuccess = (message: string | undefined) => {
  toast.success(<SuccessToast title={"success"} description={message} />);
};

export const ShowToastError = (message: string | undefined) => {
  toast.error(<ErrorToast title={"error"} description={message} />);
};

export const ShowToastWarning = (message: string | undefined) => {
  toast.warning(<WarningToast title={"warning"} description={message} />);
};

export const ShowToastInfo = (message: string | undefined) => {
  toast.info(<InfoToast title={"info"} description={message} />);
};
