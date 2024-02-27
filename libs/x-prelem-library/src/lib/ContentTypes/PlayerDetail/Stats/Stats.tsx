import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import prelemTypes from "../../../globalStyle";
import { useCustomStyle } from "./Stats.style";
import { RoyalIcon, OGCIcon, AZIcon } from "@platformx/utilities";
import "../../../Style.css";

const Stats = ({ authoringHelper }: any) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.StatsWrapper} ${globalClasses.prelemType1} prelem prelemType1 about-us2 StatsBg`}>
      <Box>
        <Box className='TopWarp'>
          <Typography variant='h6bold' align='center'>
            Statistics Champions League 2023/2024
          </Typography>
          <Box mt={2}>
            <Box className='contentBoxRow'>
              <Container className='grid_container'>
                <Grid container>
                  <Grid xs={6} md={6}>
                    <Box className='textBox'>
                      <Typography variant='p3bold'>5</Typography>
                      <Typography variant='p4regular'>Matches played</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} md={6}>
                    <Box className='textBox'>
                      <Typography variant='p3bold'>4</Typography>
                      <Typography variant='p4regular'>Shots</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box className='contentBoxRow'>
              <Container className='grid_container'>
                <Grid container>
                  <Grid xs={6} md={6}>
                    <Box className='textBox'>
                      <Typography variant='p3bold'>5</Typography>
                      <Typography variant='p4regular'>In starting lineup</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} md={6}>
                    <Box className='textBox'>
                      <Typography variant='p3bold'>3</Typography>
                      <Typography variant='p4regular'>Shots on target</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box className='contentBoxRow'>
              <Container className='grid_container'>
                <Grid container>
                  <Grid xs={6} md={6}>
                    <Box className='textBox'>
                      <Typography variant='p3bold'>0</Typography>
                      <Typography variant='p4regular'>Substituted (in)</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} md={6}>
                    <Box className='textBox'>
                      <Typography variant='p3bold'>1</Typography>
                      <Typography variant='p4regular'>Goals</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
        <Box className='secondWrapper'>
          <Container className='grid_container'>
            <Box className='Contentbox'>
              <Typography variant='h2bold'>Previous clubs</Typography>
              <Grid container mt={2}>
                <Grid xs={12} md={4}>
                  <Box className='contentBox'>
                    <Box className='ImgBox'>
                      <img src={AZIcon} alt='' />
                    </Box>
                    <Typography variant='h3bold'>AZ</Typography>
                    <Typography variant='h6bold'>2015-2021</Typography>
                  </Box>
                </Grid>
                <Grid xs={12} md={4}>
                  <Box className='contentBox'>
                    <Box className='ImgBox'>
                      <img src={OGCIcon} alt='' />
                    </Box>
                    <Typography variant='h3bold'>OGC Nice</Typography>
                    <Typography variant='h6bold'>2021-2023</Typography>
                  </Box>
                </Grid>
                <Grid xs={12} md={4}>
                  <Box className='contentBox'>
                    <Box className='ImgBox'>
                      <img src={RoyalIcon} alt='' />
                    </Box>
                    <Typography variant='h3bold'>Royal Antwerp FC</Typography>
                    <Typography variant='h6bold'>2022-2023</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box className='PreviousSeasons'>
          <Typography variant='h2bold' align='center'>
            Previous seasons
          </Typography>
          <Box className='BottomTableWp'>
            <Box className='TopBoxRow'>
              <Container className='grid_container'>
                <Grid container alignItems='center'>
                  <Grid xs={4} md={4}>
                    <Typography variant='p3bold'>Club</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3bold'>Season</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3bold'>Games</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3bold'>Goals</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3bold'>Competition</Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box className='BoxRow'>
              <Container className='grid_container'>
                <Grid container alignItems='center'>
                  <Grid xs={4} md={4}>
                    <Box className='firstColBox'>
                      <Box className='imgBoxWp'>
                        <img src={RoyalIcon} alt='' />
                      </Box>
                      <Typography variant='p3bold'>Royal Antwerp FC</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>2022-2023</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>21</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>1</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='h7bold'>Jupiler Pro League</Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box className='BoxRow'>
              <Container className='grid_container'>
                <Grid container alignItems='center'>
                  <Grid xs={4} md={4}>
                    <Box className='firstColBox'>
                      <Box className='imgBoxWp'>
                        <img src={OGCIcon} alt='' />
                      </Box>
                      <Typography variant='p3bold'>Royal Antwerp FC</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>2022-2023</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>21</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>1</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='h7bold'>Jupiler Pro League</Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box className='BoxRow'>
              <Container className='grid_container'>
                <Grid container alignItems='center'>
                  <Grid xs={4} md={4}>
                    <Box className='firstColBox'>
                      <Box className='imgBoxWp'>
                        <img src={OGCIcon} alt='' />
                      </Box>
                      <Typography variant='p3bold'>Royal Antwerp FC</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>2022-2023</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>21</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>1</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='h7bold'>Jupiler Pro League</Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box className='BoxRow'>
              <Container className='grid_container'>
                <Grid container alignItems='center'>
                  <Grid xs={4} md={4}>
                    <Box className='firstColBox'>
                      <Box className='imgBoxWp'>
                        <img src={AZIcon} alt='' />
                      </Box>
                      <Typography variant='p3bold'>Royal Antwerp FC</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>2022-2023</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>21</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='p3regular'>1</Typography>
                  </Grid>
                  <Grid xs={2} md={2}>
                    <Typography variant='h7bold'>Jupiler Pro League</Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Stats;
