import { ArrowUpward, Cached } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BasicSwitch, ShowToastSuccess, ThemeConstants } from "@platformx/utilities";
import { DamContentGallery } from "@platformx/x-image-render";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton/BackButton";
import "../PageSettings/PageSettings.css";
import { PrelemVideoProps } from "../utils/editTypes";
import { useStyles } from "./PrelemSettings.styles";

const PrelemVideos: React.FC<PrelemVideoProps> = ({
  index,
  playerFlow,
  videoInstance,
  handleSave,
  sectionToUpdate = "Videos",
  setPageId,
}) => {
  const [content, setContent] = useState({ ...videoInstance });
  const { t } = useTranslation();
  const [galleryDialogOpen, setGalleryDialogOpen] = useState<boolean>(false);

  const toggleGallery = () => {
    setGalleryDialogOpen(!galleryDialogOpen);
  };

  const UpdatePrelemInfo = () => {
    if (JSON.stringify(videoInstance) !== JSON.stringify(content)) {
      if (content.Title !== "" && content.Url !== "") {
        handleSave(sectionToUpdate, content, index);
        ShowToastSuccess(`${t("prelem_video_info_toast")} ${t("saved_toast")}`);
      }
    }
  };
  const handleAttribution = (event, fieldType) => {
    setContent({ ...content, [fieldType]: event.target.checked });
  };
  const handleDataChange = (event, fieldType) => {
    setContent({ ...content, [fieldType]: event.target.value });
  };

  const onUploadClick = () => {
    setGalleryDialogOpen(true);
  };

  const handleSelectedVideo = (video) => {
    const contentNew = {
      ...content,
      Url: video.Url,
      Thumbnail: video.Thumbnail,
      Title: video.Title,
      Description: video.Description,
    };
    setContent(contentNew);
  };

  const getDisabledState = () => {
    if (
      JSON.stringify(videoInstance) === JSON.stringify(content) ||
      content.Title === "" ||
      content.Title.trim().length === 0 ||
      content.Url === ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const classes = useStyles()();

  return (
    <>
      <Box className='pageSettingmainWp' key={`${index}_video`}>
        <BackButton setPageId={setPageId} Title={t("prelem_video")} backTo='prelemSetting' />
        <Box className='rowBox'>
          {playerFlow === "dspace" ? (
            content.Url ? (
              <Box className={classes.imageBox}>
                <video style={{ width: "100%", height: "100%" }} src={content.Url} controls></video>
                <Box
                  sx={{
                    position: "absolute",
                    top: "0",
                    width: "100%",
                    height: "99%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#7470708a",
                  }}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ cursor: "pointer" }} onClick={() => onUploadClick()}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          backgroundColor: ThemeConstants.WHITE_COLOR,
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                        }}>
                        <Cached sx={{ color: "#626060" }} />
                      </Box>
                      <Typography
                        mt={1}
                        sx={{
                          fontSize: ThemeConstants.FONTSIZE_XS,
                          color: ThemeConstants.WHITE_COLOR,
                        }}>
                        {t("replace")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className={classes.uploadImageBox} onClick={() => onUploadClick()}>
                <Typography className='switchbox' variant='p4regular'>
                  <Box className={classes.blackRoundIcon}>
                    <ArrowUpward />
                  </Box>
                  Choose your video
                </Typography>
              </Box>
            )
          ) : null}
          {playerFlow === "youtube" ? (
            <Box className='rowBox'>
              <Typography className='labelbox' variant='p4regular'>
                Video URL*
              </Typography>
              <TextField
                multiline
                value={content.Url}
                onChange={(e) => handleDataChange(e, "Url")}
                variant='outlined'
                size='small'
                placeholder='write a Url here'
              />
            </Box>
          ) : null}
        </Box>
        <Box className='rowBox'>
          <Typography className='labelbox' variant='p4regular'>
            What is the title of the Video?*
          </Typography>
          <TextField
            multiline
            value={content.Title}
            onChange={(e) => handleDataChange(e, "Title")}
            variant='outlined'
            size='small'
            placeholder='write a title here'
          />
        </Box>
        <Box className='rowBox'>
          <Typography className='labelbox' variant='p4regular'>
            What is this Video about?
          </Typography>
          <TextField
            multiline
            value={content.Description}
            onChange={(e) => handleDataChange(e, "Description")}
            variant='outlined'
            size='small'
            placeholder='write a description here'
          />
        </Box>
        <Box className='rowBox'>
          <Typography className='switchbox' variant='p4regular'>
            Attribution
            <BasicSwitch
              color={ThemeConstants.BLACK_COLOR}
              checked={content.Attribution}
              onChange={(e: any) => handleAttribution(e, "Attribution")}
            />
          </Typography>
        </Box>
        <Box className='rowBox'>
          <Typography className='switchbox' variant='p4regular'>
            CC
            <BasicSwitch
              color={ThemeConstants.BLACK_COLOR}
              checked={content.CC}
              onChange={(e: any) => handleAttribution(e, "CC")}
            />
          </Typography>
        </Box>
        <Box className='rowBox'>
          <Typography className='switchbox' variant='p4regular'>
            Transcript
            <BasicSwitch
              color={ThemeConstants.BLACK_COLOR}
              checked={content.Transcript}
              onChange={(e: any) => handleAttribution(e, "Transcript")}
            />
          </Typography>
        </Box>
        {(content.Title === "" || content.Title.trim().length === 0 || content.Url === "") && (
          <Box className='rowBox'>
            <Typography className='labelbox' variant='p4regular'>
              *Please fill the mandatory fields
            </Typography>
          </Box>
        )}
        <Box className='rowBox'>
          <Button
            disabled={getDisabledState()}
            variant='contained'
            sx={{ width: "100%" }}
            onClick={UpdatePrelemInfo}>
            Done
          </Button>
        </Box>
      </Box>
      {galleryDialogOpen && (
        <DamContentGallery
          handleSelectedVideo={handleSelectedVideo}
          toggleGallery={toggleGallery}
          assetType={"Video"}
          dialogOpen={galleryDialogOpen}
        />
      )}
    </>
  );
};
export default PrelemVideos;
