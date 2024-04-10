import { useLocation } from "react-router-dom";
import { CommonPreview } from "@platformx/utilities";

export const PagePreview = () => {
  const { state: stateObj } = useLocation();
  return <CommonPreview iframeUrl={`${stateObj?.prevPageUrl}&preview=true`} type='page' />;
};
