/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { PlatXLogo, Sitethemeicon } from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";
import { Progressbar } from "../SiteListing/Progressbar";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
};

export default function PlateformXCreatestep2Dialog({
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
          <Box className={classes.modalcontain}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6} marginTop={"20px"}>
                <Box className={classes.xlogo}>
                  <img src={PlatXLogo} alt='logo' />
                </Box>
                <Box className={classes.progrebar}>
                  <Progressbar />
                </Box>
                <Box className={classes.textmargin}>
                  <Typography variant='h7regular'>step 2 out of 5</Typography>
                  <Typography variant='h3bold'>Select Your theme</Typography>
                  <Typography sx={{ color: "#4E4B66" }} variant='h7medium'>
                    Select the home page theme based on your requirement. if you'd like, you can
                    finsh it later.
                  </Typography>
                </Box>
                <Box className={classes.cancelbtn}>
                  <Button className={classes.innercancel} variant='outlined'>
                    cancel
                  </Button>
                  <Button variant='primaryButton'>Next</Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box
                  sx={{
                    width: "516px",
                    height: "530px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF",
                    border: "1px solid #D9DBE9",
                  }}>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <img src={PlatXLogo} alt='icon' />
                    <Typography>About</Typography>
                    <Typography>Features</Typography>
                    <Typography>Services</Typography>
                    <Typography>Blog</Typography>
                    <Typography>Contact</Typography>
                  </Box>
                  <Box>
                    <img src={Sitethemeicon} alt='icon ' />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
