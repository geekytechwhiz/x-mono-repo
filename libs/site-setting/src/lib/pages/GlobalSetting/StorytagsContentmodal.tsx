import { Box, Button, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { Tagvod, Tagevent, Tagquiz, Tagpoll, Tagarticalnew } from "@platformx/utilities";
import { useState } from "react";
import { useStoryStyle } from "./Storytags.style";
import { t } from "i18next";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  onDone: any;
  site_assigned_content_types: any;
};

export default function PlateformXStoryContentDialog({
  isDialogOpen,
  closeButtonHandle,
  onDone,
  site_assigned_content_types,
}: DialogList) {
  const classes = useStoryStyle();

  const [selectedItems, setSelectedItems] = useState<string[]>(site_assigned_content_types);

  const mockData = [
    {
      contenttype: "Quiz",
      icon: Tagquiz,
      description: "Quiz is a test of knowledge of understanding through...",
    },
    {
      contenttype: "Article",
      icon: Tagarticalnew,
      description: "Article is a test of knowledge of understanding through...",
    },
    {
      contenttype: "Event",
      icon: Tagevent,
      description: "Event is a test of knowledge of understanding through...",
    },
    {
      contenttype: "Vod",
      icon: Tagvod,
      description: "Vod is a test of knowledge of understanding through...",
    },
    {
      contenttype: "Poll",
      icon: Tagpoll,
      description: "Poll is a test of knowledge of understanding through....",
    },
  ];

  const toggleSelection = (item: string) => {
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedSelectedItems);
  };

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
              <Typography variant='h5bold'>{t("my_story_content_type")}</Typography>
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
                  <Button onClick={closeButtonHandle} className={classes.btn} variant='outlined'>
                    {t("cancel")}
                  </Button>
                  <Button
                    onClick={() => {
                      closeButtonHandle();
                      onDone(selectedItems);
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
          <Box className={classes.contentContainer}>
            <Grid container className={classes.gcontainer}>
              {mockData.map((transaction) => (
                <Grid item xs={12} md={6} em={4} key={transaction.contenttype}>
                  <Box
                    className={`${classes.boxin} ${
                      selectedItems.includes(transaction.contenttype) ? classes.selected : ""
                    }`}
                    onClick={() => toggleSelection(transaction.contenttype)}>
                    <Box
                      className={`${classes.borderbox} ${
                        selectedItems.includes(transaction.contenttype) ? classes.borderboxnew : ""
                      }`}>
                      <Box
                        className={` ${
                          selectedItems.includes(transaction.contenttype)
                            ? classes.contenttypeicon
                            : ""
                        }`}>
                        <img src={transaction.icon} alt='vodicon' />
                      </Box>
                    </Box>
                    <Box className={classes.boxintypo}>
                      <Typography
                        className={`${classes.typobreak} ${
                          selectedItems.includes(transaction.contenttype) ? classes.typobreakn : ""
                        }`}
                        variant='h5semibold'>
                        {transaction.contenttype}
                      </Typography>
                      <Typography className={classes.typobreaknew}>
                        {transaction.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
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
