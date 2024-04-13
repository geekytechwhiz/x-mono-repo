import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Header.css";
import SyncIcon from "@mui/icons-material/Sync";

const Header = ({
  title = "",
  titleVariant,
  linkText = "",
  refetch = false,
  refetchFunction = () => {},
}: any) => {
  return (
    <Box className='header'>
      <Typography variant={titleVariant}>{title}</Typography>
      {linkText ? (
        <Link to='/sitepage' className='link'>
          {linkText}
        </Link>
      ) : refetch ? (
        <Box onClick={() => refetchFunction()}>
          <SyncIcon
            sx={{
              color: "#2d2d39",
              verticalAlign: "middle",
              fontSize: { md: "21px" },
              cursor: "pointer",
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
