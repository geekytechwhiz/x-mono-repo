import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import "./SingleCard.css";
import { dateFormat } from "./utils/helper";

const SingleCard = ({
  title,
  published_by,
  schduled_publish_trigger_datetime: publish,
  schduled_unPublish_trigger_datetime: unPublish,
}: any) => {
  const { date_time, date, month } = dateFormat(publish ?? unPublish) || {};
  const { t } = useTranslation();
  return (
    <Box className='schedulecard'>
      <Box>
        <Typography component='div' className='day'>
          {date}
        </Typography>
        <Typography component='div' variant='h4regular' className='month'>
          {month}
        </Typography>
      </Box>
      <Box>
        <Box className='icon'>
          <DescriptionOutlinedIcon />
        </Box>
        <Box sx={{ margin: 0, display: "block" }}>
          <Typography variant='h7regular' className='boticontext'>
            {t("pages")}
          </Typography>
        </Box>
        <Typography component='div' variant='h3medium' className='title'>
          {title}
        </Typography>
        <Typography component='div' variant='h7medium' className='publishby'>
          {published_by}
        </Typography>
        <Typography component='div' variant='h7medium' className='datetime'>
          {publish ? t("will_publish_on") : t("will_unpublish_on")} : {date_time}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(SingleCard);
