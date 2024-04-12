import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { Loader, nullToObject } from "@platformx/utilities";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useImageCrop from "../hooks/useImageCrop";
import { BREAKPOINTS } from "../utils/constants";
import SelectedImageCrop from "./SelectedImageCrop";

const ImageCrop = (props: any = {}) => {
  const {
    open,
    originalImage = {},
    backTo,
    doneCropCompleted,
  } = useMemo(() => nullToObject(props), [props]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const {
    doneLoader,
    isLoading: doneCropLoading,
    handleDone,
    onCropChange,
  } = useImageCrop(originalImage, doneCropCompleted);

  const { Thumbnail } = originalImage || {};
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={backTo}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Grid
        container
        sx={{
          borderBottom: "1px solid #ced3d9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "10px 15px", md: "0px 24px" },
        }}>
        <Grid xs={12} md={8}>
          <Typography variant='h4bold'>{t("crop_your_image")}</Typography>
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            textAlign: { xs: "left", md: "right" },
            padding: { xs: "10px 0", md: "8px" },
          }}>
          <Button variant='secondaryButton' onClick={() => backTo()} sx={{ marginRight: "12px" }}>
            {t("back")}
          </Button>
          <LoadingButton
            onClick={() => handleDone()}
            loading={doneLoader}
            loadingPosition='start'
            variant='primaryButton'
            disabled={doneCropLoading}>
            {t("done")}
          </LoadingButton>
        </Grid>
      </Grid>
      <DialogContent>
        <Box
          className='wholecontainer'
          sx={{
            background: { xs: "#f7f7f7", sm: "#fff" },
            padding: { xs: "11px", sm: "0px" },
          }}>
          {isLoading && <Loader />}

          <Grid container spacing={1}>
            {BREAKPOINTS.map(({ aspectRatio, ratioName, aspectRatioName }, key) => (
              <Grid xs={12} md={6} em={4} sx={{ padding: "8px" }} key={key}>
                <SelectedImageCrop
                  crop={`crop${key + 1}`}
                  aspect={aspectRatio}
                  ratio={`${ratioName}(${aspectRatioName})`}
                  imageSrc={Thumbnail}
                  onCropChange={(data: any) => onCropChange(data, key)}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ImageCrop);
