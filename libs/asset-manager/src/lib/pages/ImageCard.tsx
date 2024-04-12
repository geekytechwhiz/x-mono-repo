import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Imageasset, video, Morevarwhite, CommonPlateformXDialog } from "@platformx/utilities";
import AssetCardMenu from "../components/CardMenu";
import { useImagesStyle } from "./Images.style";
import { useTranslation } from "react-i18next";

const ImageCard = ({ data, deleteAsset }) => {
  const classes = useImagesStyle();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    setIsDelete(true);
  };

  const deleteCloseButtonHandle = () => {
    setIsDelete(false);
  };
  const deleteConfirmButtonHandle = () => {
    deleteAsset(data.uuid);
    setIsDelete(false);
  };
  const icon = {
    Image: Imageasset,
    Video: video,
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  return (
    <Grid container item md={12} xs={12} sm={12} lg={3} className={classes.floatleft}>
      <Box className={classes.folderaddstep}>
        <Box className={classes.folderlistingstep}>
          <img className={classes.mockimg} src={data.thumbnail.content_url} alt={data.name} />
        </Box>
        <Box className={classes.wrapperimage}>
          <Box className={classes.innerimagetext}>
            <img src={icon[data?.entityType || "Image"]} alt='icon' />
            <Typography variant='h7medium' className={classes.marginleftImageCard}>
              {data.entityType}
            </Typography>
          </Box>

          <Box className={classes.adjusttext}>
            <Typography className={classes.cardName} variant='h6medium'>
              {data.name}
            </Typography>
            <Typography variant='h7medium'>{data.lastModified}</Typography>
          </Box>
        </Box>
        <Box className={classes.boxasset}>
          {/* <Button className={classes.draftbtn}>Draft</Button> */}

          <Box onClick={handleClick} className={classes.boxassetstep1}>
            <IconButton
              aria-label='settings'
              id='long-button'
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup='true'
              onClick={handleClick}>
              <img src={Morevarwhite} alt='' />
            </IconButton>
          </Box>
          <AssetCardMenu
            open={open}
            anchorEl={anchorEl}
            handleMenuClose={() => {
              setAnchorEl(null);
            }}
            handleDelete={handleDelete}
          />
        </Box>
      </Box>
      {isDelete && (
        <CommonPlateformXDialog
          isDialogOpen={isDelete}
          title={t("delete_title")}
          subTitle={t("delete_confirm")}
          closeButtonText={t("no_keep_it")}
          closeButtonHandle={deleteCloseButtonHandle}
          confirmButtonText={t("yes_delete_it")}
          confirmButtonHandle={deleteConfirmButtonHandle}
          modalType='delete'
        />
      )}
    </Grid>
  );
};
export default ImageCard;
