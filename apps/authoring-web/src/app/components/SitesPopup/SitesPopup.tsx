import { Avatar, Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { SettingNewIcon } from "@platformx/utilities";
import { useState } from "react";
import { useUserSession, getFirstTwoletters, NoSearchResult } from "@platformx/utilities";
import usePopupStyle from "./SitesPopup.style";
import SitesSearchBox from "./SitesSeachBox";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "i18next";
import { multiSiteApi, getGlobalDataWithHeader } from "@platformx/authoring-apis";

export default function SitesPopup(props) {
  const { isVisible, setIsVisible } = props;
  const handleClose = () => {
    setIsVisible(false);
  };
  const classes = usePopupStyle();
  const sessions = localStorage.getItem("userSession") || "";
  const [getSession, updateSession] = useUserSession();
  const storedSession = JSON.parse(sessions);
  const accessible_sites = storedSession?.userInfo?.accessible_sites;
  const storedSite = localStorage.getItem("selectedSite");
  const [filteredSites, setfilteredSites] = useState(
    accessible_sites.filter((a) => a != "System" && a != storedSite),
  );

  const handleSearch = (value) => {
    setfilteredSites(
      accessible_sites
        .filter((a) => a.includes(value))
        .filter((a) => a != "System" && a != storedSite),
    );
  };
  const handleSiteChange = async (e, sitetitle) => {
    const isSiteSystem = sitetitle?.toLowerCase() === "administrator";

    try {
      const res = await multiSiteApi.getPermissions(isSiteSystem ? "system" : sitetitle);
      await getGlobalDataWithHeader(isSiteSystem ? "system" : sitetitle);

      localStorage.setItem("selectedSite", sitetitle);
      updateSession({
        ...getSession(),
        permissions: res.data?.data?.permissions,
        userInfo: res.data?.data,
        role: res.data?.data?.roles?.find(
          (obj) => obj.site?.toLowerCase() === res.data?.data?.selected_site?.toLowerCase(),
        )?.name,
      });

      const lang = res.data?.data?.preferred_sites_languages?.[sitetitle] || "en";
      handleClose();
      const redirectUrl = isSiteSystem
        ? `system/${lang}/sites/site-listing`
        : `${sitetitle}/${lang}/dashboard`;

      window.location.replace(`${window.location.origin}/${redirectUrl}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Dialog
        sx={{ "& .Platform-x-Paper-root": { maxWidth: "400px" } }}
        open={isVisible}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        classes={{ paper: classes.dialogPaper }}>
        <Box>
          <Box className={classes.boxsize}>
            <Box className={classes.toptypography}>
              <Typography variant='h4medium'>{t("your_site")}</Typography>
              <Box className={classes.popupCloseButton} onClick={handleClose}>
                <CloseIcon />
              </Box>
            </Box>

            <Box className={classes.searchwrapper}>
              <SitesSearchBox handleSearch={handleSearch} />
            </Box>
            <Box className={classes.containerboxsize}>
              {filteredSites.map((val, index) => {
                return (
                  <Box
                    className={classes.container}
                    onClick={(event) => handleSiteChange(event, val)}
                    key={index}>
                    <Box className={classes.innercontainer}>
                      <Avatar className={classes.avatarbox}>{getFirstTwoletters(val)}</Avatar>
                      <Box className={classes.sitescontent}>
                        <Typography
                          variant='h5medium'
                          className={`${classes.sitescontent} ${classes.siteTitle}`}>
                          {val}
                        </Typography>
                        <KeyboardArrowRightIcon className={classes.keyrighticon} />
                      </Box>
                    </Box>
                  </Box>
                );
              })}

              {filteredSites.length === 0 && <NoSearchResult />}
            </Box>

            <Box className={classes.borderbottomtype}></Box>

            {accessible_sites?.includes("System") && (
              <Box
                onClick={(event) => handleSiteChange(event, "Administrator")}
                className={classes.typographyadmin}>
                <img className={classes.settingicon} src={SettingNewIcon} alt='icon' />
                <Typography variant='h6medium'>{t("administrator")}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
