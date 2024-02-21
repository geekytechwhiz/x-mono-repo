import { Box, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import {
  ShowToastError,
  Tagvod,
  Tagevent,
  Tagquiz,
  Tagpoll,
  Tagarticalnew,
} from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { FETCH_TAG_LIST } from "@platformx/authoring-apis";
import { useStoryStyle } from "./Storytags.style";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
};

export default function PlateformXStoryContentDialog({
  isDialogOpen,
  closeButtonHandle,
}: DialogList) {
  const classes = useStoryStyle();
  const { t } = useTranslation();
  const [tagData, setTagData] = useState<any>({});
  const [runFetchTagList] = useLazyQuery(FETCH_TAG_LIST);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // State to store selected items

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

  const toggleSelection = (item: string) => {
    // Store the updated state value in a variable
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item) // Deselect if already selected
      : [...selectedItems, item]; // Select if not selected

    // Use the variable to set the state
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
          <Box className={classes.modalbox} onClick={closeButtonHandle}></Box>
          <Box className={classes.modalboxone}>
            <Box>
              <Typography variant='h5bold'>My Story Content Type</Typography>
            </Box>
            <Box sx={{ display: "inline-flex" }}>
              <Box>
                <Typography variant='h7regular' className={classes.textupload}>
                  choosing keywords to categories and organize information for easy retrieval and
                  navigation.
                </Typography>
              </Box>
              <Box className={classes.boxbtn}>
                <Button onClick={closeButtonHandle} className={classes.btn} variant='outlined'>
                  cancel
                </Button>
                <Button variant='primaryButton'>save</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.pageContainer} id='scrollableDiv'>
          <Box className={classes.contentContainer}>
            <Grid container sx={{ position: "relative", top: "30%" }}>
              {mockData.map((transaction) => (
                <Grid item md={6} em={4} key={transaction.contenttype}>
                  <Box
                    className={`${classes.boxin} ${
                      selectedItems.includes(transaction.contenttype) ? classes.selected : ""
                    }`}
                    onClick={() => toggleSelection(transaction.contenttype)} // Toggle selection on click
                  >
                    <Box className={classes.borderbox}>
                      <Box>
                        <img src={transaction.icon} alt='vodicon' />
                      </Box>
                    </Box>
                    <Box className={classes.boxintypo}>
                      <Typography className={classes.typobreak} variant='h5semibold'>
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
      </Dialog>
    </Box>
  );
}
