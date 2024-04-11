import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import TimerIcon from "../../assets/svg/timerIcon.svg";

const Timer = ({ lastmodifiedDate }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} mr={2}>
      <img src={TimerIcon} alt='' />
      <Typography variant='p4regular' ml={1}>
        {t("last_edit")}: {lastmodifiedDate ? format(new Date(lastmodifiedDate), "hh:mm a") : null}
      </Typography>
    </Box>
  );
};
export default Timer;
