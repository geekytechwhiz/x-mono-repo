import { Box, Button, Dialog, FormControl, Grid, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import InviteMemberPopupCard from "./InviteMemberPopupCard";
import { useStyles } from "./InviteMemberPopup.styles";
import { NoSearchResult, XCheckbox, PlateformXDialog, Loader } from "@platformx/utilities";

const InviteMemberPopup = ({
  cancleButtonHandle,
  open,
  memberList,
  setMemberList,
  doneButtonHandle,
  isInvited,
  setIsInvited,
  invitedLoading,
}) => {
  const { t } = useTranslation();
  const [globalCheckBoxStatus, setGlobalCheckBoxStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredArray, setFilteredArray] = useState(memberList);
  const handleGlobalCheckBoxStatus = () => {
    setMemberList((prevVlaue) => {
      const updatedItems = prevVlaue.map((item) => ({ ...item, checked: !globalCheckBoxStatus }));
      return updatedItems;
    });
    setFilteredArray((prevValue) => {
      const updatedFilteredItems = prevValue.map((item) => ({
        ...item,
        checked: !globalCheckBoxStatus,
      }));
      return updatedFilteredItems;
    });
    setGlobalCheckBoxStatus((prevValue) => !prevValue);
  };
  const classes = useStyles();
  const searchOnChange = (e) => {
    setSearch(e.target.value);
  };
  const resetSearch = () => {
    setSearch("");
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      const filteredArrayBasedOnSearch = memberList.filter((obj) =>
        ["first_name", "last_name", "full_name", "user_name", "email"].some((value) =>
          obj[value].toLowerCase().includes(search.toLowerCase()),
        ),
      );
      setFilteredArray(filteredArrayBasedOnSearch);
    }, 750);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [search]);
  const confirmButtonHandle = () => {
    setIsInvited(false);
    cancleButtonHandle();
  };
  const checkedCount =
    memberList?.length > 0 ? memberList?.filter((item) => item?.checked)?.length : 0;
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={cancleButtonHandle}
      className={`${classes.container} main-container`}>
      {invitedLoading && <Loader />}
      {isInvited && (
        <PlateformXDialog
          isDialogOpen={isInvited}
          title={t("invite_toast")}
          subTitle={t("invite_toast_subtitle")}
          // closeButtonHandle={() => navigate("/community/space")}
          confirmButtonText={t("back_to_home")}
          confirmButtonHandle={confirmButtonHandle}
          modalType='publish'
        />
      )}
      <Grid container className='popup-header'>
        <Grid item xs={12} sm={4} em={3} lg={3} className='header-title'>
          <Typography variant='h4bold'>{t("choose_members")}</Typography>
        </Grid>
        <Grid item xs={12} sm={8} em={5} lg={6} className='search-box'>
          <FormControl fullWidth>
            <TextField
              className='contentTypeCard'
              variant='outlined'
              placeholder={t("search_m")}
              value={search}
              onChange={searchOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    {search !== "" && (
                      <CloseRoundedIcon onClick={resetSearch} className='cross-icon' />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={4}
          lg={3}
          container
          spacing={0}
          className='cancle-invite-button-group d-flex justify-content-center '>
          <Box justifyContent='end'>
            <Button variant='secondaryButton' onClick={cancleButtonHandle}>
              {t("cancel")}
            </Button>

            <Button
              variant='primaryButton'
              className={`done-button ${
                memberList?.length === 0 || checkedCount === 0
                  ? "done-button-padding-14px"
                  : "done-button-padding-11px"
              }`}
              disabled={memberList?.length === 0 || checkedCount === 0}
              onClick={() => doneButtonHandle(memberList)}>
              {t("send_invite")}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container className='selected-count'>
        <Grid item xs={12} sm={4} em={3} lg={3} className='selected-count-item'>
          <Box className='d-flex align-items-center'>
            <XCheckbox
              checked={globalCheckBoxStatus}
              onChange={handleGlobalCheckBoxStatus}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant='h4bold'>{`${checkedCount} out of ${memberList?.length}`}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className='members-list'>
        {filteredArray && filteredArray.length > 0 ? (
          filteredArray.map((item, index) => (
            <InviteMemberPopupCard
              key={`${item?.id} ${index.toString()}`}
              item={item}
              image=''
              memberList={memberList}
              setSelectedMembers={setMemberList}
              setGlobalCheckBoxStatus={setGlobalCheckBoxStatus}
              setFilteredArray={setFilteredArray}
            />
          ))
        ) : (
          <NoSearchResult />
        )}
      </Box>
    </Dialog>
  );
};

export default InviteMemberPopup;
