import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Sitedashboardicon } from "@platformx/utilities";
// import ThemeConstants from '../../../theme/variable';
import { useEmptyResultStyle } from "./EmptyResult.style";
import { AddNewButton } from "./SiteListing.style";
import PlateformXCreatestep1Dialog from "./CreatesiteStep1";
import { useState } from "react";

const EmptyResult = () => {
  const { t } = useTranslation();
  const classes = useEmptyResultStyle();
  const [folderValue, setFolderValue] = useState(false);
  const handleFilterClose = () => {
    // setAnchor(null);
  };
  return (
    <Box className={classes.emptysite}>
      <img src={Sitedashboardicon} alt='icon' />
      <Box className={classes.nofilter}>
        <Typography variant='h5' className={classes.noresult}>
          {t("there_are_no_files_here")}
        </Typography>
      </Box>

      <Box className={classes.typonew}>
        <Typography variant='h5' className={classes.pagecontent}>
          {t("please_create_your_first_site")}
        </Typography>
      </Box>
      <Box sx={{ marginTop: "8px" }} className={classes.creathide}>
        <AddNewButton
          onClick={() => {
            setFolderValue(true);
            handleFilterClose();
          }}>
          <Box component='span'>{t("create_new")}</Box>
        </AddNewButton>
        <PlateformXCreatestep1Dialog
          isDialogOpen={folderValue}
          closeButtonHandle={() => setFolderValue(false)}
        />
      </Box>
    </Box>
  );
};

export default EmptyResult;
