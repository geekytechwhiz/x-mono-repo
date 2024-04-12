import { Box, Button, TextField, Typography } from "@mui/material";
import { ShowToastSuccess } from "@platformx/utilities";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton/BackButton";
import "../PageSettings/PageSettings.css";
import { TwitterProps } from "../utils/editTypes";

const PrelemTwitter: React.FC<TwitterProps> = ({
  index,
  twitterHandle,
  handleSave,
  sectionToUpdate = "TwitterHandle",
  setPageId,
}) => {
  const { t } = useTranslation();
  const [handle, setHandle] = useState(twitterHandle);
  return (
    <Box key={`${index}_content`} className='pageSettingmainWp'>
      <Box className='rowBox'>
        <BackButton setPageId={setPageId} Title={t("prelem_images")} backTo='prelemSetting' />
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t("twitter_tweets")}
        </Typography>
        <TextField
          multiline
          value={handle}
          error={handle?.length === 0}
          onChange={(e: any) => setHandle(e.target.value)}
          variant='outlined'
          size='small'
          placeholder='hcltech'
          inputProps={{ maxLength: 15 }}
        />
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={handle?.length === 0}
          sx={{ width: "100%" }}
          onClick={() => {
            handleSave(sectionToUpdate, handle, index);
            ShowToastSuccess(`${t("prelem_twitter_info_toast")} ${t("saved_toast")}`);
          }}>
          {t("done")}
        </Button>
      </Box>
    </Box>
  );
};
export default PrelemTwitter;
