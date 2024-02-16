import React from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, Typography } from "@mui/material";

const ErrorToast = ({ title = "title", description = "description" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
      <Box>
        <HighlightOffRoundedIcon style={{ color: "#E53935", marginRight: 2 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginLeft: "10px",
        }}>
        <Typography variant='h5bold' sx={{ margin: "0px", color: "#E53935" }}>
          {title}
        </Typography>
        <Typography variant='h5regular' sx={{ margin: "0px" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
export default ErrorToast;
