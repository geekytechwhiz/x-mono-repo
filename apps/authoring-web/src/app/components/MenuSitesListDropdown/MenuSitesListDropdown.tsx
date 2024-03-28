import { useState } from "react";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { getFirstTwoletters } from "@platformx/utilities";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SitesPopup from "../SitesPopup/SitesPopup";
import useSitesMenuStyle from "./SitesMenu.style";

const MenuSitesListDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mySite = () => {
    setIsVisible(true);
  };
  const splitPath = window?.location.pathname.split("/");
  let [, selectedSite] = splitPath;

  if (selectedSite?.toLowerCase() === "system") {
    selectedSite = "Administrator";
  }
  const classes = useSitesMenuStyle();

  return (
    <Box>
      <Box className={`${classes.dropdowncontain} ddmenu`} onClick={mySite}>
        <Box className={classes.dropNewTypo}>
          <Avatar className={classes.UserAvatar}>
            <Typography variant='h7regular'>{getFirstTwoletters(selectedSite || "")}</Typography>
          </Avatar>
          <Typography variant='h6medium' className={`${classes.dropdowntypo} ddmenutex`}>
            {selectedSite}
          </Typography>
        </Box>
        <KeyboardArrowRightIcon sx={{ color: "#6E7191" }} />
      </Box>
      {isVisible && <SitesPopup isVisible={isVisible} setIsVisible={setIsVisible} />}
    </Box>
  );
};

export default MenuSitesListDropdown;
