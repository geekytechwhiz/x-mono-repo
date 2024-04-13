import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FormControl, IconButton, TextField } from "@mui/material";
import { SearchIcon } from "@platformx/utilities";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePopupStyle from "./SitesPopup.style";

export default function SitesSearchBox({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const handleOnChange = (event) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value?.toLowerCase());
  };
  const resetSearch = () => {
    handleSearch("");
    setSearchQuery("");
  };
  const classes = usePopupStyle();
  return (
    <FormControl className={classes.contentcontrol}>
      <TextField
        variant='outlined'
        placeholder={t("search_your_sites")}
        value={searchQuery}
        onChange={handleOnChange}
        InputProps={{
          startAdornment: <img alt='icon' src={SearchIcon} />,
          endAdornment: searchQuery && (
            <IconButton onClick={resetSearch}>
              <CloseRoundedIcon />
            </IconButton>
          ),
        }}
      />
    </FormControl>
  );
}
