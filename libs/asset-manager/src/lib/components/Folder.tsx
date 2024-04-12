import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MorehorAsset, AssetfoldernewIcon, CommonPlateformXDialog } from "@platformx/utilities";
import AssetCardMenu from "./CardMenu";
import { useImagesStyle } from "../pages/Images.style";
import { useTranslation } from "react-i18next";

export default function Folder({ data, deleteFolder }: any) {
  const classes = useImagesStyle();
  const [searchParams, setSearchParams] = useSearchParams({});
  const path = searchParams.get("path");
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDelete, setIsDelete] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    setIsDelete(true);
  };

  const deleteCloseButtonHandle = () => {
    setIsDelete(false);
  };
  const deleteConfirmButtonHandle = () => {
    deleteFolder(data.uuid);
    setIsDelete(false);
  };

  const handleOpen = () => {
    const pathArray = path ? path.split("|") : [];

    setSearchParams({
      uuid1: data.uuid,
      path: [...pathArray, data.name].join("|"),
    });
  };

  return (
    <Grid container item xs={12} sm={6} md={6} em={4} lg={3} className={classes.floatleft}>
      <Box className={classes.folderadd}>
        <Box className={classes.folderlisting} onClick={handleOpen}>
          <Box className={classes.sitesearchform}>
            <img className={classes.foldericon} src={AssetfoldernewIcon} alt='folder' />
          </Box>
          <Box className={classes.typeoexisttest}>
            <Typography variant='h6semibold' className={classes.marginTop}>
              {data.name}
            </Typography>
            {/* <Typography variant='h7medium' className={classes.marginTop}>
              feb, 9 2023 | 17:08
            </Typography> */}
          </Box>
        </Box>
        <Box className={classes.boxassetstep}>
          <IconButton
            aria-label='settings'
            id='long-button'
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup='true'
            onClick={handleClick}>
            <img src={MorehorAsset} alt='icon' />
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
}
