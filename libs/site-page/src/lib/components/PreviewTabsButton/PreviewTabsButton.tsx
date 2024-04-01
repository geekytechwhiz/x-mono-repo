import { PhoneIphone, TabletMac, Tv } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useStyles } from "./PreviewTabsButton.styles";

const PreviewTabsButton = ({ handleChange, value, previewStatus, iconDisabled }) => {
  const classes = useStyles();
  return (
    <Box className={classes.previewTabsButtons}>
      <TabContext value={value}>
        <TabList
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          // className={classes.tabsbtns}
          onChange={handleChange}>
          <Tab icon={<Tv />} value='window' disabled={!previewStatus || iconDisabled} />
          <Tab icon={<TabletMac />} value='tablet' disabled={!previewStatus || iconDisabled} />
          <Tab icon={<PhoneIphone />} value='mobile' disabled={!previewStatus || iconDisabled} />
        </TabList>
      </TabContext>
    </Box>
  );
};

export default PreviewTabsButton;
