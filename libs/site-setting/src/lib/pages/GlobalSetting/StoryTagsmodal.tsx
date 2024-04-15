import { Box, Button, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { useStoryStyle } from "./Storytags.style";
import { ChooseTags } from "@platformx/content";
import { useEffect, useState } from "react";
import { articleApi } from "@platformx/authoring-apis";
import { t } from "i18next";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  onDone: any;
  tags: any;
};

export default function PlateformXStoryDialog({
  isDialogOpen,
  closeButtonHandle,
  onDone,
  tags,
}: DialogList) {
  const classes = useStoryStyle();
  const [tagData, setTagData] = useState([]);
  const [tagArr, setTagArr] = useState<any>(tags);
  const handleTagOnChange = (event) => {
    const updatedSelectedItems = tagArr.includes(event.target.value)
      ? tagArr.filter((selectedItem) => selectedItem !== event.target.value)
      : [...tagArr, event.target.value];

    setTagArr(updatedSelectedItems);
  };

  const getTags = async () => {
    try {
      const res: any = await articleApi.getTags({
        start: 0,
        rows: 1000,
      });
      if (res?.authoring_getTagsList) {
        setTagData(res?.authoring_getTagsList);
      }
    } catch (err: any) {
      setTagData([]);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <Box className='socialsharemodal'>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        className={classes.dialograpper}>
        <Box className={classes.dialogboxin}>
          <Box className={classes.modalboxone}>
            <Box>
              <Typography variant='h5bold'>{t("my_story_tags")}</Typography>
            </Box>
            <Grid container>
              <Grid item xs={8} md={6} lg={6}>
                <Box>
                  <Typography variant='h7regular' className={classes.textupload}>
                    {t("mystory_info")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} md={6} lg={6}>
                <Box className={classes.boxbtn}>
                  <Button className={classes.btn} onClick={closeButtonHandle} variant='outlined'>
                    {t("cancel")}
                  </Button>
                  <Button
                    onClick={() => {
                      closeButtonHandle();
                      onDone(tagArr);
                    }}
                    variant='primaryButton'>
                    {t("save")}
                  </Button>
                </Box>
                <Box className={classes.closeicon}>
                  <CloseIcon onClick={closeButtonHandle} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.pageContainer} id='scrollableDiv'>
          <Box className={classes.contentContainernew}>
            <Grid container>
              <Grid item md={12}>
                <ChooseTags
                  tagData={tagData}
                  selectedTag={tagArr}
                  handleTagOnChange={handleTagOnChange}
                  isEdit={true}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Grid container>
          <Grid item xs={12}>
            <Box className={classes.savebtn}>
              <Button className={classes.savenewbtn} variant='primaryButton'>
                save
              </Button>
            </Box>
          </Grid>
        </Grid> */}
      </Dialog>
    </Box>
  );
}
