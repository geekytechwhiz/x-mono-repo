/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { PlatXLogo, Step3newimg } from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton from "@mui/material/Skeleton";
import { Progressbar } from "../SiteListing/Progressbar";
import { useState } from "react";
import PlateformXCreatestep4Dialog from "./CreateStep4";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  progress: any;
  setProgress: any;
};

export default function PlateformXCreatestep3Dialog({
  isDialogOpen,
  closeButtonHandle,
  progress,
  setProgress,
}: DialogList) {
  const classes = useCreatesiteStepStyle();
  const [backstep3, setBackStep3] = useState(false);
  // Mock data (replace with your actual image URLs)
  const mockData = [
    { id: 1, value: "home" },
    { id: 2, value: "About" },
    { id: 3, value: "Gallery" },
    { id: 4, value: "Features" },
    { id: 5, value: "Team" },
    { id: 6, value: "Resources" },
    { id: 7, value: "Creer" },
    { id: 8, value: "News" },
    { id: 8, value: "FAQ" },
    { id: 8, value: "Shops" },
    { id: 8, value: "Blog" },
    { id: 8, value: "dialog" },
  ];

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
                    <Progressbar progress={50} />
                  </Box>
                  <Box className={classes.textmargin}>
                    <Typography variant='h7regular'>Step 3 out of 5</Typography>
                    <Typography variant='h3bold'>Create your pages</Typography>
                    <Typography className={classes.step2typo} variant='h5medium'>
                      All the pages that will show up in your header can be added here. you can edit
                      it later as well.
                    </Typography>
                  </Box>
                  <Grid container>
                    {/* Mapping over mock data to display images */}
                    {mockData.map((item) => (
                      <Grid item xs={6} sm={4} md={3} lg={4} key={item.id} marginTop={"13px"}>
                        <Button
                          sx={{ marginTop: "10px", width: "160px" }}
                          variant='outlined'
                          key={item.id}
                          name={item.value}>
                          {item.value}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  <Box className={classes.btnbox}>
                    <Box className={classes.skipbtn}>
                      <Typography sx={{ color: "#4B9EF9" }}>Skip</Typography>
                      <ArrowForwardIosIcon sx={{ color: "#4B9EF9" }} />
                    </Box>
                    <Box className={classes.backbtn}>
                      <Button className={classes.innercancel} variant='outlined'>
                        back
                      </Button>
                      <Button
                        onClick={() => {
                          setBackStep3(true);
                        }}
                        variant='primaryButton'>
                        Next
                      </Button>
                      <PlateformXCreatestep4Dialog
                        isDialogOpen={backstep3}
                        closeButtonHandle={() => setBackStep3(false)}
                        progress={undefined}
                        setProgress={undefined}
                        tags={true}
                        isEdit={false}
                        tagData={true}
                        selectedTag={true}
                        handleTagOnChange={true}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.maincontain}>
                  <Box
                    sx={{
                      width: "540px",
                      height: "64px",
                      borderRadius: "5px",
                      backgroundColor: "#FFF",
                      boxShadow: "0px 49px 57px 0px rgba(0, 0, 0, 0.30)",
                      marginTop: "73px",
                    }}>
                    <Box className={classes.step2innercontainer}>
                      <Box>
                        <img src={PlatXLogo} alt='icon' />
                      </Box>
                      <Box className={classes.applyflex}>
                        <Typography variant='h7medium'>About</Typography>
                        <Typography variant='h7medium' className={classes.headertypo}>
                          Features
                        </Typography>
                        <Typography variant='h7medium' className={classes.headertypo}>
                          Services
                        </Typography>
                        <Typography variant='h7medium' className={classes.headertypo}>
                          Blog
                        </Typography>
                        <Typography variant='h7medium' className={classes.headertypo}>
                          Contact
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ width: "462px", height: "424px", backgroundColor: "#FFF" }}>
                    <img style={{ width: "100%" }} src={Step3newimg} alt='ici' />
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box className={classes.skeletonboxstep2}>
                        <Skeleton
                          className={classes.skeletonloader}
                          variant='rectangular'
                          width={300}
                          height={10}
                        />
                        <Skeleton
                          className={classes.skeletonloadernew}
                          variant='rectangular'
                          width={200}
                          height={10}
                        />
                        <Skeleton
                          className={classes.skeletonloader}
                          variant='rectangular'
                          width={300}
                          height={10}
                        />
                        <Skeleton
                          className={classes.skeletonloadernew}
                          variant='rectangular'
                          width={200}
                          height={10}
                        />
                        <Skeleton
                          className={classes.skeletonloader}
                          variant='rectangular'
                          width={300}
                          height={10}
                        />
                        <Skeleton
                          className={classes.skeletonloadernew}
                          variant='rectangular'
                          width={200}
                          height={10}
                        />
                      </Box>
                    </Box>
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
