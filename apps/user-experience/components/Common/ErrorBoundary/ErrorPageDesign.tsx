import React, { memo } from "react";
import Image from "next/image";
import getConfig from "next/config";
import { Box, Button, Typography } from "@mui/material";

const ErrorPageDesign = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const backToHome = () => {
    window.location.href = `${publicRuntimeConfig?.NEXT_PUBLISH_APP_URL}`;
  };
  const img = `${publicRuntimeConfig.NEXT_GCP_URL}/${publicRuntimeConfig.NEXT_BUCKET_NAME}/machine_assets/1704891668802/public/png/404-error.png`;
  return (
    <div>
      <Box
        className='error boundary'
        sx={{
          height: "100vh",
        }}>
        <Typography
          sx={{
            textAlign: "center",
            marginTop: { xs: "25px", md: "0px" },
          }}>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "auto" }}
            src={img}
            alt='errorBoundary'
            className='errorBoundary'
          />
        </Typography>
        <Typography
          variant='h1bold'
          sx={{
            fontSize: "48px !important",
            textAlign: "center",
            marginBottom: "20px",
            lineHeight: "60px !important",
          }}
          color='textColor1'
          id='Heading'>
          Oops, Page not found
        </Typography>
        <Typography
          variant='p1regular'
          sx={{
            textAlign: "center",
          }}
          color='textColor1'
          id='Heading'>
          The page you requested isn&apos;t available right now, please try again later.
        </Typography>
        <Box sx={{ textAlign: "center", marginBottom: { xs: "25px", md: "45px" } }}>
          <Button variant='blackbutton' onClick={backToHome}>
            Back To Home
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default memo(ErrorPageDesign);
