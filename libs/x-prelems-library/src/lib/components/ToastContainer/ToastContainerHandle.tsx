import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { injectStyle } from "react-toastify/dist/inject-style";

// injectStyle();

const ToastContainerHandle = () => {
  return (
    <ToastContainer
      position='bottom-left'
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme={"colored"}
      icon={true}
    />
  );
};
export default React.memo(ToastContainerHandle);
