import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PlatXLogo } from "@platformx/utilities";
import { useStyles } from "./Header.styles";

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box className={classes.createCoursetophead}>
      <Box className='d-flex'>
        {/* <Box className='backarrow' onClick={returnBack}>
            <ArrowBack sx={{ marginRight: '10px' }} />{' '}
          </Box> */}
        <Box className={classes.logoDispaly} onClick={() => navigate("/dashboard")}>
          <img src={PlatXLogo} height='30' alt='img' />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
