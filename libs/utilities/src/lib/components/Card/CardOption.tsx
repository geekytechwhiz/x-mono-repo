import { Box, IconButton, MenuItem } from "@mui/material";
import DeleteIcon from "../../assets/svg//deleteIcon.svg";
import EditIcon from "../../assets/svg//editIcon.svg";
import { useState } from "react";
import { ErrorTooltip } from "../ErrorTooltip/ErrorTooltip";
import { useTranslation } from "react-i18next";
import { SYSTEM_TAGS } from "./constants";

const CardOption = (props: any) => {
  const { t } = useTranslation();

  const {
    getContentCategory,
    getContentSubCategory,
    dataList = {},
    tagName = "",
    handleEdit = () => {},
    canAccessAction,
    handleDeleteButton = () => {},
  } = props;

  const getTagAction = (action) => {
    if (dataList.type === SYSTEM_TAGS) {
      return true;
    } else {
      return !canAccessAction("SiteSetting", "tag", action);
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
                disabled={
                  tagName === "tagscategories"
                    ? getTagAction("Update")
                    : !canAccessAction(getContentCategory(), getContentSubCategory(), "Update") ||
                      tagName === "courses"
                }>
                <IconButton className='hoverIcon'>
                  {/* <img src={EditIcon} alt="" style={{ objectFit: 'cover' }} /> */}
                  <img src={EditIcon} alt='' />
                </IconButton>
              </MenuItem>
            }
            tooltipMsg={dataList.type === SYSTEM_TAGS ? t("cannot_edit_tag") : ""}
            doAccess={
              tagName === "tagscategories"
                ? getTagAction("Update")
                : !canAccessAction(getContentCategory(), getContentSubCategory(), "Update") ||
                  tagName === "courses"
            }
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
              disabled={
                tagName === "tagscategories"
                  ? getTagAction("Delete")
                  : !canAccessAction(getContentCategory(), getContentSubCategory(), "Delete") ||
                    tagName === "courses"
              }>
              <IconButton className='hoverIcon'>
                <img src={DeleteIcon} alt='' />
              </IconButton>
            </MenuItem>
          }
          tooltipMsg={dataList.type === SYSTEM_TAGS ? t("cannot_delete_tag") : ""}
          doAccess={
            tagName === "tagscategories"
              ? getTagAction("Delete")
              : !canAccessAction(getContentCategory(), getContentSubCategory(), "Delete") ||
                tagName === "courses"
          }
        />
      </Box>
    </Box>
  );
};

export default CardOption;
