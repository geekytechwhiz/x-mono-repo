/* eslint-disable no-debugger */
import { Box, IconButton } from "@mui/material";
import { usePage } from "@platformx/authoring-apis";
import { MoreHorizIcon } from "@platformx/utilities";
import React, { memo, useState } from "react";
import { QuizPollEventMenu } from "../QuizPollEventsMenu/QuizPollEventsMenu";
import PageMenu from "../PageMenu/PageMenu";

const ContentTypeMenuList = ({
  item,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  // editPage,
  // viewPage,
  // previewPage,
  // handleDuplicatePopup,
  // duplicatePage,
  // unPublishPage,
  // handleReschedulePopup,
  // reschedulePublishPage,
  // rescheduleUnPublishPage,
  // handleCancelTriggerPopup,
  // cancelPublishUnpublishTrigger,
  // handleDeleteData,
  // handlePageDelete,
  fetchContentDetails,
}) => {
  // const selectedItem = getSelectedObject(item); // TODO: need to check
  const {
    editPage,
    cancelPublishUnpublishTrigger,
    duplicatePage,
    handleCancelTriggerPopup,
    handleDeleteData,
    handleDuplicatePopup,
    handlePageDelete,
    handleReschedulePopup,
    previewPage,
    reschedulePublishPage,
    rescheduleUnPublishPage,
    unPublishPage,
    viewPage,
  } = usePage("ALL");
  const selectedItem = item;
  const contentType = selectedItem.contentType || selectedItem.tagName;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          margin: "0px",
        }}
        onClick={handleClickListItem}>
        <IconButton>
          <img
            alt='moreHorizIcon'
            src={MoreHorizIcon}
            style={{
              objectFit: "cover",
              // transform: 'rotate(90deg)',
              padding: "4px 0px",
            }}
          />
        </IconButton>
      </Box>
      {(contentType === "quiz" ||
        contentType === "poll" ||
        contentType === "event" ||
        contentType === "article" ||
        contentType === "vod") && (
        <QuizPollEventMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={() => {
            setAnchorEl(null);
          }}
          contentType={contentType}
          listItemDetails={selectedItem}
          category='content'
          subCategory={contentType}
          deleteContent={deleteContent}
          duplicate={duplicate}
          preview={preview}
          unPublish={unPublish}
          view={view}
          edit={edit}
          fetchContentDetails={fetchContentDetails}
          sitelist={[]}
          duplicateToSite={undefined}
        />
      )}
      {contentType === "sitepage" && (
        <PageMenu
          listItemDetails={selectedItem}
          open={open}
          anchorEl={anchorEl}
          handleMenuClose={() => {
            setAnchorEl(null);
          }}
          category='Page'
          subCategory=''
          editPage={editPage}
          viewPage={viewPage}
          previewPage={previewPage}
          handleDuplicatePopup={handleDuplicatePopup}
          duplicatePage={duplicatePage}
          unPublishPage={unPublishPage}
          handleReschedulePopup={handleReschedulePopup}
          reschedulePublishPage={reschedulePublishPage}
          rescheduleUnPublishPage={rescheduleUnPublishPage}
          handleCancelTriggerPopup={handleCancelTriggerPopup}
          cancelPublishUnpublishTrigger={cancelPublishUnpublishTrigger}
          handleDeleteData={handleDeleteData}
          handlePageDelete={handlePageDelete}
        />
      )}
    </Box>
  );
};

export default memo(ContentTypeMenuList);
