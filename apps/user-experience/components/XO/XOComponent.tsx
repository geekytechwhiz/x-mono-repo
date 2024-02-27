import dynamic from "next/dynamic";
import React from "react";

const Component: any = dynamic(() => import(`platform-x-prelems/prelems/XO`));

export const XOComponent = () => {
  return (
    <React.Fragment>
      <Component />
    </React.Fragment>
  );
};
