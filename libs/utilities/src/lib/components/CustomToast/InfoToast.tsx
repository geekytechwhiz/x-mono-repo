import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const InfoToast = ({ title = "title", description = "description" }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
      <Box>
        <HighlightOffRoundedIcon style={{ color: "#D32F2F", marginRight: 2 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginLeft: "10px",
        }}>
        <Typography variant='h7bold' sx={{ color: "#D32F2F" }}>
          {t(title)}
        </Typography>
        <Typography variant='h7regular' sx={{ color: "black", fontWeight: 400 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
export default InfoToast;
