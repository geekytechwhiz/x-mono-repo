import { Box } from "@mui/material";
import { ChatGptCommonLoader } from "@platformx/utilities";
import { useStyles } from "./PrelemLoader.Style";

const PrelemLoader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.LoaderMainBox}>
      <Box className={classes.ImageBox}>
        <Box>
          <img src={ChatGptCommonLoader} alt='' />
        </Box>
      </Box>
    </Box>
  );
};

export default PrelemLoader;
