import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backAssetIcon } from "@platformx/utilities";
import { useImagesStyle } from "./Images.style";
import PlateformXFolderDialog from "./ChooseFolderModal";
import AssetBreadsum from "./AssetBreadscum";

export function ModalHeader({ navigateTo, isBreadcrumb }) {
  const classes = useImagesStyle();
  const navigate = useNavigate();

  const [assetValue, setAssetValue] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handlebtnClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={12} md={9} lg={9}>
        {isBreadcrumb ? (
          <Box className={classes.backicon} onClick={() => navigate(navigateTo)}>
            <img src={backAssetIcon} alt='' />
            <Box>
              <AssetBreadsum />
            </Box>
          </Box>
        ) : (
          <Typography variant='h4semibold' className={classes.typoimgtext}>
            {t("images")}
          </Typography>
        )}
      </Grid>
      <Box className={classes.topheadermodal}>
        <Button sx={{ minWidth: "100%" }} onClick={handlebtnClick} variant='primaryButton'>
          {t("Choose this folder")}
        </Button>

        <PlateformXFolderDialog
          isDialogOpen={assetValue}
          closeButtonHandle={() => setAssetValue(false)}
        />
      </Box>
    </Grid>
  );
}
