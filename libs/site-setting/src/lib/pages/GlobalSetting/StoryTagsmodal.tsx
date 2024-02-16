import { Box, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useStoryStyle } from "./Storytags.style";
import { useTranslation } from "react-i18next";
import { ShowToastError } from "@platformx/utilities";
import ChooseTags from "libs/content/src/lib/pages/quiz/components/choosetags/ChooseTags";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { FETCH_TAG_LIST } from "@platformx/authoring-apis";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
};

export default function PlateformXStoryDialog({ isDialogOpen, closeButtonHandle }: DialogList) {
  const classes = useStoryStyle();
  const { t } = useTranslation();
  const [tagData, setTagData] = useState<any>({});
  const [tagArr] = useState<any>([]);
  const [runFetchTagList] = useLazyQuery(FETCH_TAG_LIST);

  useEffect(() => {
    if (Object.keys(tagData).length === 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            setTagData(res?.data?.authoring_getTagsList);
          }
        })
        .catch(() => {
          ShowToastError(t("api_error_toast"));
        });
    }
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
          <Box className={classes.modalbox} onClick={closeButtonHandle}></Box>
          <Box className={classes.modalboxone}>
            <Box>
              <Typography variant='h5bold'>My Story Tags</Typography>
            </Box>
            <Box sx={{ display: "inline-flex" }}>
              <Box>
                <Typography variant='h7regular' className={classes.textupload}>
                  choosing keywords to categories and organize information for easy retrival and
                  nevigation.
                </Typography>
              </Box>
              <Box className={classes.boxbtn}>
                <Button onClick={closeButtonHandle} className={classes.btn} variant='outlined'>
                  cancel
                </Button>
                <Button variant='outlined'>save</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.pageContainer} id='scrollableDiv'>
          <Box className={classes.contentContainer}>
            <Grid container>
              <Grid item></Grid>
              <Grid item>
                {" "}
                <ChooseTags
                  tagData={tagData}
                  selectedTag={tagArr}
                  handleTagOnChange={""}
                  isEdit={""}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
