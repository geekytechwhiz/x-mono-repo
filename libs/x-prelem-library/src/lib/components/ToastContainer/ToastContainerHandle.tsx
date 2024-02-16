import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useStyles } from "./ToastContainerHandle.style";

injectStyle();

const ToastContainerHandle = () => {
  const classes = useStyles();

  return (
    <ToastContainer
      className={classes.toastContainer}
      hideProgressBar={true}
      position='bottom-center'
      autoClose={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme='colored'
      icon={false}
    />
  );
};
export default React.memo(ToastContainerHandle);
