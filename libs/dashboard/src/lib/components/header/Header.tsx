import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Header.css";
import SyncIcon from "@mui/icons-material/Sync";
import { createStyles, makeStyles } from "@mui/styles";
import { useRef } from "react";

const Header = ({
  title = "",
  titleVariant,
  linkText = "",
  refetch = false,
  refetchFunction = () => {},
  refetchLoading = false,
}: any) => {
  const useStyles = makeStyles(() =>
    createStyles({
      rotateIcon: {
        animation: "$spin 5s linear infinite",
      },
      "@keyframes spin": {
        "0%": {
          transform: "rotate(360deg)",
        },
        "100%": {
          transform: "rotate(0deg)",
        },
      },
    }),
  );
  const Class = useStyles();
  const loader = useRef(false);

  return (
    <Box className='header'>
      <Typography variant={titleVariant}>{title}</Typography>
      {linkText ? (
        <Link to='/sitepage' className='link'>
          {linkText}
        </Link>
      ) : refetch ? (
        <Box
          onClick={() => {
            loader.current = true;
            refetchFunction();
          }}>
          <SyncIcon
            sx={{
              color: "#2d2d39",
              verticalAlign: "middle",
              fontSize: { md: "21px" },
              cursor: "pointer",
            }}
            className={loader.current && refetchLoading ? Class.rotateIcon : ""}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
