/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { AutoTextArea, PlatXLogo, HandsIcon, TextBox, SiteNewIcon } from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
};

export default function PlateformXCreatestep1Dialog({
  isDialogOpen,
  closeButtonHandle,
}: DialogList) {
  const classes = useCreatesiteStepStyle();

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
          <Box className={classes.modalboxone}>
            <Grid container className={classes.modalcontainer}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Box>
                  <img src={PlatXLogo} alt='logo' />
                </Box>
                <Box>
                  <Typography variant='h7regular'>step 1 out of 5</Typography>
                  <Typography variant='h3bold'>
                    <img src={HandsIcon} alt='icon' />
                    Hi, John! What'll be your site Name?
                  </Typography>
                  <Typography variant='h7medium'>
                    In case your unclear about the name. You can rename it later and skip it.
                  </Typography>
                </Box>
                <Box marginTop={2}>
                  <TextBox />
                </Box>
                <Box marginTop={2}>
                  <TextBox placeHolder={"Enter the Site Name"} />
                </Box>
                <Box marginTop={2}>
                  <AutoTextArea
                    name='short_description'
                    placeHolder={"Enter the Site description"}
                    maxCharLength={400}
                  />
                </Box>
                <Box sx={{ marginLeft: "2px", gap: "5px", float: "right" }}>
                  <Button sx={{ marginRight: "10px" }} variant='outlined'>
                    cancel
                  </Button>
                  <Button variant='primaryButton'>Next</Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box
                  sx={{
                    width: "42%",
                    height: "107px",
                    textalign: "center",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}>
                  <Typography variant='h2bold'>Make your website with only a few clicks</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    style={{ marginBottom: "25px", marginRight: "10px" }}
                    src={SiteNewIcon}
                    alt='icon'
                  />
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
