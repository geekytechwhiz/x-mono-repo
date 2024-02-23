import React from "react";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useTheme } from "@mui/material";
import Toast from "./Toast";

const WarningToast = ({ title = "title", description = "description" }) => {
  const theme = useTheme();
  return (
    <Toast
      title={title}
      description={description}
      color={theme.palette.prelemType1?.NOTIFICATION?.WARNING?.BACKGROUND}>
      <ReportProblemOutlinedIcon
        style={{
          color: theme.palette.prelemType1?.NOTIFICATION?.WARNING?.BACKGROUND,
          marginRight: 2,
        }}
      />
    </Toast>
  );
};
export default WarningToast;
