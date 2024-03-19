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

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  handlenextbutton: any;
  handlebackbutton: any;
};

export default function PlateformXCreatestep3Dialog({
  isDialogOpen,
  closeButtonHandle,
  handlenextbutton,
  handlebackbutton,
}: DialogList) {
  const classes = useCreatesiteStepStyle();
  const handleFilterClose = () => {
    // setAnchor(null);
  };
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
                      <Grid item xs={6} sm={6} md={4} lg={4} key={item.id} marginTop={"13px"}>
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
                      <Typography className={classes.skipbtncolor}>Skip</Typography>
                      <ArrowForwardIosIcon
                        className={classes.skipbtncolor}
                        onClick={() => {
                          handlenextbutton({ step4: true });
                          handleFilterClose();
                        }}
                      />
                    </Box>
                    <Box className={classes.backbtn}>
                      <Button
                        className={classes.innercancel}
                        onClick={() => {
                          handlebackbutton({ step3: false });
                          handleFilterClose();
                        }}
                        variant='outlined'>
                        back
                      </Button>
                      <Button
                        onClick={() => {
                          handlenextbutton({ step4: true });
                          handleFilterClose();
                        }}
                        variant='primaryButton'>
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.maincontain}>
                  <Box className={classes.maininnercontain}>
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
                <Box className={classes.step3boxn}>
                  <Box className={classes.step3imgn}>
                    <img className={classes.imgwidthstep3} src={Step3newimg} alt='ici' />
                    <Box className={classes.step3justify}>
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
