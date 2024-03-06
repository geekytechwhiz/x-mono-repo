import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useImagesStyle } from "../pages/Images.style";

export default function Progressbar() {
  const [progress, setProgress] = React.useState(0);
  const classes = useImagesStyle();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack spacing={2} direction='row'>
      <CircularProgress className={classes.circularpro} variant='determinate' value={progress} />
    </Stack>
  );
}
