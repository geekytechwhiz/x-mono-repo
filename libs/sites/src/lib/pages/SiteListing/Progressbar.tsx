import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/system";

export const Progressbar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulating progress update (you can replace this with your own logic)
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box>
      <LinearProgress sx={{ maxWidth: "510px" }} variant='determinate' value={progress} />
    </Box>
  );
};
