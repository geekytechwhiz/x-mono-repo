import { useLocation } from "react-router-dom";
import { CommonPreview } from "@platformx/content";

export const PagePreview = () => {
  const { state: stateObj } = useLocation();
  return <CommonPreview iframeUrl={`${stateObj?.prevPageUrl}&preview=true`} />;
};
