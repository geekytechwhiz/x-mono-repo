import { Box, Container, Typography, Grid, Button } from "@mui/material";
import React from "react";
import ImageRender from "../../../components/ImageRender";
import { Facebook, Instagram, Twitter, SportsSoccerOutlined } from "@mui/icons-material";
import prelemTypes from "../../../globalStyle";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useCustomStyle } from "./HeroSection.style";
import "../../../Style.css";

const HeroSection = ({ content, authoringHelper, secondaryArgs }: any) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  //This needs to be removed. Use only buttons in these cases.
  //Basic button should be used only when it requires insitu editing.

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.HeroSectionWrapper} ${globalClasses.prelemType1} prelem prelemType1 HeroSectionBg`}>
      <Box className='heroSectionWp'>
        <Box className='imageWrapper widthheight100'>
          <ImageRender
            originalImage={content?.background_image?.items?.["hclplatformx:original_image"]}
            publishedImages={content?.background_image?.items?.["hclplatformx:published_images"]}
            secondaryArgs={secondaryArgs}
            imgOrder={{
              1440: "square",
              1280: "square",
              1024: "square",
              768: "square",
              600: "square",
              320: "square",
            }}
          />
        </Box>
        <Box className='herocontent'>
          <Container className={authoringHelper?.isEditPage ? `grid_full_width` : `grid_container`}>
            <Grid container className='middlecontainer'>
              <Grid xs={12} md={12} em={5}>
                <Box className='fullNameWp'>
                  <Box className='FirstNameWp'>
                    <Box className='innerText'>
                      <Typography
                        variant='h1largebold'
                        sx={{
                          fontSize: { xs: "34px", em: "45px", lg: "80px" },
                        }}>
                        {content.first_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className='LastNameWp'>
                    <Box className='innerText'>
                      <Typography
                        variant='h1largebold'
                        color='tertiaryLabel'
                        sx={{
                          fontSize: { xs: "34px", em: "45px", lg: "80px" },
                        }}>
                        {content.last_name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant='h4bold' color='textColor' sx={{ textTransform: "uppercase" }}>
                  {content.position}
                </Typography>
                <Box className='Rightdetailswp'>
                  <Box className='boxText'>
                    <Typography variant='h7bold' color='textColor'>
                      Label
                    </Typography>
                    <Typography variant='h1bold' color='textColor'>
                      {content.tshirt_number}
                    </Typography>
                  </Box>
                  <Box className='boxText'>
                    <Typography variant='h7bold' color='textColor'>
                      Total Goals
                    </Typography>
                    <Typography variant='h1bold' color='textColor'>
                      {content.goals}
                    </Typography>
                  </Box>
                  <Box className='boxText'>
                    <Typography variant='h7bold' color='textColor'>
                      Appearnaces
                    </Typography>
                    <Typography variant='h1bold' color='textColor'>
                      {content.appearnaces}
                    </Typography>
                  </Box>
                </Box>
                <Button variant='primaryButton1'>BUY MY T-SHIRT</Button>
                <Box className='socialLinks'>
                  <Typography variant='h6regular' color='textColor'>
                    Follow me
                  </Typography>
                  <Box className='icons' color='textColor'>
                    <Facebook sx={{ color: "textColor" }} />
                    <Twitter sx={{ color: "textColor" }} />
                    <Instagram sx={{ color: "textColor" }} />
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} md={12} em={7}>
                <Box className='profileImgWpMain'>
                  <Box className='TnoBig'>
                    <Typography variant='h1bold' color='textColor'>
                      {content.tshirt_number}
                    </Typography>
                  </Box>
                  <Box className='countryTopLeft'>
                    <Box className='globeIcon'>
                      <PublicOutlinedIcon />
                    </Box>
                    <Box className='rightText'>
                      <Typography variant='h7bold' color='textColor'>
                        Country
                      </Typography>
                      <Typography variant='h4bold' color='textColor'>
                        {content.country}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className='matchRightBottom'>
                    <Box className='playerIcon'>
                      <SportsSoccerOutlined sx={{ color: "textColor" }} />
                    </Box>
                    <Box className='rightText'>
                      <Typography variant='h7bold' color='textColor'>
                        Total Match Played
                      </Typography>
                      <Typography variant='h4bold' color='textColor'>
                        {content.appearnaces}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className='midImg'>
                    <ImageRender
                      originalImage={content?.profile_image?.items?.["hclplatformx:original_image"]}
                      publishedImages={
                        content?.profile_image?.items?.["hclplatformx:published_images"]
                      }
                      secondaryArgs={secondaryArgs}
                      imgOrder={{
                        1440: "square",
                        1280: "square",
                        1024: "square",
                        768: "square",
                        600: "square",
                        320: "square",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* <Box className='ButtonsWp'>
          <Box className='buttonIcon preBtn'>
            <KeyboardArrowLeftIcon />
            <Box className='overHover' sx={{ left: 0 }}>
              <Box className='hovicon'>
                <ImageRender
                  originalImage={content?.ImageCompound?.background_image?.original_image}
                  publishedImages={content?.ImageCompound?.profile_image?.published_images}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "square",
                    1280: "square",
                    1024: "square",
                    768: "square",
                    600: "square",
                    320: "square",
                  }}
                />
              </Box>
              <Typography variant='h5bold'>Midfielder</Typography>
            </Box>
          </Box>
          <Box className='buttonIcon nextBtn'>
            <KeyboardArrowRightIcon />
            <Box className='overHover' sx={{ right: 0 }}>
              <Typography variant='h5bold'>Midfielder</Typography>
              <Box className='hovicon'>
                <ImageRender
                  originalImage={content?.ImageCompound?.background_image?.original_image}
                  publishedImages={content?.ImageCompound?.profile_image?.published_images}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "square",
                    1280: "square",
                    1024: "square",
                    768: "square",
                    600: "square",
                    320: "square",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </div>
  );
};

export default HeroSection;
