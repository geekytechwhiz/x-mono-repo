import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Sitedashboardicon } from "@platformx/utilities";
// import ThemeConstants from '../../../theme/variable';
import { useEmptyResultStyle } from "./EmptyResult.style";
import { AddNewButton } from "./SiteListing.style";
import PlateformXCreatestep1Dialog from "./CreatesiteStep1";
import { useState } from "react";
import PlateformXCreatestep2Dialog from "./CreateStep2";
import PlateformXCreatestep3Dialog from "./CreateStep3";
import PlateformXCreatestep4Dialog from "./CreateStep4";
import PlateformXCreatestep5Dialog from "./CreateStep5";

const EmptyResult = () => {
  const { t } = useTranslation();
  const classes = useEmptyResultStyle();
  const [folderValue, setFolderValue] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });
  const handleFilterClose = () => {
    // setAnchor(null);
  };
  const handlechange = (prop) => {
    setFolderValue({ ...folderValue, ...prop });
  };
  const handleback = (prop) => {
    setFolderValue({ ...folderValue, ...prop });
  };
  const handleclose = () => {
    setFolderValue({ step1: false, step2: false, step3: false, step4: false, step5: false });
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
            handlechange({ step1: true });
            handleFilterClose();
          }}>
          <Box component='span'>{t("create_new")}</Box>
        </AddNewButton>
        <PlateformXCreatestep1Dialog
          isDialogOpen={folderValue.step1}
          handlenextbutton={handlechange}
          closeButtonHandle={handleclose}
        />
        <PlateformXCreatestep2Dialog
          isDialogOpen={folderValue.step2}
          handlenextbutton={handlechange}
          handlebackbutton={handleback}
          closeButtonHandle={handleclose}
        />

        <PlateformXCreatestep3Dialog
          isDialogOpen={folderValue.step3}
          handlenextbutton={handlechange}
          closeButtonHandle={handleclose}
          handlebackbutton={handleback}
        />

        <PlateformXCreatestep4Dialog
          isDialogOpen={folderValue.step4}
          handlenextbutton={handlechange}
          closeButtonHandle={handleclose}
          handlebackbutton={handleback}
        />

        <PlateformXCreatestep5Dialog
          isDialogOpen={folderValue.step5}
          handlenextbutton={handlechange}
          closeButtonHandle={handleclose}
          props={undefined}
          handlebackbutton={handleback}
        />
      </Box>
    </Box>
  );
};

export default EmptyResult;
