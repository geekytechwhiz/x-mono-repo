import { Button, FormControl, Grid, Menu, Radio, RadioGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    DeleteIcon,
    FilterIcon,
    backAssetIcon
  } from "@platformx/utilities";
import { FormControlCustom } from "@platformx/content";
import AssetBreadsum from "../pages/AssetBreadscum";
import { PlateformXDialog } from "@platformx/utilities"
import useImagesStyle from "./Images.style";

export function AssetHeader({ handleShow }) {
  const classes = useImagesStyle();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { assetType = "images" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const path = searchParams.get("path");
  const [assetValue, setAssetValue] = useState(false);
  const openFilterMenuForBtn = Boolean(anchor);
  const handleFilterClose = () => {
    setAnchor(null);
  };
  const [filterValue, setFilterValue] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = () => (event.target as HTMLInputElement).value;
    setAnchor(null);
  };

  const handlebtnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchor(event.currentTarget);
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        {path ? (
          <Box
            className={classes.backicon}
            //onClick={() => navigate(`/asset/${assetType}`)}
          >
            <img
              src={backAssetIcon}
              alt='backarrow'
              onClick={() => navigate(`/asset/${assetType}`)}
            />
            <Box>
              <AssetBreadsum />
            </Box>
          </Box>
        ) : (
          <Typography variant='h4semibold' className={classes.marginLeft15}>
            {t(assetType)}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Box className={classes.topheader}>
          <Box className={classes.filternewicon}>
            <img src={FilterIcon} alt='Filter Icon' width='20' height='24' />
          </Box>
          <Box className={classes.deletenewicon}>
            <Box>
              <img src={DeleteIcon} alt='Filter Icon' width='25' height='24' />
            </Box>
          </Box>
          <Button onClick={handlebtnClick} variant='primaryButton'>
            {t("add_new")}
          </Button>
        </Box>
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorEl={anchor}
          open={openFilterMenuForBtn}
          onClose={handleFilterClose}
          sx={{
            ".Platform-x-Menu-paper": {
              borderRadius: "7px",
              marginTop: "5px",
            },
            ".Platform-x-Menu-list": {
              borderRadius: "4px",
              boxShadow: "0 0 2px 0 rgba(115, 114, 114, 0.14)",
              border: "solid 1px rgba(112, 112, 112, 0.1)",
              padding: "10px 18px",
            },
          }}>
          <FormControl>
            <RadioGroup
              value={filterValue}
              onChange={handleChange}
              sx={{ textTransform: "capitalize" }}>
              <FormControlCustom
                className='listView'
                value='New Folder'
                onClick={() => handleShow(true)}
                control={<Radio sx={{ display: "none" }} />}
                label={t("New Folder")}
              />
              <FormControlCustom
                className='listView'
                value='UPload Assets'
                control={<Radio sx={{ display: "none" }} />}
                label={t("Upload Assests")}
                onClick={() => {
                  setAssetValue(true);
                  handleFilterClose();
                }}
              />
            </RadioGroup>
          </FormControl>
        </Menu>
        {/* <PlateformXAssetDialog
          isDialogOpen={assetValue}
          closeButtonHandle={() => setAssetValue(false)}
        /> */}
      </Grid>
    </Grid>
  );
}
