import React from "react";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { Box, Typography } from "@mui/material";

const WarningToast = ({ title = "title", description = "description" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
      <Box>
        <ReportProblemOutlinedIcon style={{ color: "#E2AB30", marginRight: 2 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginLeft: "10px",
        }}>
        <Typography variant='h5bold' sx={{ margin: "0px", color: "#E2AB30" }}>
          {title}
        </Typography>
        <Typography variant='h5regular' sx={{ margin: "0px" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
export default WarningToast;
