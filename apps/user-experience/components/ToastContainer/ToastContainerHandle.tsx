import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { injectStyle } from "react-toastify/dist/inject-style";

// injectStyle();

const ToastContainerHandle = () => {
  return (
    <ToastContainer
      hideProgressBar={true}
      position='bottom-center'
      autoClose={4000}
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
