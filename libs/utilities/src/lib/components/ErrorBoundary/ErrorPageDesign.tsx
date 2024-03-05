import React from "react";
import Image from "next/image";
import getConfig from "next/config";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const ErrorPageDesign = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const backToHome = () => {
    window.location.href = `${publicRuntimeConfig?.NEXT_PUBLISH_APP_URL}`;
  };
  return (
    <div>
      <Box
        sx={{
          height: "100%",
        }}>
        {" "}
        <Typography
          sx={{
            textAlign: "center",
            marginTop: { xs: "25px", md: "45px" },
          }}>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "auto" }}
            src={
              "https://storage.googleapis.com/cropped_image_public/machine_assets/1704891668802/public/png/404-error.png"
            }
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
          id='Heading'>
          {"Oops, Page not found"}
        </Typography>
        <Typography
          variant='p1regular'
          sx={{
            textAlign: "center",
            padding: "0px 0 20px 0",
          }}
          id='Heading'>
          {`The page you requested isn't available right now, please try again later.`}
        </Typography>
        <Box sx={{ textAlign: "center", marginBottom: { xs: "25px", md: "45px" } }}>
          <Button variant='blackbutton' onClick={backToHome}>
            {`Back To Home`}
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default React.memo(ErrorPageDesign);
