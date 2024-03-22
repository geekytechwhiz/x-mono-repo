import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { usePage } from "@platformx/authoring-apis";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CARD_MENUS, MenuActions } from "./utils/constants";
// import Reschedule from '../Reschedule/Reschedule';
import {
  CardOptionApprovalStatusIcon,
  CardOptionDeleteIcon,
  CardOptionDuplicateIcon,
  CardOptionEditIcon,
  CardOptionUnPublishIcon,
  CardOptionViewIcon,
  ErrorTooltip,
  PlateformXDialog,
  capitalizeFirstLetter,
  getCurrentLang,
  useAccess,
} from "@platformx/utilities";
import { WorkflowStepper } from "@platformx/workflow-management";
import { useStyles } from "./PageMenu.styles";
import CreateNewPage from "../../pages/page/CreateNewPage";

const PageMenu = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { anchorEl, open, listItemDetails, handleMenuClose, category, subCategory } = props;
  const { canAccessAction } = useAccess();
  const {
    editPage,
    viewPage,
    previewPage,
    unPublishPage,
    handleReschedulePopup,
    handleCancelTriggerPopup,
    cancelPublishUnpublishTrigger,
    handlePageDelete,
    handleDuplicatePopup,
  } = usePage();
  const [cancelTriggerType, setCancelTriggerType] = useState("");
  const theme = useTheme();
  const tabView = useMediaQuery(theme.breakpoints.down("em"));
  const {
    status,
    scheduledPublishTriggerDateTime,
    scheduledUnPublishTriggerDateTime,
    // lastPublishedDate,
  } = listItemDetails;
  const [menuActions, setMenuActions] = useState({
    duplicate: false,
    delete: false,
    publish: false,
    reschedulepublish: false,
    rescheduleunpublish: false,
    unpublish: false,
    pageunpublish: false,
    canceltrigger: false,
    approvalStatus: false,
  });
  const [data, setData] = useState({});
  const handleDeletePopup = (pageSelected) => {
    if (pageSelected.status === "published") {
      setMenuActions({ ...menuActions, pageunpublish: true });
      setData(pageSelected);
    }
    if (pageSelected.status === "draft" && pageSelected.scheduledPublishTriggerDateTime != null) {
      setMenuActions({ ...menuActions, pageunpublish: true });
      setData(pageSelected);
    }
    if (
      (pageSelected.status === "draft" && pageSelected.scheduledPublishTriggerDateTime == null) ||
      pageSelected.status === "unpublished"
    ) {
      setMenuActions({ ...menuActions, delete: true });
      setData(pageSelected);
    }
  };

  const onHandleMenuActions = (action) => {
    switch (action) {
      case MenuActions.EDIT:
        editPage(listItemDetails);
        break;
      case MenuActions.VIEW:
        viewPage(listItemDetails);
        break;
      case MenuActions.PREVIEW:
        previewPage(listItemDetails);
        break;
      case MenuActions.DUPLICATE:
        setMenuActions({ ...menuActions, duplicate: true });
        handleDuplicatePopup(true, listItemDetails);
        break;
      case MenuActions.DELETE:
        handleDeletePopup(listItemDetails);
        break;
      case MenuActions.UNPUBLISH:
        setMenuActions({ ...menuActions, unpublish: true });
        break;
      case MenuActions.RESCHEDULE_PUBLISH:
        setMenuActions({ ...menuActions, reschedulepublish: true });
        handleReschedulePopup("Publish", listItemDetails);
        break;
      case MenuActions.RESCHEDULE_UNPUBLISH:
        setMenuActions({ ...menuActions, rescheduleunpublish: true });
        handleReschedulePopup("Unpublish", listItemDetails);
        break;
      case MenuActions.CANCEL_PUBLISH:
        setMenuActions({ ...menuActions, canceltrigger: true });
        handleCancelTriggerPopup(listItemDetails);
        setCancelTriggerType("1");
        break;
      case MenuActions.CANCEL_UNPUBLISH:
        setMenuActions({ ...menuActions, canceltrigger: true });
        handleCancelTriggerPopup(listItemDetails);
        setCancelTriggerType("2");
        break;
      case MenuActions.APPROVAL_STATUS:
        setMenuActions({ ...menuActions, approvalStatus: true });
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const handleClose = () => {
    setMenuActions({
      duplicate: false,
      delete: false,
      publish: false,
      reschedulepublish: false,
      rescheduleunpublish: false,
      unpublish: false,
      pageunpublish: false,
      canceltrigger: false,
      approvalStatus: false,
    });
  };

  const handleUnpublishPage = () => {
    unPublishPage(listItemDetails);
    handleClose();
  };

  const handleCancelTrigger = () => {
    const requestDto = {
      page: listItemDetails.page,
      currentpageurl: listItemDetails.currentPageUrl,
      parentpageurl: listItemDetails.parentPageUrl,
    };
    cancelPublishUnpublishTrigger(cancelTriggerType, requestDto, listItemDetails);
    handleClose();
  };

  const handleConfirmDelete = () => {
    handlePageDelete(data);
    handleClose();
  };

  useEffect(() => {
    localStorage.setItem("lang", getCurrentLang());
  }, []);

  return (
    <>
      {menuActions.duplicate && (
        <CreateNewPage
          isDialogOpen={menuActions.duplicate}
          closeButtonHandle={handleClose}
          pageNameInitial={listItemDetails.title}
          isDuplicateValue={true}></CreateNewPage>
      )}
      {menuActions.unpublish && (
        <PlateformXDialog
          isDialogOpen={menuActions.unpublish}
          title={t("page_unpublish_title")}
          subTitle={t("page_unpublish_subtitle")}
          closeButtonText={t("no")}
          confirmButtonText={t("yes")}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleUnpublishPage}
        />
      )}
      {menuActions.canceltrigger && (
        <PlateformXDialog
          isDialogOpen={menuActions.canceltrigger}
          title={t("cancel_schedule")}
          subTitle={t("cancel_schedule_message")}
          closeButtonText={t("no")}
          confirmButtonText={t("yes")}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleCancelTrigger}
        />
      )}
      {menuActions.delete && (
        <PlateformXDialog
          isDialogOpen={menuActions.delete}
          title={t("page_delete_title")}
          subTitle={t("page_delete_subtitle")}
          closeButtonText={t("no")}
          confirmButtonText={t("yes")}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleConfirmDelete}
        />
      )}
      {menuActions.pageunpublish && (
        <PlateformXDialog
          isDialogOpen={menuActions.pageunpublish}
          title={t("page_delete_title")}
          subTitle={t("page_delete_subtitle")}
          closeButtonText={t("no")}
          confirmButtonText={t("yes")}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleConfirmDelete}
        />
      )}
      {menuActions.approvalStatus && (
        <WorkflowStepper
          open={menuActions.approvalStatus}
          setOpen={handleClose}
          path={listItemDetails?.currentPageUrl}
          contentType={capitalizeFirstLetter(listItemDetails?.tagName?.toLowerCase())}
        />
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{
          ".Platform-x-Menu-paper": {
            boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
            borderRadius: "7px",
            marginTop: "5px",
          },
          ".Platform-x-Menu-list": {
            borderRadius: "4px",
            boxShadow: "0 0 2px 0 rgba(115, 114, 114, 0.14)",
            border: "solid 1px rgba(112, 112, 112, 0.1)",
          },
          ".Platform-x-MenuItem-root": {
            ".Platform-x-SvgIcon-root": {
              fontSize: 20,
              marginRight: "10px",
              verticalAlign: "middle",
            },
            paddingLeft: "18px",
            fontSize: "16px",
            textTransform: "capitalize",
          },
        }}>
        <MenuItem
          disableRipple
          onClick={() => {
            onHandleMenuActions(status === "published" ? "view" : "preview");
          }}>
          {status === "published" ? (
            <>
              <div className={classes.icon}>
                <img src={CardOptionViewIcon} alt='view' />
              </div>
              {t("view")}
            </>
          ) : (
            <>
              <div className={classes.icon}>
                <img src={CardOptionViewIcon} alt='preview' />
              </div>
              {t("preview")}
            </>
          )}
        </MenuItem>
        {(scheduledPublishTriggerDateTime === null ||
          scheduledPublishTriggerDateTime === undefined) &&
        (scheduledUnPublishTriggerDateTime === null ||
          scheduledUnPublishTriggerDateTime === undefined)
          ? tabView && (
              <ErrorTooltip
                component={
                  <MenuItem
                    disableRipple
                    disabled={!canAccessAction(category, subCategory, "Update")}
                    onClick={() => {
                      onHandleMenuActions("edit");
                    }}>
                    <div className={classes.icon}>
                      <img src={CardOptionEditIcon} alt='view' />
                    </div>
                    {t(CARD_MENUS.EDIT.displayName)}
                  </MenuItem>
                }
                doAccess={!canAccessAction(category, subCategory, "Update")}
              />
            )
          : null}
        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={!canAccessAction(category, subCategory, "update")}
              onClick={() => {
                onHandleMenuActions("duplicate");
              }}>
              <div className={classes.icon}>
                <img src={CardOptionDuplicateIcon} alt='view' />
              </div>
              {t(CARD_MENUS.DUPLICATE.displayName)}
            </MenuItem>
          }
          doAccess={!canAccessAction(category, subCategory, "update")}
        />
        {tabView && (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, "delete")}
                onClick={() => {
                  onHandleMenuActions("delete");
                }}>
                <div className={classes.icon}>
                  <img src={CardOptionDeleteIcon} alt='view' />
                </div>
                {t(CARD_MENUS.DELETE.displayName)}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, "delete")}
          />
        )}
        {status === "published" && scheduledUnPublishTriggerDateTime == null ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, "unpublish")}
                onClick={() => {
                  onHandleMenuActions("unpublish");
                }}>
                <div className={classes.icon}>
                  <img src={CardOptionUnPublishIcon} alt='view' />
                </div>
                {t(CARD_MENUS.UNPUBLISH.displayName)}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, "unpublish")}
          />
        ) : null}
        {scheduledPublishTriggerDateTime ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, "reschedule_publish")}
                onClick={() => {
                  onHandleMenuActions("reschedule_publish");
                }}>
                <ScheduleSendIcon />
                {t("reschedule_publish")}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, "reschedule_publish")}
          />
        ) : null}
        {scheduledPublishTriggerDateTime ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, "cancel_publish")}
                onClick={() => {
                  onHandleMenuActions("cancel_publish");
                }}>
                <CancelScheduleSendIcon />
                {t("cancel_publish")}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, "cancel_publish")}
          />
        ) : null}
        {scheduledUnPublishTriggerDateTime ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, "reschedule_unpublish")}
                onClick={() => {
                  onHandleMenuActions("reschedule_unpublish");
                }}>
                <ScheduleSendIcon />
                {t("reschedule_unpublish")}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, "reschedule_unpublish")}
          />
        ) : null}
        {scheduledUnPublishTriggerDateTime ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, "cancel_unpublish")}
                onClick={() => {
                  onHandleMenuActions("cancel_unpublish");
                }}>
                <CancelScheduleSendIcon />
                {t("cancel_unpublish")}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, "cancel_unpublish")}
          />
        ) : null}
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            onHandleMenuActions("approval_status");
          }}>
          <div className={classes.icon}>
            <img src={CardOptionApprovalStatusIcon} alt='CardOptionApprovalStatusIcon' />
          </div>
          {t("approval_status")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(PageMenu);
