import React from "react";
import { Box, Typography } from "@mui/material";
import { useStyles } from "./Toast.style";

interface Props {
  color: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function Toast({
  color = "",
  title = "title",
  description = "description",
  children,
}: Props) {
  const classes = useStyles();

  return (
    <Box className={classes.toaster}>
      <Box>{children}</Box>
      <Box className='title_description'>
        <Typography variant='h5bold' className='title' sx={{ color: color }}>
          {title}
        </Typography>
        <Typography variant='h5regular' className='description'>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
