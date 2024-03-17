/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {
  PlatXLogo,
  Sitethemenewicon,
  Sitethemenewnewicon,
  Sitejourneyimg,
  Sitethemeframe,
  Elipse1,
  Elipse2,
  Elipse3,
  Elipse4,
  Elipse5,
} from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton from "@mui/material/Skeleton";
import { Progressbar } from "../SiteListing/Progressbar";
import { useState } from "react";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  handlenextbutton: any;
  handlebackbutton: any;
};

export default function PlateformXCreatestep2Dialog({
  isDialogOpen,
  closeButtonHandle,
  handlenextbutton,
  handlebackbutton,
}: DialogList) {
  const classes = useCreatesiteStepStyle();
  const [selectedImage, setSelectedImage] = useState(Sitethemenewicon);
  const handleFilterClose = () => {
    // setAnchor(null);
  };
  // Mock data (replace with your actual image URLs)
  const mockData = [
    { id: 1, url: Sitethemenewicon },
    { id: 2, url: Sitethemenewnewicon },
    { id: 3, url: Sitejourneyimg },
    { id: 4, url: Sitethemeframe },
    { id: 5, url: Sitejourneyimg },
    { id: 6, url: Sitethemenewnewicon },
    { id: 7, url: Sitethemenewnewicon },
    { id: 8, url: Sitethemenewicon },
  ];

  // Function to handle click on image box
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  // useEffect(() => {
  //   if(progress === 10) {
  //   setProgress(20);
  //   }
  //     }, [progress]);
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
                    <Progressbar progress={25} />
                  </Box>
                  <Box className={classes.textmargin}>
                    <Typography variant='h7regular'>Step 2 out of 5</Typography>
                    <Typography variant='h3bold'>Select Your theme</Typography>
                    <Typography className={classes.step2typo} variant='h5medium'>
                      Select the home page theme based on your requirement. if you'd like, you can
                      finsh it later.
                    </Typography>
                  </Box>
                  <Box className={classes.boxscroll}>
                    <Grid container spacing={2}>
                      {/* Mapping over mock data to display images */}
                      {mockData.map((image) => (
                        <Grid item xs={12} sm={4} md={3} lg={6} key={image.id}>
                          <Box
                            className={`${classes.themebox} ${
                              selectedImage === image.url && classes.selected
                            }`}
                            onClick={() => handleImageClick(image.url)} // Pass image URL to handleImageClick function
                          >
                            <img src={image.url} alt={`image-${image.id}`} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Box className={classes.btnbox}>
                    <Box className={classes.skipbtn}>
                      <Typography className={classes.skipbtncolor}>Skip</Typography>
                      <ArrowForwardIosIcon
                        onClick={() => {
                          handlenextbutton({ step3: true });
                          handleFilterClose();
                        }}
                        className={classes.skipbtncolor}
                      />
                    </Box>
                    <Box className={classes.backbtn}>
                      <Button
                        className={classes.innercancel}
                        variant='outlined'
                        onClick={() => {
                          handlebackbutton({ step2: false });
                          handleFilterClose();
                        }}>
                        back
                      </Button>
                      <Button
                        variant='primaryButton'
                        onClick={() => {
                          handlenextbutton({ step3: true });
                          handleFilterClose();
                        }}>
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.maincontain}>
                  <Box className={classes.step2container}>
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
                    <Box>
                      <img className={classes.imgbox} src={selectedImage} alt='icon ' />
                    </Box>
                    <Box className={classes.skeletons}>
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
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.step2containerbox2}>
                  <Box className={classes.box1}>
                    <Box className={classes.textpadding}>
                      <Typography variant='h5semibold'>Colours</Typography>
                      <Box className={classes.boxadd}>
                        <Box>
                          <Typography variant='h6medium'>Primary</Typography>
                          <img src={Elipse1} alt='icon' />
                          <img src={Elipse2} alt='icon' />
                        </Box>
                        <Box>
                          <Typography className={classes.textleft} variant='h6medium'>
                            Secondary
                          </Typography>
                          <img src={Elipse3} alt='icon' />
                          <img src={Elipse4} alt='icon' />
                          <img src={Elipse5} alt='icon' />
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.textpaddingnew}>
                      <Typography variant='h5semibold'>Font Family</Typography>
                      <Box className={classes.typospace}>
                        <Box>
                          <Typography variant='h6medium'>Primary</Typography>
                          <Typography variant='h3semibold'>Poppins</Typography>
                        </Box>
                        <Box>
                          <Typography variant='h6medium'>Secondary</Typography>
                          <Typography variant='h3semibold'>Roboto</Typography>
                        </Box>
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
