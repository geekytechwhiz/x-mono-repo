import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FormControl, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
//import "../../../components/Common/Search.css";
import { ThemeConstants, SearchIcon } from "@platformx/utilities";

const useStyles = makeStyles({
  option: {
    "&:hover": {
      backgroundColor: `${ThemeConstants.OFF_WHITE_COLOR} !important`,
    },
  },
  contentcontrol: {
    width: "97.5%",
    wordBreak: "break-all",
  },
});

export default function DamContentSearchBox({ onSearch, searchCloseToggle }: any) {
  const styles = useStyles();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = React.useState("");
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onSearch(searchQuery);
    }
  };

  const handleOnChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const resetSearch = () => {
    setSearchQuery("");
    onSearch("");
    searchCloseToggle && searchCloseToggle();
  };
  return (
    <FormControl className={styles.contentcontrol}>
      <TextField
        autoComplete='off'
        // autoFocus
        variant='outlined'
        placeholder={`${t("Search here")}...`}
        value={searchQuery}
        onChange={handleOnChange}
        onKeyDown={onEnter}
        InputProps={{
          startAdornment: <img src={SearchIcon} color='action' alt='searchicon' />,
          endAdornment: (searchQuery || searchCloseToggle) && (
            <IconButton onClick={resetSearch}>
              <CloseRoundedIcon />
            </IconButton>
          ),
        }}
      />
    </FormControl>
  );
}
