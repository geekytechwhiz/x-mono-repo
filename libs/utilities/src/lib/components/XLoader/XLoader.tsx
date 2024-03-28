import React, { useState, useEffect } from "react";
import { Backdrop, Box, CircularProgress, LinearProgress } from "@mui/material";
import { ThemeConstants, XAnimatedLoader } from "@platformx/utilities";

type XLoaderProps = {
  type: "circular" | "linear" | "xloader";
};
const XLoader = ({ type }: XLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const renderProgress = () => {
    switch (type) {
      case "circular":
        return (
          <CircularProgress
            style={{
              width: "50px",
              height: "50px",
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
            }}
          />
        );
      case "linear":
        return <LinearProgress variant='determinate' value={progress} />;
      case "xloader":
        return <img src={XAnimatedLoader} alt='Loading...' />;
      default:
        return null;
    }
  };

  return (
    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "#fcfcfc",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open>
      <Box
        sx={{
          position: "fixed",
          top: "45%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}>
        <Box
          sx={{
            width: "70px",
            height: "70px",
          }}>
          {renderProgress()}
        </Box>
      </Box>
    </Backdrop>
  );
};

export default XLoader;
