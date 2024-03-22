import { Box, useMediaQuery } from "@mui/material";
import { PlatXLogo, ThemeConstants } from "@platformx/utilities";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./PageContainer.styles";

const LeftBox = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const noMobile = useMediaQuery(`@media(min-width:${ThemeConstants.EM - 1}px)`);
  return (
    <Box className={classes.leftBox}>
      {noMobile && (
        <Box className={classes.logowp}>
          <img
            src={PlatXLogo}
            alt='X Logo'
            onClick={() => {
              localStorage.removeItem("pageTimerState");
              navigate("/dashboard");
            }}
          />
        </Box>
      )}
      {children}
    </Box>
  );
};
export default LeftBox;
