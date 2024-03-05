import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Dialog, DialogContent, Grid, IconButton, Typography } from "@mui/material";
import { CloseSearchSvg, Loader, formCroppedUrl, nullToObject } from "@platformx/utilities";
import React, { useEffect, useState } from "react";
// import DialogCloseIcon from "../../assets/svg/DialogCloseIcon.svg";
import { ratios } from "../Utils/Constants";

const ShowCaseCrops = (props: any = {}) => {
  const { open, Images = [], backTo, handleEdit, extension } = nullToObject(props);
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
      <DialogContent sx={{ padding: "5px" }}>
        <Box className='casecropsbox'>
          {loading && <Loader />}
          <Grid container sx={{ padding: { xs: "45px 0px 0 0", md: "0 100px 0 0" } }}>
            {Images.map(({ visibility = "", folder_path = "", aspect_ratio = "" }, key) => {
              return (
                <Box className='boxwp' key={key}>
                  <Box className='imgbox'>
                    <img src={formCroppedUrl(folder_path, extension)} alt='img' />
                    <Typography variant='h6regular' component='h6'>
                      {ratios[aspect_ratio]}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <Button
              className='editIconfixed'
              onClick={() => handleEdit()}
              startIcon={<EditIcon />}></Button>
            <IconButton
              className='closeBtnIcon'
              edge='end'
              color='inherit'
              onClick={() => backTo()}
              aria-label='close'>
              <img src={CloseSearchSvg} alt='' />
            </IconButton>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ShowCaseCrops);
