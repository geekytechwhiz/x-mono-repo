import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Dialog, DialogContent, Grid, IconButton, Typography } from "@mui/material";
import { Loader, formCroppedUrlInCrop, nullToObject, DialogCloseIcon } from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { RATIOS } from "../utils/constants";
import "./Gallery.css";

const ShowCaseCrops = (props: any = {}) => {
  const { open, backTo, handleEdit, data } = nullToObject(props);
  const { published_images: cropped_images = [], original_image = {} } = data || {};
  const { ext } = original_image || {};

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <Dialog
      open={open}
      onClose={backTo}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "100%",
          height: "calc(100% - 40px)",
          maxHeight: "calc(100% - 40px)",
          margin: "20px",
        },
      }}>
      <Grid
        container
        sx={{
          borderBottom: "1px solid #ced3d9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "10px 15px", md: "20px 24px" },
        }}>
        <Grid xs={12} md={8}>
          <Typography variant='h4bold'>Preview Images</Typography>
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            textAlign: { xs: "left", md: "right" },
            padding: { xs: "10px 0", md: "8px" },
          }}>
          <IconButton
            className='closeBtnIcon'
            edge='end'
            color='inherit'
            onClick={() => backTo()}
            aria-label='close'>
            <img src={DialogCloseIcon} alt='' />
          </IconButton>
          <Button
            className='editIconfixed'
            onClick={() => handleEdit()}
            startIcon={<EditIcon />}></Button>
        </Grid>
      </Grid>
      <DialogContent sx={{ padding: "5px" }}>
        <Box className='casecropsbox'>
          {loading && <Loader />}
          <Grid container sx={{ paddingRight: "50px" }}>
            {cropped_images.map(({ folder_path = "", aspect_ratio = "" }) => {
              return (
                <Box className='boxwp' key={aspect_ratio}>
                  <Box className='imgbox'>
                    <img alt='cropped-img' src={formCroppedUrlInCrop(folder_path, ext)} />
                    <Typography variant='h6regular' component='h6'>
                      {RATIOS[aspect_ratio]}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ShowCaseCrops);
