import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import prelemTypes from "../../../globalStyle";
import { useCustomStyle } from "./Profile.style";
import "../../../Style.css";
import ImageRender from "../../../components/ImageRender";
import { CakeOutlined, DescriptionOutlined, PublicOutlined } from "@mui/icons-material";
import { format } from "date-fns";

const Profile = ({ content, authoringHelper, secondaryArgs }: any) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.ProfileWrapper} ${globalClasses.prelemType1} prelem prelemType1 about-us2 ProfileBg`}>
      <Container
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }>
        <Box className='rightBox'>
          <Box className='boxWp'>
            <Typography variant='h3bold'>Debut</Typography>
            <Box className='botBox bgbox1'>
              <Box className='imgWp'>
                <ImageRender
                  originalImage={content?.debut_image?.items?.["hclplatformx:original_image"]}
                  publishedImages={content?.debut_image?.items?.["hclplatformx:published_images"]}
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
              <Typography variant='p3medium' color='textColor'>
                {content.debut_opposition}
              </Typography>
              <Typography variant='h7regular' sx={{ textTransform: "uppercase" }}>
                {format(new Date(content.debut_date), "MMM dd, yyyy")}
              </Typography>
            </Box>
          </Box>
          <Box className='boxWp'>
            <Typography variant='h3bold'>International Debut</Typography>
            <Box className='botBox bgbox2'>
              <Box className='imgWp'>
                <ImageRender
                  originalImage={
                    content?.international_debut_image?.items?.["hclplatformx:original_image"]
                  }
                  publishedImages={
                    content?.international_debut_image?.items?.["hclplatformx:published_images"]
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
              <Typography variant='p3medium' color='textColor'>
                {content.international_debut_oppostion}
              </Typography>
              <Typography variant='h7regular' sx={{ textTransform: "uppercase" }}>
                {format(new Date(content.international_debut_date), "MMM dd, yyyy")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className='leftContent'>
          <Typography variant='h2bold'>{content.full_name}</Typography>
          <Grid container>
            <Grid xs={12} md={12} em={4} lg={3}>
              <Box className='tabboxWp'>
                <Box className='tableWp'>
                  <Box className='leftTextBox'>
                    <CakeOutlined />
                  </Box>
                  <Box className='rightContentBox'>
                    <Typography variant='p4regular' color='textColor1Paragraph'>
                      Date of Birth
                    </Typography>
                    <Typography variant='h4medium'>
                      {format(new Date(content.birth_date), "MMM dd, yyyy")}
                    </Typography>
                  </Box>
                </Box>
                <Box className='tableWp'>
                  <Box className='leftTextBox'>
                    <PublicOutlined />
                  </Box>
                  <Box className='rightContentBox'>
                    <Typography variant='p4regular' color='textColor1Paragraph'>
                      Country
                    </Typography>
                    <Typography variant='h4medium'>{content.country}</Typography>
                  </Box>
                </Box>
                <Box className='tableWp'>
                  <Box className='leftTextBox'>
                    <DescriptionOutlined />
                  </Box>
                  <Box className='rightContentBox'>
                    <Typography variant='p4regular' color='textColor1Paragraph'>
                      Contract until
                    </Typography>
                    <Typography variant='h4medium'>
                      {format(new Date(content.left_date), "MMM dd, yyyy")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={12} em={8} lg={9}>
              <Box className='rightDecWp'>
                <Typography variant='p3regular'>{content.bio}</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* <Box className='bootLink'>
          <Typography variant='p3regular'>
            Read More
          </Typography>
          <KeyboardArrowDownIcon />
        </Box> */}
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
