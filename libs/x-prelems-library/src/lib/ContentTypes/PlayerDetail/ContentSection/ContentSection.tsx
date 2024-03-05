import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Container } from "@mui/system";
import prelemTypes from "../../../globalStyle";
import { useCustomStyle } from "./ContentSection.style";
import Profile from "../Profile/Profile";
import Stats from "../Stats/Stats";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ContentSection({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <Box
      className={`${classes.ContentSectionWrapper} ${globalClasses.prelemType1} prelem prelemType1 ContentSectionBg`}>
      <Container className='grid_container' style={{ padding: 0 }}>
        <Box sx={{}}>
          <Tabs
            value={value}
            onChange={handleChange}
            className='tabsWp'
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}>
            <Tab label='Profile' {...a11yProps(0)} />
            <Tab label='Stats' {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Container>
      <CustomTabPanel value={value} index={0}>
        <Profile
          content={content}
          analytics={analytics}
          authoringHelper={authoringHelper}
          secondaryArgs={secondaryArgs}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stats
          content={content}
          analytics={analytics}
          authoringHelper={authoringHelper}
          secondaryArgs={secondaryArgs}
        />
      </CustomTabPanel>
    </Box>
  );
}
