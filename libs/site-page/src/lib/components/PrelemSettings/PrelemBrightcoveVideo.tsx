import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ShowToastSuccess } from "@platformx/utilities";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton/BackButton";
import "../PageSettings/PageSettings.css";
import { BrightCoveProps } from "../utils/editTypes";

const PrelemBrightcoveVideo: React.FC<BrightCoveProps> = ({
  index,
  videoObj,
  handleSave,
  sectionToUpdate = "Livestream",
  setPageId,
}) => {
  const { t } = useTranslation();
  const [content, setContent] = useState(videoObj);
  const handleDataChange = (event, fieldType) => {
    const contentNew = { ...content };
    contentNew[fieldType] = event.target.value;
    setContent(contentNew);
  };
  const isDisabled = () =>
    JSON.stringify(content) === JSON.stringify(videoObj) ||
    Object.keys(content).find((ele) => content[ele].length === 0)
      ? true
      : false;
  return (
    <Box className='pageSettingmainWp' key={`${index}_content`}>
      <Box className='rowBox'>
        <BackButton setPageId={setPageId} Title={t("prelem_images")} backTo='prelemSetting' />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          Please enter Account id*
        </Typography>
        <TextField
          multiline
          value={content?.AccountID}
          error={content?.AccountID?.length === 0}
          onChange={(e: any) => handleDataChange(e, "AccountID")}
          variant='outlined'
          size='small'
          placeholder='Account Id'
          inputProps={{ maxLength: 15 }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          Please enter Player id*
        </Typography>
        <TextField
          multiline
          value={content?.PlayerID}
          error={content?.PlayerID?.length === 0}
          onChange={(e: any) => handleDataChange(e, "PlayerID")}
          variant='outlined'
          size='small'
          placeholder='Player Id'
          inputProps={{ maxLength: 15 }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          Please enter Video id*
        </Typography>
        <TextField
          multiline
          value={content?.VideoID}
          error={content?.VideoID?.length === 0}
          onChange={(e: any) => handleDataChange(e, "VideoID")}
          variant='outlined'
          size='small'
          placeholder='Video Id'
          inputProps={{ maxLength: 15 }}
        />
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={isDisabled()}
          onClick={() => {
            handleSave(sectionToUpdate, content, index);
            ShowToastSuccess(`${t("prelem_brightcoveVideo_info_toast")} ${t("saved_toast")}`);
          }}
          sx={{ width: "100%" }}>
          Done
        </Button>
      </Box>
    </Box>
  );
};
export default PrelemBrightcoveVideo;
