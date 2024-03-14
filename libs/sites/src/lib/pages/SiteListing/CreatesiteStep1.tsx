/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { AutoTextArea, PlatXLogo, HandsIcon, TextBox, SiteNewIcon } from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";
import { useState } from "react";
import { Progressbar } from "../SiteListing/Progressbar";
import PlateformXCreatestep2Dialog from "./CreateStep2";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
};

export default function PlateformXCreatestep1Dialog({
  isDialogOpen,
  closeButtonHandle,
}: DialogList) {
  const classes = useCreatesiteStepStyle();
  const [, setAge] = useState("");
  const [folderValue, setFolderValue] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleFilterClose = () => {
    // setAnchor(null);
  };
  //   useEffect(() => {
  // if(progress === 0) {
  // setProgress(10);
  // }
  //   }, [progress]);

  return (
    <Box className='socialsharemodal'>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        className={classes.dialograpper}>
        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
          }}>
          <Box className={classes.modalbox} onClick={closeButtonHandle}>
            <CloseIcon className={classes.closeicon} />
          </Box>
          <Box className={classes.modalcontain}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6} marginTop={"20px"}>
                <Box sx={{ padding: "5px 90px 5px 154px" }}>
                  <Box className={classes.xlogo}>
                    <img src={PlatXLogo} alt='logo' />
                  </Box>
                  <Box className={classes.progrebar}>
                    <Progressbar progress={progress} />
                  </Box>
                  <Box className={classes.textmargin}>
                    <Typography variant='h7regular'>Step 1 out of 5</Typography>
                    <Typography className={classes.handsicon} variant='h3bold'>
                      <img src={HandsIcon} alt='icon' />
                      Hi, John! What'll be your site Name?
                    </Typography>
                    <Typography variant='h7medium'>
                      In case your unclear about the name. You can rename it later and skip it.
                    </Typography>
                  </Box>
                  <Box className={classes.inputselect}>
                    <Box marginTop={2}>
                      <FormControl fullWidth>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          placeholder='Select the domain'
                          onChange={handleChange}>
                          <MenuItem value={10}>Sports</MenuItem>
                          <MenuItem value={20}>Bollywood</MenuItem>
                          <MenuItem value={30}>Fashion</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box marginTop={2} marginRight={-2}>
                      <TextBox maxCharLength={50} placeHolder={"Enter the Site Name"} />
                    </Box>
                    <Box marginTop={2}>
                      <AutoTextArea
                        name='short_description'
                        placeHolder={"Enter the Site description"}
                        maxCharLength={400}
                      />
                    </Box>
                  </Box>
                  <Box className={classes.cancelbtn}>
                    <Button
                      onClick={closeButtonHandle}
                      className={classes.innercancel}
                      variant='outlined'>
                      cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setFolderValue(true);
                        handleFilterClose();
                      }}
                      variant='primaryButton'>
                      Next
                    </Button>
                  </Box>
                </Box>
                <PlateformXCreatestep2Dialog
                  isDialogOpen={folderValue}
                  progress={progress}
                  setProgress={setProgress}
                  closeButtonHandle={() => setFolderValue(false)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.createcontain}>
                  <Typography className={classes.typowidth} variant='h2bold'>
                    Make your website with only a few clicks
                  </Typography>
                </Box>
                <Box className={classes.siteicon}>
                  <img className={classes.siteiconinner} src={SiteNewIcon} alt='icon' />
                  <img src={SiteNewIcon} alt='icon' />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
