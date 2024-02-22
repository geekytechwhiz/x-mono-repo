import React from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useTheme } from "@mui/material";
import Toast from "./Toast";

const ErrorToast = ({ title = "title", description = "description" }) => {
  const theme = useTheme();

  return (
    <Toast
      title={title}
      description={description}
      color={theme.palette.prelemType1?.NOTIFICATION?.ERROR?.BACKGROUND}>
      <HighlightOffRoundedIcon
        style={{
          color: theme.palette.prelemType1?.NOTIFICATION?.ERROR?.BACKGROUND,
          marginRight: 2,
        }}
      />
    </Toast>
  );
};
export default ErrorToast;
