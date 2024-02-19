import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material";
import Toast from "./Toast";

const SuccessToast = ({ title = "title", description = "description" }) => {
  const theme = useTheme();
  return (
    <Toast
      title={title}
      description={description}
      color={theme.palette.prelemType1?.NOTIFICATION?.SUCCESS?.BACKGROUND}>
      <CheckCircleOutlineIcon
        style={{
          color: theme.palette.prelemType1?.NOTIFICATION?.SUCCESS?.BACKGROUND,
          marginRight: 2,
        }}
      />
    </Toast>
  );
};
export default SuccessToast;
