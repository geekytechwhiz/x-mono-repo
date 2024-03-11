import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, styled } from "@mui/system";

const BlueLinearProgress = styled(LinearProgress)({
  "& .Platform-x-LinearProgress-barColorPrimary": { backgroundColor: "#4B9EF9" },
});
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
      <BlueLinearProgress
        sx={{ maxWidth: "510px", backgroundColor: "#EFF0F6" }}
        variant='determinate'
        value={progress}
      />
    </Box>
  );
};
