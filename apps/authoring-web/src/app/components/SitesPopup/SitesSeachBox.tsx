import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FormControl, IconButton, TextField } from "@mui/material";
// import { SearchIcon } from '@platformx/utilities';
import { useState } from "react";
import usePopupStyle from "./SitesPopup.style";

export default function SitesSearchBox({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

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
        placeholder='Search your sites'
        value={searchQuery}
        onChange={handleOnChange}
        InputProps={{
          // startAdornment: <img alt='settings' src={SearchIcon} />,
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
