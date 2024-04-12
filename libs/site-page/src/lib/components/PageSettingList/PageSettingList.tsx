import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PageSettingListData } from "../utils/constants";
import { useStyles } from "./PageSetting.styles";
import PageSetting from "./PageSettingMenu";

const PageSettingList = ({ setPageId }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.pageSettingWp}>
      {PageSettingListData.map((val, key) => {
        const { imgUrl, id } = val;
        return (
          <PageSetting key={key} imgUrl={imgUrl} title={t(id)} setPageId={setPageId} id={id} />
        );
      })}
    </Box>
  );
};

export default PageSettingList;
