import React from "react";
import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";

const LoaderComponent = () => {
  return (
    <Grid container spacing={3} sx={{ marginTop: "5px" }}>
      {[1, 2, 3, 4].map((index) => (
        <Grid key={index} item xs={6} sm={6} md={3} sx={{ padding: "10px" }}>
          <Box className='skeleton skeleton-card' sx={{ height: { xs: "200px", sm: "250px" } }}>
            <Skeleton
              variant='rectangular'
              width='100%'
              height='100%'
              style={{ borderRadius: "8px" }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoaderComponent;
