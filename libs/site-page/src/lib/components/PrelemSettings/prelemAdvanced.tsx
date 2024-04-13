import { Box, Typography } from "@mui/material";
import { BasicSwitch, ThemeConstants } from "@platformx/utilities";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton/BackButton";
import "../PageSettings/PageSettings.css";

const PrelemAdvanced = ({ setPageId }) => {
  const { t } = useTranslation();
  return (
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title={t("prelem_advanced")} backTo='prelemSetting' />
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t("prelem_advanced_user")}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t("prelem_advanced_pay")}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t("prelem_geo")}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
    </Box>
  );
};
export default PrelemAdvanced;
