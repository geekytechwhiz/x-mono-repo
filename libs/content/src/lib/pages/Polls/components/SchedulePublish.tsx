import { Box, Checkbox, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
// import DatePicker from "../Common/DatePicker";
import { DatePicker, TitleSubTitle } from "@platformx/utilities";
// import TitleSubTitle from '../Common/TitleSubTitle';
// import { TitleSubTitle } from "@platformx/utilities";

const SchedulePublish = ({ state, setState }) => {
  const { t } = useTranslation();
  // const [publishTime, setPublishTime] = useState<any>(null);
  // const [unpublishTime, setunpublishTime] = useState<any>(null);
  // const [schedulePagePublish, setSchedulePagePublish] = useState<boolean | null>();
  const handlePublishValChange = (newValue) => {
    // setPublishTime(newValue);
    setState({ ...state, schedule_publish_datetime: newValue?.toISOString() });
    // handleSchedulePublish(
    //   check,
    //   newValue?.toISOString(),
    //   schedulePageUnpublish,
    //   unpublishTime?.toISOString()
    // );
  };
  const handleUnpublishValChange = (newValue) => {
    // setunpublishTime(newValue);
    // handleSchedulePublish(
    //   schedulePagePublish,
    //   publishTime?.toISOString(),
    //   check,
    //   newValue?.toISOString()
    // );
    setState({
      ...state,
      schedule_unpublish_datetime: newValue?.toISOString(),
    });
  };
  const handlePublishChange = (event) => {
    // setSchedulePagePublish(event.target.checked);
    if (event.target.checked === false) {
      setState({
        ...state,
        is_schedule_publish: event.target.checked,
        schedule_publish_datetime: null,
      });
    } else {
      setState({ ...state, is_schedule_publish: event.target.checked });
    }
    //else {
    //   handleSchedulePublish(
    //     event.target.checked,
    //     publishTime?.toISOString(),
    //     schedulePageUnpublish,
    //     unpublishTime?.toISOString()
    //   );
    // }
  };
  const handleUnpublishChange = (event) => {
    // setSchedulePageUnpublish(event.target.checked);
    if (event.target.checked === false) {
      setState({
        ...state,
        is_schedule_unpublish: event.target.checked,
        schedule_unpublish_datetime: null,
      });
    } else {
      setState({ ...state, is_schedule_unpublish: event.target.checked });
    }
    //else {
    //   handleSchedulePublish(
    //     schedulePagePublish,
    //     publishTime?.toISOString(),
    //     event.target.checked,
    //     unpublishTime?.toISOString()
    //   );
    // }
  };
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      id='schedulePublish'
      sx={{
        backgroundColor: "#ffffff",
        marginBottom: "12px",
        padding: {
          xs: "15px 14px 13px 14px",
          sm: "40px 89px 40px 40px",
          md: "40px 89px 40px 40px",
        },
      }}>
      <Box>
        <TitleSubTitle
          title={t("quiz_schedule_header")}
          subTitle={t("quiz_schedule_subheader")}
          titleVariant='h3medium'
          subTitleVariant='h7regular'
        />
      </Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          lg={5}
          sx={{
            paddingRight: {
              xs: "10px",
              sm: "10px",
              md: "55px",
            },
            display: "flex",
            flexDirection: "column",
            marginTop: { sm: "40px", xs: "30px" },
          }}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Checkbox
              checked={state?.is_schedule_publish}
              sx={{ pt: 0, pl: 0 }}
              onChange={handlePublishChange}
            />
            <TitleSubTitle
              title={t("schedule_publish")}
              subTitle={t("poll_publish_subtitle")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7} sx={{ marginTop: { sm: "40px", xs: "14px" } }}>
          <DatePicker
            time={state?.schedule_publish_datetime}
            handleValChange={handlePublishValChange}
            handleDateChangeRaw={handleDateChangeRaw}
            isDisabled={!state?.is_schedule_publish}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          lg={5}
          sx={{
            paddingRight: {
              xs: "10px",
              sm: "10px",
              md: "55px",
            },
            display: "flex",
            flexDirection: "column",
            marginTop: { sm: "40px", xs: "30px" },
          }}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Checkbox
              checked={state?.is_schedule_unpublish}
              sx={{ pt: 0, pl: 0 }}
              onChange={handleUnpublishChange}
            />
            <TitleSubTitle
              title={t("page_schedule_unpublish")}
              subTitle={t("poll_unpublish_subtitle")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7} sx={{ marginTop: { sm: "40px", xs: "14px" } }}>
          <DatePicker
            time={state?.schedule_unpublish_datetime}
            handleValChange={handleUnpublishValChange}
            handleDateChangeRaw={handleDateChangeRaw}
            isDisabled={!state?.is_schedule_unpublish}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default SchedulePublish;
