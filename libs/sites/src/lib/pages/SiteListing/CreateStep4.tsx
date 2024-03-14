/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { PlatXLogo, Step4img, Step4imgupdate } from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Progressbar } from "../SiteListing/Progressbar";
import { useState } from "react";
import PlateformXCreatestep3Dialog from "./CreateStep3";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  progress: any;
  setProgress: any;
};

export default function PlateformXCreatestep4Dialog({
  isDialogOpen,
  closeButtonHandle,
  progress,
  setProgress,
}: DialogList) {
  const classes = useCreatesiteStepStyle();
  const [backstep3, setBackStep3] = useState(false);

  // Function to handle click on image box
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
                <Box className={classes.platxlogo}>
                  <Box className={classes.xlogo}>
                    <img src={PlatXLogo} alt='logo' />
                  </Box>
                  <Box className={classes.progrebar}>
                    <Progressbar progress={75} />
                  </Box>
                  <Box className={classes.textmargin}>
                    <Typography variant='h7regular'>Step 4 out of 5</Typography>
                    <Typography variant='h3bold'>Choose Tags</Typography>
                    <Typography className={classes.step2typo} variant='h5medium'>
                      Choose the tags that certain to your company. it will contribute to better SEO
                      ranking.
                    </Typography>
                  </Box>
                  <Grid container>
                    <Grid item xs={6} sm={4} md={3} lg={12}></Grid>
                  </Grid>

                  <Box className={classes.btnbox}>
                    <Box className={classes.skipbtn}>
                      <Typography sx={{ color: "#4B9EF9" }}>Skip</Typography>
                      <ArrowForwardIosIcon sx={{ color: "#4B9EF9" }} />
                    </Box>
                    <Box className={classes.backbtn}>
                      <Button
                        onClick={() => {
                          setBackStep3(true);
                        }}
                        className={classes.innercancel}
                        variant='outlined'>
                        back
                      </Button>
                      <Button variant='primaryButton'>Next</Button>
                      <PlateformXCreatestep3Dialog
                        isDialogOpen={backstep3}
                        closeButtonHandle={() => setBackStep3(false)}
                        progress={undefined}
                        setProgress={undefined}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.createcontainnew}>
                  <Typography className={classes.typowidthstep4} variant='h2bold'>
                    Choose the tags to provide additional information about the website and promote
                    it widely
                  </Typography>
                </Box>
                <Box className={classes.siteiconnew}>
                  <img className={classes.siteiconinner} src={Step4img} alt='icon' />
                  <img src={Step4imgupdate} alt='icon' />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
