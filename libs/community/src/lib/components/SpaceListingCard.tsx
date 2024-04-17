import AddIcon from "@mui/icons-material/Add";
import DeleteMenuIcon from "@mui/icons-material/Delete";
import EditMenuIcon from "@mui/icons-material/Edit";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import {
  DeleteIcon,
  EditIcon,
  Loader,
  MoreHorizIcon,
  CommonPlateformXDialog as PlateformXDialogDelete,
  iconsList,
  ShowToastError as showToastError,
  statusIcons,
} from "@platformx/utilities";
import { format } from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  filterArrayValues,
  filterArrayValueswithSameKey,
  formatCancleMembers,
  formatInvitedMenbers,
  formatRemoveMembers,
  getAllExoMembersList,
  getSpaceMembersList,
} from "../utils/SpacesHelper";
import InviteMemberPopup from "./Invitememberspopup/InviteMemberPopup";
import { MenuActions, MenuActionsType } from "./MenuActions.types";
import { RegistrationConstants } from "./SpaceAccess/Constants";
import { useStyles } from "./SpaceListingCard.styles";

const SpaceListingCard = ({
  dataList,
  dataType,
  deleteSpace,
  leaveSpace,
  joinSpace,
  inviteMembers: inviteMembersHandler,
  isInvited,
  setIsInvited,
  invitedLoading,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const [menuActions, setMenuActions] = useState<MenuActionsType>({
    inviteuser: false,
    isLeave: false,
    isDelete: false,
    removeuser: false,
  });
  const [invitationAcceptedMembers, setInvitationAcceptedMembers] = useState<any>([]);
  const [invitedMembers, setInvitedMembers] = useState<any>([]);
  const [membersYetToInvite, setMembersYetToInvite] = useState<any>([]);
  const [membersofSpace, setMembersofSpace] = useState<any>([]);
  const classes = useStyles();
  const getAllExoMembersandDivideMembersofSpace = async (
    invitedMembersOfSpace,
    defaultMembersOfSpace,
    userType: string,
  ) => {
    try {
      const allExoMemberResponse = await getAllExoMembersList();
      if (allExoMemberResponse && allExoMemberResponse?.length > 0) {
        const modifiedResponse = allExoMemberResponse.map((item) => {
          return {
            ...item,
            checked: false,
          };
        });
        setMembersYetToInvite(
          filterArrayValues(modifiedResponse, [...invitedMembersOfSpace, ...defaultMembersOfSpace]),
        );
        setMembersofSpace(
          filterArrayValueswithSameKey(modifiedResponse, [
            ...invitedMembersOfSpace,
            ...defaultMembersOfSpace,
          ]),
        );
      }
      setMenuActions((prevValue) => {
        return { ...prevValue, [`${userType}`]: true };
      });
    } catch (err: any) {
      showToastError(
        err?.graphQLErrors[0]?.message ||
          err?.networkError?.result?.errors[0]?.message ||
          err?.message ||
          t("api_error_toast"),
      );
    }
  };

  const inviteMembersMenuHandler = async (userType: string) => {
    try {
      const spaceMemberListResponse = await getSpaceMembersList(dataList?.id);
      if (spaceMemberListResponse) {
        setInvitedMembers([...(spaceMemberListResponse?.invite_members || [])]);
        setInvitationAcceptedMembers([...(spaceMemberListResponse?.members || [])]);
        await getAllExoMembersandDivideMembersofSpace(
          [...(spaceMemberListResponse?.invite_members || [])],
          [...(spaceMemberListResponse?.members || [])],
          userType,
        );
      }
    } catch (err: any) {
      showToastError(
        err?.graphQLErrors[0]?.message ||
          err?.networkError?.result?.errors[0]?.message ||
          err?.message ||
          t("api_error_toast"),
      );
    }
  };

  const onHandleMenuActions = async (action: string) => {
    switch (action) {
      case MenuActions.INVITE_USER:
        setLoading(true);
        try {
          await inviteMembersMenuHandler(MenuActions.INVITE_USER);
        } catch (err) {
          showToastError(t("api_error_toast"));
        } finally {
          setLoading(false);
        }
        break;
      case MenuActions.DELETE:
        setMenuActions((prevValue) => {
          return { ...prevValue, isDelete: true };
        });
        break;
      case MenuActions.LEAVE:
        setMenuActions((prevValue) => {
          return { ...prevValue, isLeave: true };
        });
        break;
      case MenuActions.Remove_USER:
        setLoading(true);
        try {
          await inviteMembersMenuHandler(MenuActions.Remove_USER);
        } catch (err) {
          showToastError(t("api_error_toast"));
        } finally {
          setLoading(false);
        }
        break;
      default:
        break;
    }
  };

  const onCloseMenuActions = () => {
    setMenuActions({
      inviteuser: false,
      isDelete: false,
      isLeave: false,
      removeuser: false,
    });
  };

  const deleteConfirmButtonHandle = async () => {
    await deleteSpace(dataList.id, dataList.title);
    onCloseMenuActions();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleJoinSpace = () => {
    joinSpace(dataList.id, dataList.title);
  };

  /**
   * edit space
   */
  const handleEdit = () => {
    navigate(`/community/create-space?type=edit&id=${dataList.id}`);
  };

  /**
   * edit space
   */
  const handleViewButton = () => {
    navigate(`/community/create-space?type=view&id=${dataList.id}`);
  };

  const handleInviteMembers = (values) => {
    const selectedArray = values.filter((item) => item.checked);
    const inviteMembers = formatInvitedMenbers(
      filterArrayValues(selectedArray, [...invitationAcceptedMembers, ...invitedMembers]),
    );
    inviteMembersHandler(dataList.id, [], inviteMembers, []);
  };
  const handleRemoveMembers = (values) => {
    const selectedArray = values.filter((item) => item.checked);
    const cancleMembers = formatCancleMembers(
      filterArrayValueswithSameKey(invitedMembers, selectedArray),
      dataList?.title,
    );
    const removeMembers = formatRemoveMembers(
      filterArrayValueswithSameKey(invitationAcceptedMembers, selectedArray),
      dataList?.pretty_name,
    );
    inviteMembersHandler(dataList.id, removeMembers, [], cancleMembers);
  };

  const leaveSpaceHandlerFunction = async () => {
    await leaveSpace(dataList.id, dataList.title);
    onCloseMenuActions();
  };

  return (
    <>
      {loading && <Loader />}

      {menuActions?.inviteuser && (
        <InviteMemberPopup
          cancleButtonHandle={onCloseMenuActions}
          open={menuActions?.inviteuser}
          memberList={membersYetToInvite}
          setMemberList={setMembersYetToInvite}
          doneButtonHandle={handleInviteMembers}
          isInvited={isInvited}
          setIsInvited={setIsInvited}
          invitedLoading={invitedLoading}
        />
      )}
      {menuActions?.removeuser && (
        <InviteMemberPopup
          cancleButtonHandle={onCloseMenuActions}
          open={menuActions?.removeuser}
          memberList={membersofSpace}
          setMemberList={setMembersofSpace}
          doneButtonHandle={handleRemoveMembers}
          isInvited={isInvited}
          setIsInvited={setIsInvited}
          invitedLoading={invitedLoading}
        />
      )}
      {menuActions.isDelete && (
        <PlateformXDialogDelete
          isDialogOpen={menuActions.isDelete}
          title={t("delete_title")}
          subTitle={`${t("delete_confirm")} ${t("space")}? ${t("process_undone")}`}
          closeButtonText={t("no_keep_it")}
          confirmButtonText={t("yes_delete_it")}
          closeButtonHandle={onCloseMenuActions}
          confirmButtonHandle={deleteConfirmButtonHandle}
          modalType='delete'
        />
      )}
      {menuActions.isLeave && (
        <PlateformXDialogDelete
          isDialogOpen={menuActions.isLeave}
          title={t("delete_title")}
          subTitle={`${t("leave_confirm")} ${t("space")}?`}
          closeButtonText={t("no_don't_leave")}
          confirmButtonText={t("leave")}
          closeButtonHandle={onCloseMenuActions}
          confirmButtonHandle={leaveSpaceHandlerFunction}
          modalType='delete'
        />
      )}
      <Box className='listbox'>
        <Grid container className='d-flex align-items-center'>
          <Grid item xs={11} md={11} em={5} lg={7} xl={8} pr='20px'>
            <Box
              //  sx={{ display: 'flex', justifyContent: 'space-between' }}
              className='d-flex align-items-center'
              onClick={handleViewButton}>
              <Box className='img'>
                <img src={iconsList["Space"]} alt='space icon' />
              </Box>
              <Box>
                <Grid container>
                  <Grid
                    item
                    className='d-flex align-items-center'
                    sx={{
                      height: "24px",
                    }}>
                    <Tooltip title={dataList.title} placement='right-end'>
                      <Typography
                        variant='h5bold'
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                          wordBreak: "break-all",
                        }}>
                        {dataList.title}
                      </Typography>
                    </Tooltip>
                    <Box component='div' className='mobstatusIcon'>
                      <Typography sx={{ marginLeft: "10px" }}>
                        <img
                          src={
                            dataList.visibility === "hidden"
                              ? statusIcons["public"]
                              : statusIcons["private"]
                          }
                          alt={dataList.visibility === "hidden" ? "Public icon" : "Private icon"}
                        />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    flexWrap: { xs: "wrap", em: "inherit" },
                    display: { xs: "none", em: "flex" },
                  }}>
                  <Typography
                    variant='h7regular'
                    sx={{
                      color: "#89909a",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-all",
                      order: { xs: 2, em: 1 },
                    }}>
                    {dataList.description}
                  </Typography>
                </Box>
                <Box className='datetimemob'>
                  <Typography variant='h7regular' component='div'>
                    {dataList.lastModifiedBy}
                  </Typography>
                  <Typography variant='h7regular' component='div'>
                    {dataList.created_date &&
                      format(new Date(+dataList.created_date), "MMM d, yyyy | hh:mm")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} md={1} em={7} lg={5} xl={4}>
            <Box className='d-flex align-items-center justify-content-end'>
              <Box className='statusweb' onClick={() => handleViewButton()}>
                <Tooltip placement='top-start' title={t(`${dataList.visibility}`)}>
                  <Typography sx={{ display: "flex" }}>
                    <img
                      style={{ width: "37px", height: "37px", borderRadius: "5px" }}
                      src={
                        dataList.visibility === "hidden"
                          ? statusIcons["public"]
                          : statusIcons["private"]
                      }
                      alt={dataList.visibility === "hidden" ? "Public icon" : "Private icon"}
                    />
                  </Typography>
                </Tooltip>
              </Box>
              <Box
                className='datetimeweb'
                sx={{ display: "flex" }}
                onClick={() => handleViewButton()}>
                <Typography variant='h7regular' component='div'>
                  {dataList.lastModifiedBy}
                </Typography>
                <Typography variant='h7regular' component='div'>
                  {dataList.created_date &&
                    format(new Date(+dataList.created_date), "MMM d, yyyy | hh:mm")}
                </Typography>
              </Box>
              <Box
                color='#89909A'
                className='d-inline-flex align-items-center justify-content-end'
                sx={{ minWidth: "104px" }}>
                {/* edit icon */}
                <Box className='d-flex align-items-center'>
                  <MenuItem className='icons' disableRipple onClick={handleEdit} disabled={false}>
                    <IconButton className='hoverIcon'>
                      <img src={EditIcon} style={{ objectFit: "cover" }} alt='edit icon' />
                    </IconButton>
                  </MenuItem>
                </Box>

                {/* delete icon */}
                <Box className='d-flex align-items-center'>
                  {dataType === "Space" && (
                    <MenuItem
                      className='icons'
                      disableRipple
                      onClick={() => onHandleMenuActions("delete")}
                      disabled={false}>
                      <IconButton className='hoverIcon'>
                        <img src={DeleteIcon} style={{ objectFit: "cover" }} alt='delete icon' />
                      </IconButton>
                    </MenuItem>
                  )}

                  {/*menu icon */}
                  <IconButton
                    aria-label='settings'
                    id='long-button'
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup='true'
                    onClick={handleClick}
                    className='viewallctamob'>
                    <img
                      src={MoreHorizIcon}
                      style={{ objectFit: "cover" }}
                      alt='horizontal ellipsis icon'
                    />
                  </IconButton>
                  <Menu
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
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
                        },
                        paddingLeft: "18px",
                        fontSize: "16px",
                        zIndex: 999,
                      },
                      textTransform: "capitalize",
                    }}>
                    <MenuItem
                      disableRipple
                      onClick={() => {
                        handleClose();
                        handleViewButton();
                      }}>
                      <VisibilityIcon /> {t("view")}
                    </MenuItem>
                    <MenuItem
                      className={`${classes["space-lising-card-menu"]} menu-item-tab`}
                      disableRipple
                      onClick={() => {
                        handleClose();
                        onHandleMenuActions("delete");
                      }}>
                      <DeleteMenuIcon /> {t("delete")}
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleEdit}
                      className={`${classes["space-lising-card-menu"]} menu-item-tab`}>
                      <EditMenuIcon /> {t("edit")}
                    </MenuItem>
                    {dataList?.is_member && (
                      <MenuItem
                        disableRipple
                        onClick={() => {
                          handleClose();
                          onHandleMenuActions("leave");
                        }}>
                        <RemoveIcon /> {t("leave")}
                      </MenuItem>
                    )}
                    {dataList?.subscription === RegistrationConstants[0] &&
                      !dataList?.is_member && (
                        <MenuItem
                          disableRipple
                          onClick={() => {
                            handleClose();
                            handleJoinSpace();
                          }}>
                          <AddIcon /> {t("join")}
                        </MenuItem>
                      )}
                    <MenuItem
                      disableRipple
                      onClick={() => {
                        handleClose();
                        onHandleMenuActions("inviteuser");
                      }}>
                      <GroupAddIcon /> {t("invite_members")}
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={() => {
                        handleClose();
                        onHandleMenuActions("removeuser");
                      }}>
                      <GroupRemoveIcon /> {t("remove_members")}
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SpaceListingCard;
