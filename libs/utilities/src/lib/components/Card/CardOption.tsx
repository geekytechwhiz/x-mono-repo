import { Box, IconButton, MenuItem } from "@mui/material";
import DeleteIcon from "../../assets/svg//deleteIcon.svg";
import EditIcon from "../../assets/svg//editIcon.svg";
import { ErrorTooltip } from "../ErrorTooltip/ErrorTooltip";
import { useTranslation } from "react-i18next";
import { SYSTEM_TAGS } from "./constants";
import { CATEGORY_CONTENT, CATEGORY_PAGE, SITE_SETTING } from "../../constants/CommonConstants";

const CardOption = (props: any) => {
  const { t } = useTranslation();

  const {
    dataList = {},
    tagName = "",
    handleEdit = () => {},
    canAccessAction,
    handleDeleteButton = () => {},
  } = props;

  const hasAccess = (action) => {
    switch (tagName) {
      case "tagscategories":
        return dataList.type === SYSTEM_TAGS ? false : canAccessAction(SITE_SETTING, "tag", action);
      case "courses":
        return false;
      case "sitepage":
        return canAccessAction(CATEGORY_PAGE, "", action);
      default:
        // for "article", "quiz", "poll", "event", "vod"
        return canAccessAction(CATEGORY_CONTENT, tagName, action);
    }
  };

  return (
    <Box
      color='#89909A'
      className='d-inline-flex align-items-center justify-content-end'
      sx={{ minWidth: "104px" }}>
      <Box className='d-flex align-items-center'>
        {(dataList?.scheduledPublishTriggerDateTime === null ||
          dataList?.scheduledPublishTriggerDateTime === undefined) &&
        (dataList?.scheduledUnPublishTriggerDateTime === null ||
          dataList?.scheduledUnPublishTriggerDateTime === undefined) ? (
          <ErrorTooltip
            component={
              <MenuItem
                className='icons'
                disableRipple
                onClick={handleEdit}
                disabled={!hasAccess("Update")}>
                <IconButton className='hoverIcon'>
                  <img src={EditIcon} alt='edit' />
                </IconButton>
              </MenuItem>
            }
            tooltipMsg={dataList.type === SYSTEM_TAGS ? t("cannot_edit_tag") : ""}
            doAccess={!hasAccess("Update")}
          />
        ) : null}
      </Box>
      <Box className='d-flex align-items-center'>
        <ErrorTooltip
          component={
            <MenuItem
              className='icons'
              disableRipple
              onClick={handleDeleteButton}
              disabled={!hasAccess("Delete")}>
              <IconButton className='hoverIcon'>
                <img src={DeleteIcon} alt='delete' />
              </IconButton>
            </MenuItem>
          }
          tooltipMsg={dataList.type === SYSTEM_TAGS ? t("cannot_delete_tag") : ""}
          doAccess={!hasAccess("Delete")}
        />
      </Box>
    </Box>
  );
};

export default CardOption;
