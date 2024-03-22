import React from "react";
import { Skeleton } from "@mui/material";
// import { useCustomStyle } from "./SkeletonLoader.style";

const SkeletonLoader = () => {
  // const classes = useCustomStyle();
  return (
    <Skeleton
      sx={{ minHeight: "inherit", height: "inherit", width: "inherit", minwidth: "inherit" }}
      variant='rectangular'
      animation='wave'
    />
  );
};

export { SkeletonLoader };
