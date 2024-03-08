import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TaskCard from "../../../../../dashboard/src/lib/components/tasks/taskContent/TaskCard";
import { Sitedashboardicon } from "@platformx/utilities";
import { useStyles } from "../../../../../dashboard/src/lib/dashboards.styles";
import PlateformXCreatestep1Dialog from "./CreatesiteStep1";

export const Firstinteraction = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [folderValue, setFolderValue] = useState(false);

  const handleFilterClose = () => {
    // setAnchor(null);
  };

  return (
    <Box>
      <Box>
        <Typography>{t("typo_dashboard")}</Typography>
      </Box>
      <Box className={classes.sectionMargin}>
        <Grid container>
          <Grid item xs={12} md={12} em={12} lg={12} sx={{ paddingRight: { xs: 0, lg: 0 } }}>
            <Box>
              <TaskCard title='Lets complete your site' titleVariant='h5bold'>
                <Box className={classes.dashtypo}>
                  <img src={Sitedashboardicon} alt='icon' />
                </Box>
                <Box className={classes.dashtypo}>
                  <Typography variant='h5bold'>
                    Together, create your first amazing website
                  </Typography>
                </Box>
                <Box className={classes.dashtypo}>
                  <Button
                    onClick={() => {
                      setFolderValue(true);
                      handleFilterClose();
                    }}
                    variant='contained'>
                    Create Now
                  </Button>
                  <PlateformXCreatestep1Dialog
                    isDialogOpen={folderValue}
                    closeButtonHandle={() => setFolderValue(false)}
                  />
                </Box>
              </TaskCard>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
