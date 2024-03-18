import dynamic from "next/dynamic";
import React from "react";

const XOComponents = dynamic(() => import("@platformx/x-prelems-library").then((mod) => mod.XO), {
  ssr: false,
});

export const XOComponent = () => {
  return <XOComponents />;
};
