import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useCustomStyle } from "./BottomLinks.style";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const BottomLinks = () => {
  const classes = useCustomStyle();
  return (
    <div className={`${classes.BottomLinksWrapper} BottomLinksBg`}>
      <Container className='grid_container'>
        <Box className='mainBoxWp'>
          <Box className='colBox'>
            <Box className='arrowIcon leftBut'>
              <KeyboardArrowLeft />
            </Box>
            <Typography variant='h3bold'>RAMIZ ZERROUKI</Typography>
          </Box>
          <Box className='colBox'>
            <Typography variant='h3bold'>QUINTEN TIMBER</Typography>
            <Box className='arrowIcon rightBut'>
              <KeyboardArrowRight />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default BottomLinks;
