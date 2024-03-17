import { toast } from "react-toastify";

export const ShowToastSuccess = (message) => {
  toast.success(message);
};

export const showToastError = (message) => {
  toast.error(message);
};

export const showToastWarning = (message) => {
  toast.warning(message);
};

export const showToastInfo = (message) => {
  toast.info(message);
};
