/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Imageasset, video } from "@platformx/utilities";
import Morevarwhite from "../../assets/images/moreverwhite.png";
// import { dateFormat } from "../../utils/helperFunctions";
// import AssetCardMenu from "./AssetCardMenu/CardMenu";
import { useImagesStyle } from "./Images.style";
import { useTranslation } from "react-i18next";

const ImageCard = ({ data, deleteAsset }) => {
  const classes = useImagesStyle();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [filterMenu, setFilterMenu] = useState<null | HTMLElement>(null);
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
    setFilterMenu(event.currentTarget);
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

          {/* <Box onClick={handleClick} className={classes.boxassetstep1}>
            <IconButton
              aria-label='settings'
              id='long-button'
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup='true'
              onClick={handleClick}>
              <img src={Morevarwhite} alt='' />
            </IconButton>
          </Box> */}
          {/* <AssetCardMenu
            open={open}
            anchorEl={anchorEl}
            handleMenuClose={() => {
              setAnchorEl(null);
            }}
            handleDelete={handleDelete}
          /> */}
        </Box>
      </Box>
      {/* {isDelete && (
        <PlateformXDialogDelete
          isDialogOpen={isDelete}
          title={t("delete_title")}
          subTitle={`${t("delete_confirm")}`}
          closeButtonText={t("no_keep_it")}
          confirmButtonText={t("yes_delete_it")}
          closeButtonHandle={deleteCloseButtonHandle}
          confirmButtonHandle={deleteConfirmButtonHandle}
        />
      )} */}
    </Grid>
  );
};
export default ImageCard;
