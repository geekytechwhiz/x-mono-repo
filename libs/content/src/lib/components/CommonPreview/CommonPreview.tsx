/* eslint-disable @typescript-eslint/no-unused-vars */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import TabletAndroidRoundedIcon from "@mui/icons-material/TabletAndroidRounded";
import { Box, Divider, Typography } from "@mui/material";
import { RootState } from "@platformx/authoring-state";
import { ThemeConstants } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const tabs = [
  { type: "desktop", icon: ComputerRoundedIcon },
  { type: "tablet", icon: TabletAndroidRoundedIcon },
  { type: "mobile", icon: PhoneAndroidRoundedIcon },
];

const CommonPreview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deviceType, setDeviceType] = useState("desktop");
  const { currentContent } = useSelector((state: RootState) => state.content);
  const handleReturn = () => {
    window.history.back();
  };
  useEffect(() => {
    // console.log("yesss currentContent", currentContent);
    localStorage.setItem("preview", JSON.stringify(currentContent));
    return () => localStorage.removeItem("preview");
  }, []);

  return (
    <>
      <Box
        sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
        onClick={handleReturn}>
        <ArrowBackIosIcon
          sx={{
            fontSize: ThemeConstants.FONTSIZE_H6,
            margin: "18px 4px 18px 16px",
          }}
        />
        <Typography variant='h3medium'>{t("resend_text_left_button")}</Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}>
        <Box pl={2} onClick={() => navigate(-1)} sx={{ cursor: "pointer" }}>
          <ArrowBackIcon />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ced3d9",
            borderRadius: "24px",
          }}>
          {tabs.map((tab, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                backgroundColor:
                  deviceType === tab.type
                    ? ThemeConstants.PRIMARY_MAIN_COLOR
                    : ThemeConstants.WHITE_COLOR,
                transition: "all 0.50s",
                padding: "12px 27px",
                borderRadius: "24px",
                cursor: deviceType === tab.type ? "pointer" : "default",
              }}
              onClick={() => {
                setDeviceType(tab.type);
              }}>
              <tab.icon
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_H2,
                  color:
                    deviceType === tab.type
                      ? ThemeConstants.WHITE_COLOR
                      : ThemeConstants.PRIMARY_MAIN_COLOR,
                  cursor: "pointer",
                }}
              />
            </Box>
          ))}
        </Box>
        <Box>{}</Box>
      </Box>
      <Divider sx={{ mb: { sm: "31px" } }} />
      <Box
        sx={{
          border: "1px solid #ced3d9",
          borderRadius: "45px",
          padding: "20px",
          width: {
            sm: deviceType === "desktop" ? "100%" : deviceType === "tablet" ? "100%" : "402px",
            md: deviceType === "desktop" ? "100%" : deviceType === "tablet" ? "768px" : "402px",
            lg: deviceType === "desktop" ? "1092px" : deviceType === "tablet" ? "909px" : "402px",
          },
          margin: "auto",
          transition: "width 0.50s",
        }}>
        <Box
          sx={{
            border: "1px solid #ced3d9",
            borderRadius: "30px",
            overflow: "hidden",
          }}>
          <iframe
            className='prelemResponsivePreview'
            title='page preview'
            width='100%'
            style={{ height: `calc(100vh - 170px)` }}
            frameBorder='0'
            src='http://localhost:3000/monorepo/en/content/common/preview'></iframe>
        </Box>
      </Box>
    </>
  );
};
export default CommonPreview;
