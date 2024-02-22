import { Box } from "@mui/material";
import { BasicSwitchText, CommonBoxWithNumber } from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCustomStyle } from "../../CreateEvent.styles";
import { AnalyticsProp } from "../../CreateEvent.types";

const EventAnalytics = ({
  state,
  setState,
  eventAnalyticsHandle,
  unsavedChanges,
}: AnalyticsProp) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const [state1, setState1] = useState({
    analytics_enable: true,
    eventContentInsight: false,
  });

  const handleChange = (event, keyName = "") => {
    const newObj = {
      ...state1,
      [keyName]: event.target.checked,
    };
    setState1(newObj);
    setState({ ...state, [keyName]: event.target.checked });
    eventAnalyticsHandle({ analyticsInput: newObj });

    unsavedChanges.current = true;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setState1({
        analytics_enable: state?.analytics_enable,
        eventContentInsight: false,
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [state]);
  return (
    <Box id='Analytics' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='07'
        title={t("analytics")}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t("subhead")}>
        <Box className='textFiled'>
          <BasicSwitchText
            isDisable={false}
            state={state1.analytics_enable}
            handleChange={handleChange}
            title={`${t("event")} ${t("analytics")}`}
            subtitle={t("event_analytics_subhead")}
            keyName='analytics_enable'
          />
        </Box>
        <Box className='textFiledLast'>
          <BasicSwitchText
            subtitle=''
            isDisable
            keyName='eventContentInsight'
            handleChange={handleChange}
            title={t("content_insight")}
            state={state1.eventContentInsight}
          />
        </Box>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default React.memo(EventAnalytics);
