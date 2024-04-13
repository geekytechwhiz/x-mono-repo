import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import * as React from "react";
import "./DamDropdown.css";
import { t } from "i18next";
import { capitalizeFirstLetter } from "@platformx/utilities";

const ITEM_HEIGHT = 48;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 5,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const availableTag = ["author"];

export default function DamDropdown({ setAuthor, label }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event, lbl) => {
    setAuthor(lbl);
    setAnchorEl(null);
  };

  return (
    <>
      {availableTag.map((val, index) => (
        <Box key={index}>
          <Button
            className='dropdown-btn'
            id='demo-customized-button'
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            variant='contained'
            disableElevation
            defaultValue={val}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}>
            {t(val)}
          </Button>
          <StyledMenu
            id='demo-customized-menu'
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "15ch",
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}>
            {label[val] &&
              label[val]?.map((obj, i) => (
                <MenuItem
                  key={obj.label}
                  onClick={(e) => handleClose(e, obj.label)}
                  disableRipple
                  defaultValue={obj.label}>
                  {capitalizeFirstLetter(obj.label?.toLowerCase())}
                </MenuItem>
              ))}
          </StyledMenu>
        </Box>
      ))}
    </>
  );
}
