import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MorehorAsset, FolderIcon } from "@platformx/utilities";
import AssetCardMenu from "./CardMenu";
import { useImagesStyle } from "../pages/Images.style";

export default function Folder({
  data,
}: //deleteFolder
any) {
  const classes = useImagesStyle();
  const [searchParams, setSearchParams] = useSearchParams({});
  const path = searchParams.get("path");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const [isDelete, setIsDelete] = useState(false);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    // setIsDelete(true);
  };

  // const deleteCloseButtonHandle = () => {
  //   setIsDelete(false);
  // };
  // const deleteConfirmButtonHandle = () => {
  //   deleteFolder(data.uuid);
  //   setIsDelete(false);
  // };

  const handleOpen = () => {
    const pathArray = path ? path.split("|") : [];

    // const uuid_ = collections.find((obj) => obj.name === data.name);
    // uuid_
    //   ? setSearchParams({
    //       uuid1: data.uuid,
    //       uuid2: uuid_.uuid,
    //       path: [...pathArray, data.name].join("|"),
    //     })
    //   :
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
            <img className={classes.foldericon} src={FolderIcon} alt='folder' />
          </Box>
          <Box className={classes.typeoexisttest}>
            <Typography variant='h6semibold' className={classes.marginTop}>
              {data.name}
            </Typography>
            <Typography variant='h7medium' className={classes.marginTop}>
              {/* {dateFormat(data.lastModified)} */}
              feb, 9 2023 | 17:08
            </Typography>
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
            <img src={MorehorAsset} alt='' />
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
}
